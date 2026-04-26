"use client";

import { useTTSForm } from "./tts-form-context";
import { TTSSelections } from "./tts-selections";
import { sliders } from "../data/sliders";
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
          
          <TTSSelections />

          <div className="h-px bg-border w-full" />

          {/* Data-Driven Sliders */}
          <div className="space-y-6">
            {sliders.map((slider) => (
              <form.Field
                key={slider.id}
                name={`settings.${slider.id}` as const}
                children={(field) => (
                  <div className="space-y-4">
                    <Label className="font-semibold">{slider.label}</Label>
                    
                    <div className="pt-2">
                      <Slider
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        // Base UI slider uses array for value
                        value={[typeof field.state.value === "number" ? field.state.value : slider.defaultValue]}
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
