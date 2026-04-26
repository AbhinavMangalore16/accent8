"use client";

import { createContext, useContext } from "react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

type VoicesOutputItem = inferRouterOutputs<AppRouter>["voices"]["getAll"]["preset"][number];
interface VoiceContextType {
    customVoices: VoicesOutputItem[];
    presetVoices: VoicesOutputItem[];
    allVoices: VoicesOutputItem[];
}

const VoiceContext = createContext<VoiceContextType | null>(null);

export function VoiceProvider({children, value}: {children: React.ReactNode, value: VoiceContextType}){
    return (
        <VoiceContext.Provider value={value}>
            {children}
        </VoiceContext.Provider>
    )
}

export function useVoiceContext(){
    const context = useContext(VoiceContext);
    if (!context) throw new Error("useVoiceContext must be used within a VoiceProvider");
    return context;
}