import { z } from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { VoiceCategory } from "@/generated/prisma/enums";
import {
  getAudioUrlFromS3,
  getPresignedUploadUrlFromS3,
  deleteAudioFromS3,
} from "@/lib/s3_bucket";

export const voicesRouter = createTRPCRouter({
  getAll: orgProcedure
    .input(
      z
        .object({
          query: z.string().trim().optional(),
          category: z.nativeEnum(VoiceCategory).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const searchFilter = input?.query
        ? {
            OR: [
              { name: { contains: input.query, mode: "insensitive" as const } },
              {
                description: {
                  contains: input.query,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {};

      const categoryFilter = input?.category
        ? { category: input.category }
        : {};

      const [custom, preset] = await Promise.all([
        prisma.voice.findMany({
          where: {
            variant: "CUSTOM",
            orgId: ctx.orgId,
            ...searchFilter,
            ...categoryFilter,
          },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            variant: true,
            language: true,
            s3ObjectKey: true,
            createdAt: true,
          },
        }),
        prisma.voice.findMany({
          where: {
            variant: "PRESET",
            ...searchFilter,
            ...categoryFilter,
          },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            variant: true,
            language: true,
            s3ObjectKey: true,
            createdAt: true,
          },
        }),
      ]);

      const mapVoiceUrls = async (voices: typeof custom) => {
        return Promise.all(
          voices.map(async (voice) => {
            let previewAudioUrl: string | null = null;
            if (voice.s3ObjectKey) {
              try {
                previewAudioUrl = await getAudioUrlFromS3(voice.s3ObjectKey);
              } catch (e) {
                console.warn(
                  `Failed to get presigned URL for voice ${voice.id}:`,
                  e,
                );
              }
            }
            return {
              ...voice,
              previewAudioUrl,
            };
          }),
        );
      };

      const [customWithUrls, presetWithUrls] = await Promise.all([
        mapVoiceUrls(custom),
        mapVoiceUrls(preset),
      ]);

      return { custom: customWithUrls, preset: presetWithUrls };
    }),

  getPresignedUploadUrl: orgProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string().default("audio/wav"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const sanitizedFilename = input.filename.replace(/[^a-zA-Z0-9.-]/g, "_");
      const s3ObjectKey = `voices/custom/${ctx.orgId}/${Date.now()}-${sanitizedFilename}`;

      try {
        const uploadUrl = await getPresignedUploadUrlFromS3(
          s3ObjectKey,
          input.contentType,
        );
        return {
          uploadUrl,
          s3ObjectKey,
        };
      } catch (err) {
        console.warn(
          "Failed to generate presigned upload URL, using fallback upload key:",
          err,
        );
        return {
          uploadUrl: null,
          s3ObjectKey,
        };
      }
    }),

  create: orgProcedure
    .input(
      z.object({
        name: z.string().trim().min(1, "Name is required"),
        description: z.string().trim().optional(),
        category: z.nativeEnum(VoiceCategory).default("GENERAL"),
        language: z.string().default("en-US"),
        s3ObjectKey: z.string().min(1, "Voice audio sample key is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const voice = await prisma.voice.create({
        data: {
          orgId: ctx.orgId,
          name: input.name,
          description: input.description,
          category: input.category,
          language: input.language,
          variant: "CUSTOM",
          s3ObjectKey: input.s3ObjectKey,
        },
      });

      return { success: true, voice };
    }),

  delete: orgProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const voice = await prisma.voice.findFirst({
        where: { id: input.id, variant: "CUSTOM", orgId: ctx.orgId },
      });

      if (!voice) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Voice not found" });
      }

      await prisma.voice.delete({
        where: { id: voice.id },
      });

      if (voice.s3ObjectKey) {
        await deleteAudioFromS3(voice.s3ObjectKey).catch((err) => {
          console.error("Failed to delete S3 object for voice", {
            voiceId: voice.id,
            s3ObjectKey: voice.s3ObjectKey,
            err,
          });
        });
      }

      return { success: true };
    }),
});
