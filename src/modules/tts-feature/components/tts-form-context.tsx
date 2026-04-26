"use client";

import { useForm } from "@tanstack/react-form";
import { createContext, useContext, ReactNode } from "react";

export interface TTSFormValues {
  text: string;
  voiceId: string;
  settings: {
    creativity: number;
    voiceVariety: number;
    expressionRange: number;
    naturalFlow: number;
  };
}

function createTTSForm() {
  return useForm({
    defaultValues: {
      text: "",
      voiceId: "",
      settings: {
        creativity: 70,
        voiceVariety: 50,
        expressionRange: 50,
        naturalFlow: 50,
      },
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting TTS:", value);
      // Simulate submission network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
  });
}

export type TTSFormApi = ReturnType<typeof createTTSForm>;

const TTSFormContext = createContext<TTSFormApi | undefined>(undefined);

export function TTSFormProvider({ children }: { children: ReactNode }) {
  const form = createTTSForm();

  return (
    <TTSFormContext.Provider value={form}>
      {children}
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
