"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, AudioLines, Heart, Languages, Mic2, Play, Sliders, Square, Zap } from "lucide-react";
import Link from "next/link";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { Tip, TipIcon } from "../data/tips";

type TipCardProps = Pick<Tip, "title" | "description" | "icon" | "gradient" | "href" | "animationData"> & {
  isPlaying: boolean;
  canPlay: boolean;
  onTogglePlay: () => void;
};

const iconMap: Record<TipIcon, React.ComponentType<{ className?: string }>> = {
  mic2: Mic2,
  languages: Languages,
  zap: Zap,
  audioLines: AudioLines,
  heart: Heart,
  sliders: Sliders,
};

export function TipCard({
  title,
  description,
  icon,
  gradient,
  href,
  animationData,
  isPlaying,
  canPlay,
  onTogglePlay,
}: TipCardProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const Icon = iconMap[icon] ?? Mic2;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    lottieRef.current?.goToAndStop(0, true);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lottieRef.current?.play();
      return;
    }

    if (!isHovered) {
      lottieRef.current?.goToAndStop(0, true);
    }
  }, [isHovered, isPlaying]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isPlaying) {
      lottieRef.current?.goToAndStop(0, true);
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-3">

      <div
        className={cn(
          "group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-muted/30 flex items-center justify-center",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={cn("pointer-events-none absolute inset-0 bg-linear-to-br opacity-35", gradient ?? "from-slate-400 to-slate-500")} />
        <div className={cn("pointer-events-none absolute -inset-px rounded-xl bg-linear-to-br opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-45", gradient ?? "from-slate-300 to-slate-500")} />

        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          className="relative z-10 h-20 w-20"
        />

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <button
            type="button"
            onClick={onTogglePlay}
            disabled={!canPlay}
            aria-label={isPlaying ? `Stop preview for ${title}` : `Play preview for ${title}`}
            className={cn(
              "relative rounded-full border border-white/15 bg-black/20 p-2 backdrop-blur-[1px] transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
              canPlay ? "cursor-pointer hover:bg-black/35" : "cursor-not-allowed opacity-60"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 text-slate-200/45 transition-all duration-300",
                (isHovered || isPlaying) ? "scale-0 opacity-0" : "scale-100 opacity-100"
              )}
            />
            <Play
              className={cn(
                "absolute inset-0 m-auto h-4 w-4 text-slate-100 transition-all duration-300",
                (!isPlaying && isHovered) ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}
            />
            <Square
              className={cn(
                "absolute inset-0 m-auto h-4 w-4 text-slate-100 transition-all duration-300",
                isPlaying ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}
            />
          </button>
        </div>

        {!canPlay && (
          <div className="pointer-events-none absolute bottom-1 left-1/2 z-30 -translate-x-1/2 rounded-md bg-black/35 px-1.5 py-0.5 text-[10px] text-white/70">
            No preview
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium leading-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* CTA */}
        <Button variant="outline" size="sm" className="mt-2 w-fit px-2 py-1 text-xs">
          <Link href={href} className="flex items-center gap-1">
            Learn more
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}