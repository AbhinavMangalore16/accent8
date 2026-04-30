import { TTSView } from "@/modules/tts-feature/views/tts-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

type TTSFeatureSearchParams = Promise<{
    text?: string | string[];
    voiceId?: string | string[];
}>;

function firstValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

export default async function TTSFeaturePage({
    searchParams,
}: {
    searchParams: TTSFeatureSearchParams;
}) {
    prefetch(trpc.voices.getAll.queryOptions());

    const resolvedSearchParams = await searchParams;
    const text = firstValue(resolvedSearchParams.text) ?? "";
    const voiceId = firstValue(resolvedSearchParams.voiceId) ?? "";

    return (
        <HydrateClient>
            <TTSView defaultValues={{ text, voiceId }} />
        </HydrateClient>
    )
}