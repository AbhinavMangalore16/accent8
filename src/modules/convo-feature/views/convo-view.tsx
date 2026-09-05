"use client";

import { SiteHeader } from "@/components/custom/site-header";
import { ConvoScriptEditor } from "../components/convo-script-editor";

export function ConvoView() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-background">
      <SiteHeader title="Multi-turn Conversation" className="lg:hidden" />
      <div className="mx-auto w-full max-w-5xl space-y-6 p-4 lg:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Multi-turn Conversation Studio
          </h1>
          <p className="text-sm text-muted-foreground">
            Create realistic dialogues, podcast episodes, and multi-character
            audio scripts by stitching AI voices together.
          </p>
        </div>

        <ConvoScriptEditor />
      </div>
    </div>
  );
}
