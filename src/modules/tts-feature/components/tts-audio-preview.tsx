"use client";

import { useEffect, useRef, useState } from "react";
import {
  Download,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useTTSContext } from "./tts-form-context";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function TTSAudioPreview() {
  const { audioResult, isGenerating, generationError } = useTTSContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Reset player when audioResult changes
  useEffect(() => {
    if (audioResult?.audioUrl && audioRef.current) {
      audioRef.current.src = audioResult.audioUrl;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = isMuted ? 0 : volume;
      setCurrentTime(0);
      setIsPlaying(false);
      // Auto-play generated speech
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [audioResult]);

  const togglePlay = () => {
    if (!audioRef.current || !audioResult?.audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (val: number | readonly number[]) => {
    const nextVal = Array.isArray(val)
      ? val[0]
      : typeof val === "number"
        ? val
        : 0;
    if (audioRef.current && typeof nextVal === "number") {
      audioRef.current.currentTime = nextVal;
      setCurrentTime(nextVal);
    }
  };

  const changePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2, 0.75];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (val: number | readonly number[]) => {
    const nextVol = Array.isArray(val)
      ? val[0]
      : typeof val === "number"
        ? val
        : 1;
    setVolume(nextVol);
    if (audioRef.current) {
      audioRef.current.volume = nextVol;
      setIsMuted(nextVol === 0);
    }
  };

  const handleDownload = () => {
    if (!audioResult?.audioUrl) return;
    const a = document.createElement("a");
    a.href = audioResult.audioUrl;
    a.download = `accent8-speech-${Date.now()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="relative flex flex-col min-h-75 justify-between overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Subtle Background Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-primary/20 to-purple-500/20 opacity-20 sm:left-[calc(50%-30rem)] sm:w-288"
        />
      </div>

      {/* Loading State */}
      {isGenerating ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-12">
          <div className="relative flex items-center justify-center">
            <div className="absolute size-16 rounded-full bg-primary/20 animate-ping" />
            <div className="size-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Loader2 className="size-7 text-primary-foreground animate-spin" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold tracking-tight">
              Generating audio speech...
            </h3>
            <p className="text-xs text-muted-foreground">
              Synthesizing vocal model and parameters
            </p>
          </div>
        </div>
      ) : audioResult?.audioUrl ? (
        /* Active Audio Player */
        <div className="flex flex-1 flex-col justify-between gap-6 py-2">
          {/* Header Info */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {audioResult.voiceName}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Generated
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs sm:max-w-md">
                  "{audioResult.text}"
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2 text-xs font-medium"
            >
              <Download className="size-3.5" />
              Download WAV
            </Button>
          </div>

          {/* Waveform Visualizer Animation */}
          <div className="flex items-center justify-center gap-1.5 h-16 px-4 py-2 bg-muted/30 rounded-lg border border-border/50">
            {Array.from({ length: 32 }).map((_, i) => {
              const heightPct = isPlaying
                ? Math.min(
                    100,
                    Math.max(15, Math.sin(i * 0.4 + currentTime * 8) * 50 + 50),
                  )
                : Math.min(60, Math.max(15, Math.sin(i * 0.5) * 30 + 35));
              return (
                <div
                  key={i}
                  style={{ height: `${heightPct}%` }}
                  className={`w-1 rounded-full transition-all duration-75 ${
                    isPlaying ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              );
            })}
          </div>

          {/* Controls & Progress Bar */}
          <div className="space-y-4 pt-2">
            {/* Timeline slider */}
            <div className="space-y-1.5">
              <Slider
                min={0}
                max={duration || 100}
                step={0.1}
                value={[currentTime]}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Button Controls Bar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 text-xs font-medium"
                  onClick={changePlaybackRate}
                  title="Playback speed"
                >
                  {playbackRate}x
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                    }
                  }}
                  title="Restart"
                >
                  <RotateCcw className="size-4" />
                </Button>

                <Button
                  size="icon"
                  className="size-12 rounded-full shadow-md shadow-primary/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="size-5 text-primary-foreground" />
                  ) : (
                    <Play className="size-5 text-primary-foreground ml-0.5" />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2 w-28 justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={toggleMute}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="size-4 text-muted-foreground" />
                  )}
                </Button>
                <div className="w-16">
                  <Slider
                    min={0}
                    max={1}
                    step={0.05}
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
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

          <div className="space-y-1.5 max-w-sm">
            <h3 className="text-lg font-semibold tracking-tight">
              Audio preview will appear here
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enter your text, pick a voice, and hit <strong>Generate</strong>{" "}
              to synthesize AI speech.
            </p>
          </div>

          {generationError && (
            <Badge variant="destructive" className="text-xs py-1 px-3">
              {generationError}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
