"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Coins, Loader2 } from "lucide-react";
import { useTTSForm } from "./tts-form-context";
import { COST_PER_1000, MAX_LIMIT_FREE } from "../data/constant";

export function TTSInputArea() {
  const form = useTTSForm();

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card text-card-foreground shadow-sm">
      <form.Field
        name="text"
        children={(field) => {
          const cost = ((field.state.value.length / 1000) * COST_PER_1000).toFixed(2);
          const isOverLimit = field.state.value.length > MAX_LIMIT_FREE;
          const isEmpty = field.state.value.length === 0;

          return (
            <>
              <div className="flex-1 p-4">
                <Textarea
                  placeholder="Start typing or paste your text here..."
                  className="h-full min-h-62.5 resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0 text-base"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  maxLength={MAX_LIMIT_FREE + 500} // Little buffer before hard cutoff for feedback
                />
              </div>

              <div className="flex items-center justify-between border-t p-4 bg-muted/20">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs ${
                        isOverLimit ? "text-destructive font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {field.state.value.length.toLocaleString()} /{" "}
                      {MAX_LIMIT_FREE.toLocaleString()} characters
                    </span>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium"
                    >
                      <Coins className="h-3.5 w-3.5 text-emerald-500" />
                      ₹{cost}
                    </Badge>
                  </div>
                  {isEmpty && (
                    <span className="text-xs text-muted-foreground">
                      Get started by typing or pasting text above
                    </span>
                  )}
                </div>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="button" // form submission is triggered manually or by context wrapping
                      size="default"
                      disabled={!canSubmit || isSubmitting || isOverLimit || isEmpty}
                      onClick={() => form.handleSubmit()}
                      className="min-w-30 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate"
                      )}
                    </Button>
                  )}
                />
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
