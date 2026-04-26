"use client";

import { Sparkles, Volume2, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TTSAudioPreview() {
  return (
    <div className="relative flex h-full min-h-75 flex-col items-center justify-center overflow-hidden rounded-xl border bg-card p-8 text-card-foreground shadow-sm">
        {/* Subtle background decoration */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
            style={{
                clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] sm:w-288.75"
            />
        </div>

      <div className="flex flex-col items-center gap-6 max-w-sm text-center">
        <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-primary/10">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Waves className="h-5 w-5 text-muted-foreground" />
            </div>
        </div>

        <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">Preview will appear here</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
            Once you generate, your audio result will appear here. Sit back and relax.
            </p>
        </div>

        <Button variant="outline" className="mt-4 rounded-full px-6">
            <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                See how it works
            </span>
        </Button>
      </div>
    </div>
  );
}
