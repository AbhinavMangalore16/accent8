export interface TTSSliderConfig {
  id: "creativity" | "voiceVariety" | "expressionRange" | "naturalFlow";
  label: string;
  leftLabel: string;
  rightLabel: string;
  defaultValue: number;
}

export const TTS_SLIDERS: TTSSliderConfig[] = [
  {
    id: "creativity",
    label: "Creativity",
    leftLabel: "Consistent",
    rightLabel: "Expressive",
    defaultValue: 50,
  },
  {
    id: "voiceVariety",
    label: "Voice Variety",
    leftLabel: "Stable",
    rightLabel: "Dynamic",
    defaultValue: 50,
  },
  {
    id: "expressionRange",
    label: "Expression Range",
    leftLabel: "Subtle",
    rightLabel: "Dramatic",
    defaultValue: 50,
  },
  {
    id: "naturalFlow",
    label: "Natural Flow",
    leftLabel: "Rhythmic",
    rightLabel: "Varied",
    defaultValue: 50,
  },
];

export const MAX_LIMIT_FREE = 5000;
export const COST_PER_1000 = 0.5;