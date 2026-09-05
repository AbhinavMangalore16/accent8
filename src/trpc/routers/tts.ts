import { z } from "zod";
import { ttsFormSchema } from "@/modules/tts-feature/data/form";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";
import { uploadAudioToS3, getAudioUrlFromS3 } from "@/lib/s3_bucket";
import { generateSyntheticWavBuffer } from "@/lib/audio-utils";
import { getTtsApiConfig } from "@/lib/tts-config";

export const ttsRouter = createTRPCRouter({
  generate: orgProcedure
    .input(ttsFormSchema)
    .mutation(async ({ ctx, input }) => {
      // 1. Fetch voice details from database
      let voice = await prisma.voice.findFirst({
        where: { id: input.voiceId },
      });

      if (!voice) {
        voice = await prisma.voice.findFirst({
          where: { variant: "PRESET" },
        });
      }

      const voiceName = voice?.name ?? input.voiceName ?? "System Voice";
      const voiceKey = voice?.s3ObjectKey ?? "voices/system/default.wav";

      let audioBuffer: Buffer | null = null;
      const { url: ttsApiUrl, apiKey, mode: engineMode } = getTtsApiConfig();

      // 2. Try TTS service call (local GPU home server or cloud Modal GPU based on TTS_ENGINE_MODE)
      if (ttsApiUrl) {
        try {
          console.log(`[TTS] Requesting generation via [${engineMode.toUpperCase()}] engine at ${ttsApiUrl}`);
          const response = await fetch(
            `${ttsApiUrl.replace(/\/$/, "")}/generate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(apiKey ? { "X-API-Key": apiKey } : {}),
              },
              body: JSON.stringify({
                prompt: input.text,
                voice_key: voiceKey,
                temperature: input.settings.temperature,
                top_p: input.settings.topP,
                top_k: input.settings.topK,
                repetition_penalty: input.settings.repetitionPenalty,
              }),
            },
          );

          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            audioBuffer = Buffer.from(arrayBuffer);
          } else {
            const errText = await response.text();
            console.warn(
              `TTS API returned status ${response.status}: ${errText}`,
            );

            // If specific voice key was not found on Modal R2, attempt fallback to default voice key
            if (
              response.status === 400 &&
              voiceKey !== "voices/preset/cmr2of2hb00004suhv32jvswm"
            ) {
              console.log(
                "Attempting generation fallback with default voice key 'voices/preset/cmr2of2hb00004suhv32jvswm'...",
              );
              const fallbackResponse = await fetch(
                `${ttsApiUrl.replace(/\/$/, "")}/generate`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    ...(apiKey ? { "X-API-Key": apiKey } : {}),
                  },
                  body: JSON.stringify({
                    prompt: input.text,
                    voice_key: "voices/preset/cmr2of2hb00004suhv32jvswm",
                    temperature: input.settings.temperature,
                    top_p: input.settings.topP,
                    top_k: input.settings.topK,
                    repetition_penalty: input.settings.repetitionPenalty,
                  }),
                },
              );

              if (fallbackResponse.ok) {
                const arrayBuffer = await fallbackResponse.arrayBuffer();
                audioBuffer = Buffer.from(arrayBuffer);
              }
            }
          }
        } catch (err) {
          console.warn(
            "Could not reach remote TTS API endpoint, falling back to local synthesizer:",
            err,
          );
        }
      }

      // 3. Fall back to local synthetic WAV audio generator if remote API is not active
      if (!audioBuffer) {
        audioBuffer = generateSyntheticWavBuffer(input.text);
      }

      const generationId = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const s3ObjectKey = `generations/${ctx.orgId}/${generationId}.wav`;

      // 4. Upload audio buffer to S3 / Cloudflare R2
      let audioUrl: string | null = null;
      try {
        await uploadAudioToS3({
          buffer: audioBuffer,
          key: s3ObjectKey,
          contentType: "audio/wav",
        });
        audioUrl = await getAudioUrlFromS3(s3ObjectKey);
      } catch (s3Error) {
        console.warn(
          "S3 upload/signed URL failed, returning inline data URI fallback:",
          s3Error,
        );
        audioUrl = `data:audio/wav;base64,${audioBuffer.toString("base64")}`;
      }

      // 5. Persist Generation record in Prisma DB
      const generation = await prisma.generation.create({
        data: {
          id: generationId,
          orgId: ctx.orgId,
          voiceId: voice?.id ?? null,
          voiceName,
          text: input.text,
          s3ObjectKey,
          temperature: input.settings.temperature,
          topP: input.settings.topP,
          topK: Math.round(input.settings.topK),
          repetitionPenalty: input.settings.repetitionPenalty,
        },
      });

      return {
        success: true,
        audioUrl,
        generation,
      };
    }),

  getHistory: orgProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(50).default(20),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 20;

      const generations = await prisma.generation.findMany({
        where: { orgId: ctx.orgId },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: {
          voice: true,
        },
      });

      const historyWithUrls = await Promise.all(
        generations.map(async (gen) => {
          let audioUrl: string | null = null;
          try {
            audioUrl = await getAudioUrlFromS3(gen.s3ObjectKey);
          } catch (err) {
            console.warn(
              `Could not get signed S3 URL for generation ${gen.id}:`,
              err,
            );
          }

          return {
            ...gen,
            audioUrl,
          };
        }),
      );

      return historyWithUrls;
    }),
});
