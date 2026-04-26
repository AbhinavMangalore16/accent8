import { createTRPCRouter } from '../init';
import { voicesRouter } from './voices';
import { ttsRouter } from './tts';
 
export const appRouter = createTRPCRouter({
  voices: voicesRouter,
  tts: ttsRouter,
});
 
// export type definition of API
export type AppRouter = typeof appRouter;