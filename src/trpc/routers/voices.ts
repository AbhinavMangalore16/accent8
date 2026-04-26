import z from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";
import { TRPCError } from "@trpc/server";



export const voicesRouter = createTRPCRouter({
    getAll: orgProcedure.input(
        z.object({
            query: z.string().trim().optional(),
        })
        .optional()
    )
    .query(async({ctx, input})=>{
        const searchFilter = input?.query?{
            OR: [
                { name: { contains: input.query, mode: "insensitive" as const} },
                { description: { contains: input.query, mode: "insensitive" as const} },
            ]
        }: {};
        const [custom, preset] = await Promise.all([prisma.voice.findMany({
            where: {
                variant: "CUSTOM",
                orgId: ctx.orgId,
                ...searchFilter
            },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                variant: true,
                language: true,
            }
        }), prisma.voice.findMany({
            where: {
                variant: "PRESET",
                ...searchFilter
            },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                variant: true,
                language: true,
            }
        })
    ]);
    return {custom, preset};
    }),
    delete: orgProcedure.input(z.object({id: z.string()}))
    .mutation(async({ctx, input})=>{
        const voice = await prisma.voice.findUnique({
            where: {id: input.id,variant: "CUSTOM",orgId: ctx.orgId},
        });
        if (!voice){
            throw new TRPCError({code: "NOT_FOUND", message: "Voice not found"});
        }
        await prisma.voice.delete({
            where: {id: voice.id},
        });
        if (voice.s3ObjectKey){
            const { deleteAudioFromS3 } = await import("@/lib/s3_bucket");
            await deleteAudioFromS3(voice.s3ObjectKey).catch((err) => {
                console.error("Failed to delete S3 object for voice", {
                    voiceId: voice.id,
                    s3ObjectKey: voice.s3ObjectKey,
                    err,
                });
            });;
        }  //TODO: handle error case where audio file could not be deleted from S3, currently we just ignore it; scanning cron job to clean up orphaned files could be a solution
        return {success: true};
    })
});
