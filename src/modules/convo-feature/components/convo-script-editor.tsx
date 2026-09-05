"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown,
  ArrowUp,
  Coins,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { ConvoAudioPlayer } from "./convo-audio-player";

interface TurnItem {
  id: string;
  voiceId: string;
  text: string;
}

export function ConvoScriptEditor() {
  const trpc = useTRPC();
  const { data: voicesData } = useQuery(trpc.voices.getAll.queryOptions());

  const allVoices = [
    ...(voicesData?.preset ?? []),
    ...(voicesData?.custom ?? []),
  ];

  const [turns, setTurns] = useState<TurnItem[]>([
    {
      id: "turn_1",
      voiceId: "",
      text: "Hey Hajime, did you check out the new Accent8 speech studio?",
    },
    {
      id: "turn_2",
      voiceId: "",
      text: "Yes Aria! The multi-speaker conversation generator is fast and sounds so natural.",
    },
  ]);

  const [masterAudioUrl, setMasterAudioUrl] = useState<string | null>(null);
  const [convoTurns, setConvoTurns] = useState<
    Array<{ voiceName: string; text: string; audioUrl: string }>
  >([]);

  const generateMutation = useMutation(
    trpc.convo.generate.mutationOptions({
      onSuccess: (data: { masterAudioUrl: string; turns: Array<{ voiceName: string; text: string; audioUrl: string }> }) => {
        setMasterAudioUrl(data.masterAudioUrl);
        setConvoTurns(data.turns);
      },
    })
  );

  const defaultVoiceId = allVoices[0]?.id ?? "";
  const secondaryVoiceId = allVoices[1]?.id ?? defaultVoiceId;

  const getVoiceId = (turnIdx: number, currentVoiceId: string) => {
    if (currentVoiceId) return currentVoiceId;
    return turnIdx % 2 === 0 ? defaultVoiceId : secondaryVoiceId;
  };

  const handleAddTurn = () => {
    const nextIdx = turns.length;
    setTurns([
      ...turns,
      {
        id: `turn_${Date.now()}`,
        voiceId: nextIdx % 2 === 0 ? defaultVoiceId : secondaryVoiceId,
        text: "",
      },
    ]);
  };

  const handleRemoveTurn = (id: string) => {
    if (turns.length <= 1) return;
    setTurns(turns.filter((t) => t.id !== id));
  };

  const handleMoveTurn = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= turns.length) return;
    const updated = [...turns];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setTurns(updated);
  };

  const handleUpdateTurn = (id: string, field: "voiceId" | "text", value: string) => {
    setTurns(
      turns.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const totalChars = turns.reduce((acc, t) => acc + t.text.length, 0);
  const totalCost = ((totalChars / 1000) * 0.5).toFixed(2);
  const isValid = turns.every((t) => t.text.trim().length > 0) && totalChars > 0;

  const handleGenerate = () => {
    if (!isValid || generateMutation.isPending) return;
    generateMutation.mutate({
      turns: turns.map((t, idx) => {
        const vId = getVoiceId(idx, t.voiceId);
        const voiceObj = allVoices.find((v) => v.id === vId);
        return {
          voiceId: vId,
          voiceName: voiceObj?.name,
          text: t.text.trim(),
          settings: {
            temperature: 0.8,
            topP: 0.95,
            topK: 1000,
            repetitionPenalty: 1.2,
          },
        };
      }),
    });
  };

  return (
    <div className="space-y-6">
      {/* Script Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border bg-card p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Dialogue Script</h2>
          <p className="text-xs text-muted-foreground">
            Assign voices to speakers and generate a multi-turn conversational podcast or dialogue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1.5 py-1 text-xs">
            <Coins className="h-3.5 w-3.5 text-emerald-500" />
            ₹{totalCost} ({totalChars.toLocaleString()} chars)
          </Badge>

          <Button
            type="button"
            size="sm"
            onClick={handleAddTurn}
            variant="outline"
            className="gap-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Turn
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={!isValid || generateMutation.isPending}
            onClick={handleGenerate}
            className="gap-2 min-w-36"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Conversation
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Dialogue Turn Cards */}
      <div className="space-y-4">
        {turns.map((turn, idx) => {
          const selectedVoiceId = getVoiceId(idx, turn.voiceId);
          const selectedVoice = allVoices.find((v) => v.id === selectedVoiceId);
          return (
            <div
              key={turn.id}
              className="group relative flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                {/* Speaker Voice Selection */}
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {idx + 1}
                  </span>

                  <Select
                    value={selectedVoiceId}
                    onValueChange={(val) => handleUpdateTurn(turn.id, "voiceId", val ?? "")}
                  >
                    <SelectTrigger className="w-56 h-9 text-xs">
                      <SelectValue placeholder="Select speaker voice">
                        {selectedVoice ? selectedVoice.name : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {allVoices.map((v) => (
                        <SelectItem key={v.id} value={v.id} className="text-xs">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[10px]">
                                {v.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{v.name}</span>
                            <Badge variant="outline" className="text-[9px] px-1 py-0">
                              {v.category}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Move & Delete controls */}
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={idx === 0}
                    onClick={() => handleMoveTurn(idx, "up")}
                    className="h-7 w-7 text-muted-foreground"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={idx === turns.length - 1}
                    onClick={() => handleMoveTurn(idx, "down")}
                    className="h-7 w-7 text-muted-foreground"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={turns.length <= 1}
                    onClick={() => handleRemoveTurn(turn.id)}
                    className="h-7 w-7 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Dialogue Input */}
              <Textarea
                placeholder={`Type speaker ${idx + 1}'s line...`}
                value={turn.text}
                onChange={(e) => handleUpdateTurn(turn.id, "text", e.target.value)}
                className="min-h-20 resize-none text-sm bg-muted/20 border-muted focus-visible:ring-1"
              />
            </div>
          );
        })}
      </div>

      {/* Output Master Player */}
      <ConvoAudioPlayer masterAudioUrl={masterAudioUrl} turns={convoTurns} />
    </div>
  );
}
