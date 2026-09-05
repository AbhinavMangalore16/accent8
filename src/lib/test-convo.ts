import "dotenv/config";
import { appRouter } from "@/trpc/routers/_app";
import { prisma } from "@/lib/db";

async function testConvo() {
  const hajime = await prisma.voice.findFirst({ where: { name: "Hajime" } });
  const chiaki = await prisma.voice.findFirst({ where: { name: "Chiaki" } });

  console.log("Hajime voice:", hajime?.name, hajime?.s3ObjectKey);
  console.log("Chiaki voice:", chiaki?.name, chiaki?.s3ObjectKey);

  if (!hajime || !chiaki) {
    console.error("Hajime or Chiaki not found!");
    return;
  }

  const caller = appRouter.createCaller({
    auth: { orgId: "test_org", userId: "test_user" },
  } as any);

  console.log("\nCalling convo.generate for Hajime & Chiaki...");
  const res = await caller.convo.generate({
    turns: [
      {
        voiceId: hajime.id,
        text: "I am so happy to see you now, Chiaki!",
      },
      {
        voiceId: chiaki.id,
        text: "I am very well, how are you doing Hajime?",
      },
    ],
  });

  console.log("\nResult masterAudioUrl len:", res.masterAudioUrl.length);
  console.log("Turn 1 audioUrl len:", res.turns[0].audioUrl.length);
  console.log("Turn 2 audioUrl len:", res.turns[1].audioUrl.length);
}

testConvo().catch(console.error);
