"use client";

import { useTTSForm } from "./tts-form-context";
import { TTS_SLIDERS } from "../data/constant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function TTSSettingsSidebar() {
  const form = useTTSForm();

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card shadow-sm overflow-hidden">
      <Tabs defaultValue="settings" className="flex flex-col h-full">
        {/* Tabs Header */}
        <div className="border-b px-4 py-3">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>

        {/* Settings Content */}
        <TabsContent value="settings" className="flex-1 overflow-y-auto p-6 space-y-8 min-h-0">
          
          {/* Voice Selector Mock */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Voice selector coming soon</Label>
            </div>
            <div className="h-12 w-full rounded-md border border-dashed border-muted-foreground/30 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
              Voice Selection Placholder
            </div>
          </div>

          <div className="h-px bg-border w-full" />

          {/* Data-Driven Sliders */}
          <div className="space-y-6">
            {TTS_SLIDERS.map((slider) => (
              <form.Field
                key={slider.id}
                name={`settings.${slider.id}` as const}
                children={(field) => (
                  <div className="space-y-4">
                    <Label className="font-semibold">{slider.label}</Label>
                    
                    <div className="pt-2">
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        // Base UI slider uses array for value
                        value={[field.state.value]}
                        onValueChange={(val) => {
                          const nextValue = Array.isArray(val) ? val[0] : val;
                          if (typeof nextValue === "number") {
                            field.handleChange(nextValue);
                          }
                        }}
                      />
                    </div>
                    
                    <div className="flex w-full justify-between text-[11px] font-medium text-muted-foreground">
                      <span>{slider.leftLabel}</span>
                      <span>{slider.rightLabel}</span>
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        </TabsContent>

        {/* History Content Placeholder */}
        <TabsContent value="history" className="flex-1 p-6">
          <div className="flex h-full flex-col items-center justify-center text-center space-y-2">
            <p className="text-sm text-muted-foreground">No generation history yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
