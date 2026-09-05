"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AudioWaveform,
  Mic,
  MicOff,
  Upload,
  Volume2,
  Loader2,
  Sparkles,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTRPC } from "@/trpc/client";
import { VOICE_CATEGORICES, VOICE_LABELS } from "../data/categorization";
import type { VoiceCategory } from "@/generated/prisma/enums";

export function CloneVoiceDialog({ children }: { children?: React.ReactNode }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<VoiceCategory>("GENERAL");
  const [language, setLanguage] = useState("en-US");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getPresignedUrlMutation = useMutation(
    trpc.voices.getPresignedUploadUrl.mutationOptions(),
  );
  const createVoiceMutation = useMutation(trpc.voices.create.mutationOptions());

  // Start Microphone Recording
  const startRecording = async () => {
    try {
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setRecordedBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access failed:", err);
      setErrorMsg(
        "Could not access microphone. Please check browser permissions.",
      );
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter a voice name");
      return;
    }

    const audioSource = selectedFile || recordedBlob;
    if (!audioSource) {
      setErrorMsg(
        "Please upload or record an audio sample (minimum 10 seconds recommended)",
      );
      return;
    }

    setIsUploading(true);
    setErrorMsg(null);

    try {
      const filename = selectedFile?.name || `recording_${Date.now()}.wav`;
      const contentType = selectedFile?.type || "audio/wav";

      // 1. Get presigned upload URL or object key
      const presignedRes = await getPresignedUrlMutation.mutateAsync({
        filename,
        contentType,
      });

      const { uploadUrl, s3ObjectKey } = presignedRes;

      // 2. Upload file directly if uploadUrl is provided
      if (uploadUrl) {
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": contentType },
          body: audioSource,
        });

        if (!uploadRes.ok) {
          throw new Error(
            "Failed to upload audio sample to Cloudflare R2 / S3.",
          );
        }
      }

      // 3. Save voice record in Prisma DB
      await createVoiceMutation.mutateAsync({
        name,
        description,
        category,
        language,
        s3ObjectKey,
      });

      // 4. Invalidate voice queries to update Voice Library
      queryClient.invalidateQueries({
        queryKey: trpc.voices.getAll.queryKey(),
      });

      // Reset & close
      setOpen(false);
      resetForm();
    } catch (err: any) {
      console.error("Voice creation failed:", err);
      setErrorMsg(err?.message || "Failed to clone voice. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedFile(null);
    setRecordedBlob(null);
    setErrorMsg(null);
    setRecordingSeconds(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children || (
          <Button className="gap-2 shadow-sm">
            <AudioWaveform className="size-4" />
            Clone Voice
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="size-5 text-primary" />
            Zero-Shot Voice Cloning
          </DialogTitle>
          <DialogDescription className="text-xs">
            Upload or record a clear 10s audio sample to clone a custom AI voice
            instantly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Voice Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Voice Name</Label>
            <Input
              placeholder="e.g. My Custom Voice"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-xs"
              required
            />
          </div>

          {/* Category & Language */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Category</Label>
              <Select
                value={category}
                onValueChange={(val) => {
                  if (val) setCategory(val as VoiceCategory);
                }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {VOICE_CATEGORICES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-xs">
                      {VOICE_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Language</Label>
              <Select
                value={language}
                onValueChange={(val) => setLanguage(val ?? "en-US")}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-UK">English (UK)</SelectItem>
                  <SelectItem value="es-ES">Spanish</SelectItem>
                  <SelectItem value="fr-FR">French</SelectItem>
                  <SelectItem value="de-DE">German</SelectItem>
                  <SelectItem value="hi-IN">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Audio Input Tabs: File Upload vs Record */}
          <div className="space-y-1.5 pt-1">
            <Label className="text-xs font-semibold">Voice Sample Audio</Label>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid grid-cols-2 h-9">
                <TabsTrigger value="upload" className="text-xs gap-1.5">
                  <Upload className="size-3.5" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="record" className="text-xs gap-1.5">
                  <Mic className="size-3.5" />
                  Record Voice
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="pt-2">
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-center bg-muted/20 hover:bg-muted/30 transition-colors">
                  <Upload className="size-6 text-muted-foreground/60 mb-2" />
                  <Input
                    type="file"
                    accept="audio/wav,audio/mp3,audio/m4a,audio/webm"
                    className="hidden"
                    id="audio-sample-file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFile(e.target.files[0]);
                        setRecordedBlob(null);
                      }
                    }}
                  />
                  <Label
                    htmlFor="audio-sample-file"
                    className="cursor-pointer text-xs font-medium text-primary hover:underline"
                  >
                    {selectedFile
                      ? selectedFile.name
                      : "Click to choose audio file"}
                  </Label>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    WAV, MP3 or M4A (10s – 1min sample)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="record" className="pt-2">
                <div className="flex flex-col items-center justify-center border rounded-lg p-4 text-center bg-muted/20 gap-3">
                  <div className="flex items-center gap-3">
                    {!isRecording ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2 text-xs"
                        onClick={startRecording}
                      >
                        <Mic className="size-3.5 text-destructive" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="gap-2 text-xs animate-pulse"
                        onClick={stopRecording}
                      >
                        <MicOff className="size-3.5" />
                        Stop ({recordingSeconds}s)
                      </Button>
                    )}
                  </div>

                  {recordedBlob && (
                    <Badge variant="secondary" className="gap-1 text-[11px]">
                      <Check className="size-3 text-emerald-500" />
                      Recorded sample ready ({recordingSeconds}s)
                    </Badge>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">
              Description (Optional)
            </Label>
            <Textarea
              placeholder="Add details about tone, accent, or usage scenario..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-16 text-xs resize-none"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-destructive font-medium bg-destructive/10 p-2 rounded">
              {errorMsg}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isUploading}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Cloning Voice...
                </>
              ) : (
                "Save & Clone Voice"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
