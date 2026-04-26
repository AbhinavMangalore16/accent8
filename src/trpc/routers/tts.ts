import { ttsFormSchema } from "@/modules/tts-feature/data/form";
import { createTRPCRouter, orgProcedure } from "../init";

export const ttsRouter = createTRPCRouter({
  generate: orgProcedure.input(ttsFormSchema).mutation(async ({ input }) => {
    return {
      success: true,
      status: "queued" as const,
      request: input,
      audioUrl: null as string | null,
    };
  }),
});
