import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {env} from "./env";

type UploadAudioTypes = {
    buffer: Buffer;
    key: string;
    contentType?: string;
}
const s3Bucket = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.S3_BUCKET_API}`,
    credentials:{
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    }
});

export async function uploadAudioToS3({buffer, key, contentType="audio/wav",}: UploadAudioTypes): Promise<void>{
    await s3Bucket.send(new PutObjectCommand({
        Bucket: env.S3_BUCKET_NAME!,
        Key: key, 
        Body: buffer,
        ContentType: contentType
    }))
}

export async function getAudioUrlFromS3(key: string): Promise<string>{
    const command = new GetObjectCommand({
        Bucket: env.S3_BUCKET_NAME!,
        Key: key,
    });
    const url = await getSignedUrl(s3Bucket, command, {expiresIn: 3600});
    return url;
    }

export async function deleteAudioFromS3(key: string): Promise<void>{
    await s3Bucket.send(new DeleteObjectCommand({
        Bucket: env.S3_BUCKET_NAME!,
        Key: key,
    })
)
}