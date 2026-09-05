"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppForm } from "@/hooks/use-app-form";
import { useTRPC } from "@/trpc/client";
import {
  defaultTTSValues,
  TTSFormValues,
  ttsFormOptions,
  ttsFormSchema,
} from "../data/form";

export type AudioResult = {
  audioUrl: string | null;
  voiceName: string;
  text: string;
  generationId?: string;
};

function createTTSForm(
  defaultValues: Partial<TTSFormValues> | undefined,
  submitAction: (values: TTSFormValues) => Promise<unknown>,
) {
  const mergedDefaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...defaultValues,
    settings: {
      ...defaultTTSValues.settings,
      ...defaultValues?.settings,
    },
  };

  return useAppForm({
    ...ttsFormOptions,
    defaultValues: mergedDefaultValues,
    validators: {
      onSubmit: ttsFormSchema as never,
    },
    onSubmit: async ({ value }) => {
      await submitAction(value);
    },
  });
}

export type TTSFormApi = ReturnType<typeof createTTSForm>;

export type TTSContextType = {
  form: TTSFormApi;
  audioResult: AudioResult | null;
  setAudioResult: (result: AudioResult | null) => void;
  isGenerating: boolean;
  generationError: string | null;
};

const TTSFormContext = createContext<TTSContextType | undefined>(undefined);

export function TTSFormProvider({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues?: Partial<TTSFormValues>;
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [audioResult, setAudioResult] = useState<AudioResult | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const generateMutation = useMutation(trpc.tts.generate.mutationOptions());

  const form = createTTSForm(defaultValues, async (values) => {
    setGenerationError(null);
    try {
      const res = await generateMutation.mutateAsync(values);
      if (res?.audioUrl) {
        setAudioResult({
          audioUrl: res.audioUrl,
          voiceName: values.voiceName || "Selected Voice",
          text: values.text,
          generationId: res.generation?.id,
        });
        // Invalidate history query to refresh the history list
        queryClient.invalidateQueries({
          queryKey: trpc.tts.getHistory.queryKey(),
        });
      }
    } catch (err: any) {
      console.error("Failed to generate audio:", err);
      setGenerationError(
        err?.message || "Failed to generate audio. Please try again.",
      );
    }
  });

  return (
    <TTSFormContext.Provider
      value={{
        form,
        audioResult,
        setAudioResult,
        isGenerating: generateMutation.isPending,
        generationError,
      }}
    >
      <form.AppForm>{children}</form.AppForm>
    </TTSFormContext.Provider>
  );
}

export function useTTSForm() {
  const context = useContext(TTSFormContext);
  if (!context) {
    throw new Error("useTTSForm must be used within a TTSFormProvider");
  }
  return context.form;
}

export function useTTSContext() {
  const context = useContext(TTSFormContext);
  if (!context) {
    throw new Error("useTTSContext must be used within a TTSFormProvider");
  }
  return context;
}
