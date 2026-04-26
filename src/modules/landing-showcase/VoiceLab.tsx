"use client";

import { useEffect, useRef, useState } from "react";
import { TipCard } from "../dashboard-feature/ui/TipCard";
import { tips } from "./tips";
import { useAgeGate } from "../../../providers/AgeGuardrail";

export default function VoiceLab() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { requestAccess } = useAgeGate();

  // attach ended listener once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnd = () => setPlayingId(null);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  const handlePlay = (id: string, url: string, isProfane: boolean) => {
    if (!audioRef.current) return;

    const playLogic = () => {
        if (playingId === id) {
        audioRef.current!.pause();
        audioRef.current!.currentTime = 0;
        setPlayingId(null);
        return;
        }

        audioRef.current!.pause();
        audioRef.current!.currentTime = 0;

        audioRef.current!.src = url;
        audioRef.current!.play().catch(console.error);

        setPlayingId(id);
    };

    if (isProfane) {
        requestAccess(playLogic);
    } else {
        playLogic();
    }
    };

  // Group tips by their tier
  const premiumTips = tips.filter((t) => t.tier === "premium");
  const basicTips = tips.filter((t) => t.tier === "basic");
  const showcaseTips = tips.filter((t) => t.tier === "showcase");

  // Reusable rendering function for sections
  const renderVoiceSection = (title: string, sectionTips: typeof tips) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-black/90">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectionTips.map((tip) => {
          const voice = tip.voices[0];

          return (
            <div key={voice.id} className="relative">
              {/* Alert Badge for Profanity */}
              {tip.isProfane && (
                <div className="absolute -top-3 -right-3 z-10 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border-2 border-red-800 animate-pulse">
                  ⚠️ Profane
                </div>
              )}
              
              <TipCard
                title={tip.title}
                description={tip.description}
                icon={tip.icon}
                gradient={tip.gradient}
                href={tip.href}
                animationData={tip.animationData}
                isPlaying={playingId === voice.id}
                canPlay={!!voice.previewUrl}
                onTogglePlay={() => handlePlay(voice.id, voice.previewUrl, !!tip.isProfane)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Persistent audio element */}
      <audio ref={audioRef} preload="none" />

      
      {renderVoiceSection("Basic Voices", basicTips)}
      {renderVoiceSection("Showcase Series", showcaseTips)}
      {renderVoiceSection("Premium Voices", premiumTips)}
    </div>
  );
}