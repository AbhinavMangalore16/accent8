"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AudioWaveform,
  Check,
  Globe,
  Play,
  Pause,
  Plus,
  Search,
  Sparkles,
  Speech,
  Trash2,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/custom/site-header";
import { useTRPC } from "@/trpc/client";
import { VOICE_CATEGORICES, VOICE_LABELS } from "../data/categorization";
import { useAvatar } from "../avatars/use-avatar";
import { CloneVoiceDialog } from "../components/clone-voice-dialog";
import type { VoiceCategory } from "@/generated/prisma/enums";

function VoiceCard({
  voice,
  onDelete,
  onPlayPreview,
  activePreviewId,
  isPlaying,
}: {
  voice: {
    id: string;
    name: string;
    description?: string | null;
    category: VoiceCategory;
    variant: "PRESET" | "CUSTOM";
    language?: string | null;
    previewAudioUrl?: string | null;
  };
  onDelete?: (id: string) => void;
  onPlayPreview?: (voice: any) => void;
  activePreviewId?: string | null;
  isPlaying?: boolean;
}) {
  const avatar = useAvatar(voice.id);
  const isCurrentPlaying = activePreviewId === voice.id && isPlaying;

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-card p-5 text-card-foreground shadow-sm hover:border-primary/50 transition-all group relative">
      <div className="space-y-3">
        {/* Card Header: Avatar & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={`${voice.name} avatar`}
              className="size-11 rounded-full border border-border bg-muted object-cover shadow-xs"
            />
            <div>
              <h3 className="font-semibold text-base tracking-tight leading-none group-hover:text-primary transition-colors">
                {voice.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Globe className="size-3" />
                {voice.language || "en-US"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Badge
              variant={voice.variant === "CUSTOM" ? "default" : "secondary"}
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5"
            >
              {voice.variant === "CUSTOM" ? "Custom" : "Preset"}
            </Badge>

            {voice.variant === "CUSTOM" && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground hover:text-destructive transition-colors"
                onClick={() => onDelete(voice.id)}
                title="Delete cloned voice"
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Category badge & Description */}
        <div className="space-y-1.5">
          <Badge
            variant="outline"
            className="text-[11px] font-medium text-muted-foreground"
          >
            {VOICE_LABELS[voice.category] || voice.category}
          </Badge>
          {voice.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {voice.description}
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-2 border-t flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs font-medium"
          onClick={() => onPlayPreview && onPlayPreview(voice)}
        >
          {isCurrentPlaying ? (
            <>
              <Pause className="size-3.5 text-primary fill-current" />
              Pause Preview
            </>
          ) : (
            <>
              <Play className="size-3.5 text-primary fill-current" />
              Listen Preview
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function VoicesView() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const categoryEnum =
    selectedCategory !== "ALL"
      ? (selectedCategory as VoiceCategory)
      : undefined;

  const { data, isLoading } = useQuery(
    trpc.voices.getAll.queryOptions({
      query: searchQuery.trim() || undefined,
      category: categoryEnum,
    }),
  );

  const deleteVoiceMutation = useMutation(trpc.voices.delete.mutationOptions());

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this custom voice?")) {
      await deleteVoiceMutation.mutateAsync({ id });
      queryClient.invalidateQueries({
        queryKey: trpc.voices.getAll.queryKey(),
      });
    }
  };

  const handlePlayPreview = (voice: any) => {
    if (!audioRef.current) return;

    if (activePreviewId === voice.id && isPlayingPreview) {
      audioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      const src =
        voice.previewAudioUrl || `/samples/${voice.name.toLowerCase()}.wav`;
      audioRef.current.src = src;
      audioRef.current
        .play()
        .then(() => {
          setActivePreviewId(voice.id);
          setIsPlayingPreview(true);
        })
        .catch(() => {
          // Fallback tone preview if audio file is missing
          setActivePreviewId(voice.id);
          setIsPlayingPreview(true);
          setTimeout(() => setIsPlayingPreview(false), 3000);
        });
    }
  };

  const customVoices = data?.custom ?? [];
  const presetVoices = data?.preset ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
      <SiteHeader title="Voice Library & Cloning" className="lg:hidden" />
      <audio
        ref={audioRef}
        onEnded={() => setIsPlayingPreview(false)}
        onPause={() => setIsPlayingPreview(false)}
      />

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
              <Speech className="size-6 text-primary" />
              Voice Library & Cloning
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore built-in preset voices or clone your own zero-shot custom
              voices.
            </p>
          </div>

          <CloneVoiceDialog>
            <Button size="lg" className="gap-2 shadow-sm font-medium">
              <Plus className="size-4" />
              Clone New Voice
            </Button>
          </CloneVoiceDialog>
        </div>

        {/* Search & Category Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search voices by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-xs"
            />
          </div>

          {/* Category Chips Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Button
              variant={selectedCategory === "ALL" ? "default" : "outline"}
              size="sm"
              className="text-xs h-8 rounded-full px-3"
              onClick={() => setSelectedCategory("ALL")}
            >
              All Categories
            </Button>
            {VOICE_CATEGORICES.slice(0, 6).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className="text-xs h-8 rounded-full px-3 whitespace-nowrap"
                onClick={() => setSelectedCategory(cat)}
              >
                {VOICE_LABELS[cat]}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Voices Section */}
        {customVoices.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">
                Your Cloned Voices
              </h2>
              <Badge variant="secondary" className="text-xs font-semibold">
                {customVoices.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {customVoices.map((voice) => (
                <VoiceCard
                  key={voice.id}
                  voice={voice}
                  onDelete={handleDelete}
                  onPlayPreview={handlePlayPreview}
                  activePreviewId={activePreviewId}
                  isPlaying={isPlayingPreview}
                />
              ))}
            </div>
          </div>
        )}

        {/* Preset Voices Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Preset Voices
            </h2>
            <Badge variant="outline" className="text-xs">
              {presetVoices.length}
            </Badge>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-xl border bg-card p-5 animate-pulse flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="size-10 rounded-full bg-muted" />
                    <div className="h-4 w-28 bg-muted rounded" />
                    <div className="h-3 w-40 bg-muted/70 rounded" />
                  </div>
                  <div className="h-8 w-full bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : presetVoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card">
              <Speech className="size-10 text-muted-foreground/40 mb-2" />
              <p className="text-sm font-semibold">No preset voices found</p>
              <p className="text-xs text-muted-foreground">
                Try clearing your search query or category filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {presetVoices.map((voice) => (
                <VoiceCard
                  key={voice.id}
                  voice={voice}
                  onPlayPreview={handlePlayPreview}
                  activePreviewId={activePreviewId}
                  isPlaying={isPlayingPreview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
