import "dotenv/config";
import {
  PrismaClient,
  VoiceCategory,
  VoiceVariant,
} from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const PRESET_VOICES: Array<{
  name: string;
  description: string;
  category: VoiceCategory;
  language: string;
  s3ObjectKey: string;
}> = [
  {
    name: "Aria",
    description:
      "Warm, smooth, and engaging narrator voice ideal for audiobooks and story-telling.",
    category: VoiceCategory.AUDIOBOOK,
    language: "en-US",
    s3ObjectKey: "voices/preset/cmoerne2l0000s8uhpn9bb46p",
  },
  {
    name: "Marcus",
    description:
      "Deep, authoritative, and clear tone perfect for corporate presentations and news.",
    category: VoiceCategory.CORPORATE,
    language: "en-US",
    s3ObjectKey: "voices/preset/cmoernhu00005s8uhgp64zxbw",
  },
  {
    name: "Elena",
    description:
      "Friendly, calm, and supportive voice suited for customer service and tutorials.",
    category: VoiceCategory.CUSTOMER_SERVICE,
    language: "en-UK",
    s3ObjectKey: "voices/preset/cmoernezj0001s8uhftnfo757",
  },
  {
    name: "Liam",
    description:
      "Energetic and conversational voice ideal for podcasts and modern content creation.",
    category: VoiceCategory.PODCAST,
    language: "en-US",
    s3ObjectKey: "voices/preset/cmoernge40003s8uh39gu5cll",
  },
  {
    name: "Sophia",
    description:
      "Expressive and dynamic voice great for advertising and voiceovers.",
    category: VoiceCategory.ADVERTISING,
    language: "en-UK",
    s3ObjectKey: "voices/preset/cmoernfmu0002s8uhazai0s89",
  },
  {
    name: "Zenith",
    description:
      "Soothing, slow-paced, and peaceful voice crafted for meditation and relaxation guides.",
    category: VoiceCategory.MEDITATION,
    language: "en-US",
    s3ObjectKey: "voices/preset/cmoernh2w0004s8uh8282t9hn",
  },
  {
    name: "Apex",
    description:
      "High-energy, punchy, and inspiring voice tailored for motivational speeches.",
    category: VoiceCategory.MOTIVATIONAL,
    language: "en-US",
    s3ObjectKey: "voices/preset/cmr2of2hb00004suhv32jvswm",
  },
  {
    name: "Oliver",
    description:
      "Versatile, natural, and friendly everyday conversational voice.",
    category: VoiceCategory.CONVERSATIONAL,
    language: "en-US",
    s3ObjectKey: "voices/preset/cmoernik50006s8uhxq3qdz6h",
  },
];

async function main() {
  console.log("Updating preset voices S3 keys...");
  for (const voice of PRESET_VOICES) {
    const existing = await prisma.voice.findFirst({
      where: {
        name: voice.name,
        variant: VoiceVariant.PRESET,
      },
    });

    if (existing) {
      await prisma.voice.update({
        where: { id: existing.id },
        data: { s3ObjectKey: voice.s3ObjectKey },
      });
      console.log(
        `Updated S3 key for preset voice: ${voice.name} -> ${voice.s3ObjectKey}`,
      );
    } else {
      await prisma.voice.create({
        data: {
          name: voice.name,
          description: voice.description,
          category: voice.category,
          language: voice.language,
          s3ObjectKey: voice.s3ObjectKey,
          variant: VoiceVariant.PRESET,
        },
      });
      console.log(`Created preset voice: ${voice.name}`);
    }
  }
  console.log("Seeding update complete!");
}

main()
  .catch((e) => {
    console.error("Error during seeding update:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
