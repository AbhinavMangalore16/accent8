import { VoiceCategory } from "@/generated/prisma/enums";

export const VOICE_LABELS: Record<VoiceCategory, string> = {
  AUDIOBOOK: "Audiobook",
  CONVERSATIONAL: "Conversational",
  CUSTOMER_SERVICE: "Customer Service",
  GENERAL: "General",
  NARRATIVE: "Narrative",
  CHARACTERS: "Characters",
  MEDITATION: "Meditation",
  MOTIVATIONAL: "Motivational",
  PODCAST: "Podcast",
  ADVERTISING: "Advertising",
  VOICEOVER: "Voiceover",
  CORPORATE: "Corporate"
}

export const VOICE_CATEGORICES = Object.keys(
    VOICE_LABELS,
) as VoiceCategory[];