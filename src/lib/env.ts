import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod"
export const env = createEnv({
    server: {
        DATABASE_URL: z.string().min(1),
        APP_URL: z.string().min(1),
        CLERK_SECRET_KEY: z.string().min(1),
        CLERK_PUBLISHABLE_KEY: z.string().min(1),
        S3_BUCKET_NAME: z.string().min(1),
        S3_BUCKET_API: z.string().min(1),
        S3_ACCESS_KEY: z.string().min(1),
        S3_SECRET_ACCESS_KEY: z.string().min(1),
    },
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})