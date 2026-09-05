"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Clock,
  Download,
  History,
  Play,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { useTTSContext, useTTSForm } from "./tts-form-context";
import { TTSSelections } from "./tts-selections";
import { sliders } from "../data/sliders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTRPC } from "@/trpc/client";

export function TTSSettingsSidebar() {
  const form = useTTSForm();
  const { setAudioResult } = useTTSContext();
  const trpc = useTRPC();

  const { data: historyItems, isLoading: isHistoryLoading } = useQuery(
    trpc.tts.getHistory.queryOptions(),
  );

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card shadow-sm overflow-hidden">
      <Tabs defaultValue="settings" className="flex flex-col h-full">
        {/* Tabs Header */}
        <div className="border-b px-4 py-3 bg-muted/20">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history" className="gap-1.5">
              <History className="size-3.5" />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Settings Content */}
        <TabsContent
          value="settings"
          className="flex-1 overflow-y-auto p-6 space-y-8 min-h-0"
        >
          <TTSSelections />

          <div className="h-px bg-border w-full" />

          {/* Data-Driven Sliders */}
          <div className="space-y-6">
            {sliders.map((slider) => (
              <form.Field
                key={slider.id}
                name={`settings.${slider.id}` as const}
                children={(field) => (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="font-semibold text-xs">
                        {slider.label}
                      </Label>
                      <span className="text-xs font-mono text-muted-foreground">
                        {typeof field.state.value === "number"
                          ? field.state.value.toFixed(slider.step < 1 ? 2 : 0)
                          : slider.defaultValue}
                      </span>
                    </div>

                    <div className="pt-1">
                      <Slider
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={[
                          typeof field.state.value === "number"
                            ? field.state.value
                            : slider.defaultValue,
                        ]}
                        onValueChange={(val) => {
                          const nextValue = Array.isArray(val) ? val[0] : val;
                          if (typeof nextValue === "number") {
                            field.handleChange(nextValue);
                          }
                        }}
                      />
                    </div>

                    <div className="flex w-full justify-between text-[10px] text-muted-foreground">
                      <span>{slider.leftLabel}</span>
                      <span>{slider.rightLabel}</span>
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        </TabsContent>

        {/* History Content */}
        <TabsContent
          value="history"
          className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
        >
          {isHistoryLoading ? (
            <div className="flex h-48 flex-col items-center justify-center text-center space-y-2">
              <Clock className="size-6 text-muted-foreground animate-pulse" />
              <p className="text-xs text-muted-foreground">
                Loading generation history...
              </p>
            </div>
          ) : !historyItems || historyItems.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center text-center space-y-2 p-4">
              <History className="size-8 text-muted-foreground/50" />
              <p className="text-sm font-medium">No generations yet</p>
              <p className="text-xs text-muted-foreground">
                Synthesize your first text-to-speech generation to view history
                here.
              </p>
            </div>
          ) : (
            historyItems.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 rounded-lg border bg-background p-3 hover:border-primary/40 transition-colors text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="font-medium text-[11px] py-0"
                    >
                      {item.voiceName}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {formattedDate}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-muted-foreground font-normal leading-relaxed">
                    "{item.text}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-[11px] gap-1.5 text-primary hover:text-primary"
                      onClick={() => {
                        if (item.audioUrl) {
                          setAudioResult({
                            audioUrl: item.audioUrl,
                            voiceName: item.voiceName,
                            text: item.text,
                            generationId: item.id,
                          });
                        }
                      }}
                    >
                      <Play className="size-3 fill-current" />
                      Replay
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-[11px] gap-1.5 text-muted-foreground"
                      onClick={() => {
                        form.setFieldValue("text", item.text);
                        if (item.voiceId)
                          form.setFieldValue("voiceId", item.voiceId);
                        form.setFieldValue("voiceName", item.voiceName);
                        form.setFieldValue(
                          "settings.temperature",
                          item.temperature,
                        );
                        form.setFieldValue("settings.topP", item.topP);
                        form.setFieldValue("settings.topK", item.topK);
                        form.setFieldValue(
                          "settings.repetitionPenalty",
                          item.repetitionPenalty,
                        );
                      }}
                      title="Reuse input text & settings"
                    >
                      <RotateCcw className="size-3" />
                      Reuse
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
