"use client";

import { SiteHeader } from "@/components/custom/site-header";
import { TTSFormProvider } from "../components/tts-form-context";
import { TTSInputArea } from "../components/tts-input-area";
import { TTSAudioPreview } from "../components/tts-audio-preview";
import { TTSSettingsSidebar } from "../components/tts-settings-sidebar";

export function TTSView() {
  return (
    <TTSFormProvider>
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
        <SiteHeader title="Text to speech" className="lg:hidden" />
        
        {/* Main Content Area - 3 Panel logical layout mapped to 2 columns on lg */}
        <div className="flex h-full min-h-0 w-full flex-col gap-6 p-4 lg:flex-row lg:p-6">
          
          {/* Left Column: Panel 1 (Input) & Panel 2 (Preview) */}
          <div className="flex h-full min-h-0 w-full flex-col gap-6 overflow-y-auto pb-1 pr-1 lg:w-2/3">
            <div className="min-h-100 flex-1">
              <TTSInputArea />
            </div>
            <div className="shrink-0">
              <TTSAudioPreview />
            </div>
          </div>
          
          {/* Right Column: Panel 3 (Settings) */}
          <div className="h-150 w-full pb-1 lg:h-full lg:w-1/3">
            <TTSSettingsSidebar />
          </div>
          
        </div>
      </div>
    </TTSFormProvider>
  );
}
