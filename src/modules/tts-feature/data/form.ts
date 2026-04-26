import { z } from "zod";
import { sliders } from "./sliders";

type TTSSettingId = (typeof sliders)[number]["id"];

export type TTSSettingsValues = Record<TTSSettingId, number>;

const defaultTTSSettings = sliders.reduce((acc, slider) => {
  acc[slider.id] = slider.defaultValue;
  return acc;
}, {} as TTSSettingsValues);

export const defaultTTSValues = {
  text: "",
  voiceId: "",
  voiceName: "",
  settings: defaultTTSSettings,
};

export type TTSFormValues = typeof defaultTTSValues;

const settingsSchema = sliders.reduce((shape, slider) => {
  shape[slider.id] = z
    .number()
    .min(slider.min, `${slider.label} must be at least ${slider.min}`)
    .max(slider.max, `${slider.label} must be at most ${slider.max}`);

  return shape;
}, {} as Record<TTSSettingId, z.ZodNumber>);

export const ttsFormSchema = z.object({
  text: z.string().trim().min(1, "Text is required"),
  voiceId: z.string(),
  voiceName: z.string(),
  settings: z.object(settingsSchema),
}) as z.ZodType<TTSFormValues>;

export const ttsFormOptions = {
  defaultValues: defaultTTSValues,
  validators: {
    onSubmit: ttsFormSchema,
  },
};
