import path from "node:path";
import fs from "node:fs/promises";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client, type PutObjectCommandInput} from "@aws-sdk/client-s3";
import { z } from "zod";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";

import { PRESET_VOICE_NAMES } from "@/modules/voices-feature/data/config";
import { PrismaClient, VoiceCategory } from "@/generated/prisma/client";


interface VoiceMetadata{
    description: string;
    category: VoiceCategory;
    language: string;
}
interface UploadOptions{
    key: string;
    buffer: Buffer;
    contentType: string;
}
const PRESET_VOICE_DIR = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "basic",
)

const seedSchema = z.object({
    DATABASE_URL: z.string().min(1),
    S3_BUCKET_API: z.string().min(1),
    S3_ACCESS_KEY: z.string().min(1),
    S3_SECRET_ACCESS_KEY: z.string().min(1),
    S3_BUCKET_NAME: z.string().min(1),
})

const seed = seedSchema.parse(process.env);
const adapter = new PrismaPg({connectionString: seed.DATABASE_URL});
const prisma = new PrismaClient({adapter});
const s3Bucket = new S3Client({
    region: "auto",
    endpoint: `https://${seed.S3_BUCKET_API}`,
    credentials:{
        accessKeyId: seed.S3_ACCESS_KEY!,
        secretAccessKey: seed.S3_SECRET_ACCESS_KEY!,
    }
});
const presetVoiceMetadata: Record<string, VoiceMetadata> = {
    "Adrian": {
        description: "Adrian has a versatile voice with a warm and engaging tone, suitable for a wide range of applications including audiobooks, podcasts, and voiceovers.",
        category: "AUDIOBOOK",
        language: "en-US"
    },
    "Brianna": {
        description: "Brianna has a clear and articulate voice, perfect for news anchoring, corporate presentations, and educational content.",
        category: "ADVERTISING",
        language: "en-US"
    },
    "Carrigan": {
        description: "Carrigan hails from the Midwest and has an American Scottish accent. She has a warm and friendly voice, ideal for character voices, storytelling, and conversational applications.",
        category: "CHARACTERS",
        language: "en-US",
    },
    "Emmanuel": {
        description: "Emmanuel has a quirky and energetic voice, making them a great fit for animated characters, video games, and comedic content.",
        category: "CHARACTERS",
        language: "en-US",
    },
    "Jessica": {
        description: "Jessica has a smooth and soothing voice, perfect for meditation guides, motivational speeches, and podcast hosting.",
        category: "MEDITATION",
        language: "en-AU",
    },
    "Miles": {
        description: "Miles has a professional and friendly voice, ideal for customer service applications, corporate training materials, and voiceovers.",
        category: "CUSTOMER_SERVICE",
        language: "en-US",
    }, 
    "Ross": {
        description: "Ross has a clear and versatile voice, making him suitable for narration, documentary voiceovers, and audiobook narration.",
        category: "GENERAL",
        language: "en-US",
    }
}

async function readPresetVoices(name: string){
    const filePath = path.join(PRESET_VOICE_DIR, `${name}.wav`);
    const buffer = Buffer.from(await fs.readFile(filePath));
    return {buffer, contentType: "audio/wav"};
}

async function uploadPresetVoices({key, buffer, contentType}: UploadOptions ){
    const commandInput: PutObjectCommandInput ={
        Bucket: seed.S3_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: contentType
    }
    await s3Bucket.send(new PutObjectCommand(commandInput));
}

async function seedPresetVoices(name: string){
    const {buffer, contentType} = await readPresetVoices(name);
    const existingVoice = await prisma.voice.findFirst({
        where: {
            variant: "PRESET",
            name,
        },
        select: {id: true},
    });
    if (existingVoice){
        const s3ObjectKey = `voices/preset/${existingVoice.id}`;
        const meta = presetVoiceMetadata[name];
        await uploadPresetVoices({key: s3ObjectKey, buffer, contentType});
        await prisma.voice.update({
            where: {id: existingVoice.id},
            data:{
                s3ObjectKey,
                ...(meta && {
                    description: meta.description,
                    category: meta.category,
                    language: meta.language
                })
            }
        })
        return;
    }
    const meta = presetVoiceMetadata[name];
    const voice = await prisma.voice.create({
        data:{
            name, 
            variant: "PRESET",
            orgId: null,
            ...(meta && {
                description: meta.description,
                category: meta.category,
                language: meta.language
            }),
        },
        select: {id: true},
    })
    const s3ObjectKey = `voices/preset/${voice.id}`;
    try{
        await uploadPresetVoices({
            key: s3ObjectKey,
            buffer, 
            contentType
        })
        await prisma.voice.update({
            where: {id: voice.id},
            data
            :{s3ObjectKey}
        })
    }
    catch(error){
        await prisma.voice.delete({
            where: {id: voice.id},

        })
        .catch(()=>{});
        throw error;
    }
}

async function main(){
    console.log("Seeding preset voices...");
    console.log("S3 endpoint:", `https://${seed.S3_BUCKET_API}`);
    for (const name of PRESET_VOICE_NAMES) {
        console.log(`Seeding voice: ${name}`);
        await seedPresetVoices(name);
    }
    console.log("Finished seeding preset voices.");
}

main()
.catch((error)=>{
    console.error("Error seeding preset voices:", error);
    process.exit(1);
})
.finally(async ()=>{
    await prisma.$disconnect();
})