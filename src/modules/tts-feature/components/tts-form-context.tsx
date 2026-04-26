"use client";

import { createContext, useContext, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppForm } from "@/hooks/use-app-form";
import { useTRPC } from "@/trpc/client";
import {
  defaultTTSValues,
  TTSFormValues,
  ttsFormOptions,
  ttsFormSchema,
} from "../data/form";

function createTTSForm(
  defaultValues: Partial<TTSFormValues> | undefined,
  submitAction: (values: TTSFormValues) => Promise<unknown>
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
      console.log("TTS form submitted", value);
      await submitAction(value);
    },
  });
}

export type TTSFormApi = ReturnType<typeof createTTSForm>;

const TTSFormContext = createContext<TTSFormApi | undefined>(undefined);

export function TTSFormProvider({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues?: Partial<TTSFormValues>;
}) {
  const trpc = useTRPC();
  const generateMutation = useMutation(trpc.tts.generate.mutationOptions());

  const form = createTTSForm(defaultValues, async (values) => {
    await generateMutation.mutateAsync(values);
  });

  return (
    <TTSFormContext.Provider value={form}>
      <form.AppForm>{children}</form.AppForm>
    </TTSFormContext.Provider>
  );
}

export function useTTSForm() {
  const context = useContext(TTSFormContext);
  if (!context) {
    throw new Error("useTTSForm must be used within a TTSFormProvider");
  }
  return context;
}
