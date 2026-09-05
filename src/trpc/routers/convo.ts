import { z } from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";
import { uploadAudioToS3, getAudioUrlFromS3 } from "@/lib/s3_bucket";
import { concatenateWavBuffers, generateSyntheticWavBuffer } from "@/lib/audio-utils";

import { getTtsApiConfig } from "@/lib/tts-config";

export const convoRouter = createTRPCRouter({
  generate: orgProcedure
    .input(
      z.object({
        turns: z
          .array(
            z.object({
              voiceId: z.string().min(1),
              voiceName: z.string().optional(),
              text: z.string().min(1),
              settings: z
                .object({
                  temperature: z.number().default(0.8),
                  topP: z.number().default(0.95),
                  topK: z.number().default(1000),
                  repetitionPenalty: z.number().default(1.2),
                })
                .default({
                  temperature: 0.8,
                  topP: 0.95,
                  topK: 1000,
                  repetitionPenalty: 1.2,
                }),
            })
          )
          .min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const orgId = ctx.orgId;
      const convoId = `convo_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

      const { url: ttsApiUrl, apiKey, mode: engineMode } = getTtsApiConfig();
      console.log(`[CONVO] Processing ${input.turns.length} turns via [${engineMode.toUpperCase()}] engine at ${ttsApiUrl}`);

      const turnBuffers: Buffer[] = [];
      const turnResults: Array<{
        voiceName: string;
        text: string;
        audioUrl: string;
      }> = [];

      for (let i = 0; i < input.turns.length; i++) {
        const turn = input.turns[i];
        let voice = await prisma.voice.findUnique({
          where: { id: turn.voiceId },
        });

        if (!voice) {
          voice = await prisma.voice.findFirst({
            where: { variant: "PRESET" },
          });
        }

        const voiceName = turn.voiceName ?? voice?.name ?? `Speaker ${i + 1}`;
        const voiceKey = voice?.s3ObjectKey ?? "voices/system/default.wav";

        let audioBuffer: Buffer | null = null;

        // 1. Synthesize audio turn via Modal GPU service
        if (ttsApiUrl) {
          try {
            const response = await fetch(`${ttsApiUrl.replace(/\/$/, "")}/generate`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(apiKey ? { "X-API-Key": apiKey } : {}),
              },
              body: JSON.stringify({
                prompt: turn.text,
                voice_key: voiceKey,
                temperature: turn.settings.temperature,
                top_p: turn.settings.topP,
                top_k: turn.settings.topK,
                repetition_penalty: turn.settings.repetitionPenalty,
              }),
            });

            if (response.ok) {
              const arrayBuffer = await response.arrayBuffer();
              audioBuffer = Buffer.from(arrayBuffer);
            } else if (response.status === 400 && voiceKey !== "voices/preset/cmr2of2hb00004suhv32jvswm") {
              const fallbackResponse = await fetch(
                `${ttsApiUrl.replace(/\/$/, "")}/generate`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    ...(apiKey ? { "X-API-Key": apiKey } : {}),
                  },
                  body: JSON.stringify({
                    prompt: turn.text,
                    voice_key: "voices/preset/cmr2of2hb00004suhv32jvswm",
                    temperature: turn.settings.temperature,
                    top_p: turn.settings.topP,
                    top_k: turn.settings.topK,
                    repetition_penalty: turn.settings.repetitionPenalty,
                  }),
                }
              );

              if (fallbackResponse.ok) {
                const arrayBuffer = await fallbackResponse.arrayBuffer();
                audioBuffer = Buffer.from(arrayBuffer);
              }
            }
          } catch (err) {
            console.warn(`Error generating turn ${i}:`, err);
          }
        }

        if (!audioBuffer) {
          audioBuffer = generateSyntheticWavBuffer(turn.text, 3.0);
        }

        turnBuffers.push(audioBuffer);

        // Upload turn WAV to Cloudflare R2 / S3
        const turnKey = `conversations/${orgId}/${convoId}/turn_${i}.wav`;
        await uploadAudioToS3({ key: turnKey, buffer: audioBuffer });

        let turnAudioUrl = "";
        try {
          turnAudioUrl = await getAudioUrlFromS3(turnKey);
        } catch {
          turnAudioUrl = `data:audio/wav;base64,${audioBuffer.toString("base64")}`;
        }

        // Create individual Generation record in Prisma
        await prisma.generation.create({
          data: {
            orgId,
            voiceId: voice?.id ?? null,
            voiceName,
            text: turn.text,
            s3ObjectKey: turnKey,
            temperature: turn.settings.temperature,
            topP: turn.settings.topP,
            topK: turn.settings.topK,
            repetitionPenalty: turn.settings.repetitionPenalty,
          },
        });

        turnResults.push({
          voiceName,
          text: turn.text,
          audioUrl: turnAudioUrl,
        });
      }

      // 2. Concatenate all turn audio buffers into master conversation dialogue
      const masterBuffer = concatenateWavBuffers(turnBuffers, 450);
      const masterKey = `conversations/${orgId}/${convoId}/master.wav`;
      await uploadAudioToS3({ key: masterKey, buffer: masterBuffer });

      let masterAudioUrl = "";
      try {
        masterAudioUrl = await getAudioUrlFromS3(masterKey);
      } catch {
        masterAudioUrl = `data:audio/wav;base64,${masterBuffer.toString("base64")}`;
      }

      return {
        convoId,
        masterAudioUrl,
        turns: turnResults,
      };
    }),
});
