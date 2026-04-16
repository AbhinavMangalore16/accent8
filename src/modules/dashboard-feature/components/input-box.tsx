"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Textarea } from "@/components/ui/textarea";
import { MAX_LIMIT_FREE } from "@/modules/tts-feature/data/constant";
import { Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const COST_PER_1000 = 0.5;

export function InputBox() {
  const [text, setText] = useState("");
  const router = useRouter();
  const remaining =
    text.length === 0 ? MAX_LIMIT_FREE : MAX_LIMIT_FREE - text.length;
  const cost = ((text.length / 1000) * COST_PER_1000).toFixed(2);
  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    router.push(`/tts?text=${encodeURIComponent(trimmed)}`);
  };
  return (
    <div className="rounded-[22px] bg-linear-185 from-[#f5d0fe] from-15% via-[#22d3ee] via-39% to-[#c4b5fd] to-85% p-0.5 shadow-[0_0_0_2px_white]">
      <div className="rounded-[18px] bg-[#f9f9f9] p-1">
        <div className="space-y-4 rounded-2xl bg-white p-4 drop-shadow-xs">
          <Textarea
            placeholder="Start your text or paste text here..."
            className="min-h-35 resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_LIMIT_FREE}
          />
          <div className="flex items-center justify-between pt-2">
  
            {/* LEFT → Characters (subtle) */}
            <span className="text-xs text-muted-foreground">
                {text.length.toLocaleString()}/{MAX_LIMIT_FREE.toLocaleString()} characters used
            </span>

            {/* RIGHT → Cost (highlighted badge) */}
            <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium"
            >
                <Coins className="h-3.5 w-3.5 text-yellow-500" />
                ₹{cost}
            </Badge>
            </div>
        </div>
        <div className="flex items-center justify-end p-3">

            <Button size="sm" disabled={!text.trim()} onClick={handleSubmit} className="w-full lg:w-auto">
                Generate Audio
            </Button>

        </div>
      </div>
    </div>
  );
}
