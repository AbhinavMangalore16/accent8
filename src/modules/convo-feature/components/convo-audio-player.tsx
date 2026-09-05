"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FastForward,
  MessageSquareQuote,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

interface ConvoTurn {
  voiceName: string;
  text: string;
  audioUrl: string;
}

interface ConvoAudioPlayerProps {
  masterAudioUrl: string | null;
  turns: ConvoTurn[];
}

export function ConvoAudioPlayer({
  masterAudioUrl,
  turns,
}: ConvoAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [activeTurnIndex, setActiveTurnIndex] = useState<number | null>(null);
  const [playMode, setPlayMode] = useState<"master" | "sequential">("master");

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveTurnIndex(null);
    setPlayMode("master");
  }, [masterAudioUrl]);

  if (!masterAudioUrl) {
    return (
      <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center text-muted-foreground">
        <MessageSquareQuote className="h-8 w-8 text-primary/40 mb-2 animate-pulse" />
        <p className="text-sm font-medium">No conversation generated yet</p>
        <p className="text-xs text-muted-foreground">
          Add dialogue lines above and click &quot;Generate Conversation&quot;
          to hear full multi-speaker speech.
        </p>
      </div>
    );
  }

  const togglePlayMaster = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setPlayMode("master");
      setActiveTurnIndex(null);
      if (audioRef.current.src !== masterAudioUrl) {
        audioRef.current.src = masterAudioUrl;
      }
      audioRef.current.play();
    }
  };

  const playSequentialFromStart = () => {
    if (!audioRef.current || turns.length === 0) return;
    audioRef.current.pause();
    setPlayMode("sequential");
    setActiveTurnIndex(0);
    audioRef.current.src = turns[0].audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleEnded = () => {
    if (playMode === "sequential" && activeTurnIndex !== null) {
      const nextIdx = activeTurnIndex + 1;
      if (nextIdx < turns.length) {
        setActiveTurnIndex(nextIdx);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.src = turns[nextIdx].audioUrl;
            audioRef.current.play();
          }
        }, 350);
        return;
      }
    }
    setIsPlaying(false);
    setActiveTurnIndex(null);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (val: number | readonly number[]) => {
    const newTime = Array.isArray(val) ? val[0] : (val as number);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (val: number | readonly number[]) => {
    const newVol = Array.isArray(val) ? val[0] : (val as number);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSpeedToggle = () => {
    const rates = [1.0, 1.25, 1.5, 2.0, 0.75];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    setPlaybackRate(rates[nextIdx]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const playSingleTurn = (turnUrl: string, idx: number) => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayMode("sequential");
    setActiveTurnIndex(idx);
    audioRef.current.src = turnUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="space-y-4 rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <audio
        ref={audioRef}
        src={masterAudioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="gap-1 border-primary/30 text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {playMode === "sequential"
              ? "Sequential Turns Playback"
              : "Stitched Master Audio"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {turns.length} Speaker Turn{turns.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={playSequentialFromStart}
            className="gap-1.5 text-xs"
          >
            <Play className="h-3.5 w-3.5 text-emerald-500" />
            Play Turns In Order
          </Button>

          <a href={masterAudioUrl} download="accent8_conversation.wav">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Download className="h-3.5 w-3.5" />
              Download Dialogue (WAV)
            </Button>
          </a>
        </div>
      </div>

      {/* Main Player Bar */}
      <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={togglePlayMaster}
            className="h-11 w-11 shrink-0 rounded-full shadow-md transition-transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          {/* Audio Timeline & Waveform */}
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />

            {/* Waveform Bars Animation */}
            <div className="flex h-5 w-full items-center justify-between gap-1 px-1">
              {Array.from({ length: 36 }).map((_, i) => {
                const heightPercent = isPlaying
                  ? Math.sin(i * 0.4 + currentTime * 8) * 40 + 50
                  : 20;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full bg-primary/60 transition-all duration-75"
                    style={{ height: `${Math.max(15, heightPercent)}%` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSpeedToggle}
              className="h-8 px-2 text-xs font-mono gap-1"
            >
              <FastForward className="h-3 w-3" />
              {playbackRate}x
            </Button>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8 text-muted-foreground"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.05}
                onValueChange={handleVolumeChange}
                className="w-16 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Individual Turn Previews */}
      {turns.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="text-xs font-medium text-muted-foreground">
            Individual Speaker Turns
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {turns.map((turn, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between rounded-md border p-2.5 text-xs transition-colors ${
                  activeTurnIndex === idx
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "bg-card"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <Badge
                    variant={activeTurnIndex === idx ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    Turn {idx + 1}
                  </Badge>
                  <span className="font-semibold text-foreground truncate">
                    {turn.voiceName}
                  </span>
                  <span className="text-muted-foreground truncate">
                    &quot;{turn.text}&quot;
                  </span>
                </div>
                <Button
                  type="button"
                  variant={
                    activeTurnIndex === idx && isPlaying ? "default" : "ghost"
                  }
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => playSingleTurn(turn.audioUrl, idx)}
                >
                  {activeTurnIndex === idx && isPlaying ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
