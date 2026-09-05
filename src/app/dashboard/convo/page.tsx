import { ConvoView } from "@/modules/convo-feature/views/convo-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function ConvoPage() {
  prefetch(trpc.voices.getAll.queryOptions());

  return (
    <HydrateClient>
      <ConvoView />
    </HydrateClient>
  );
}
