import { createTRPCRouter } from "../init";
import { voicesRouter } from "./voices";
import { ttsRouter } from "./tts";
import { convoRouter } from "./convo";

export const appRouter = createTRPCRouter({
  voices: voicesRouter,
  tts: ttsRouter,
  convo: convoRouter,
});

export type AppRouter = typeof appRouter;
