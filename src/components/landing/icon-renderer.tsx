"use client";

import {
  Mic2,
  Zap,
  Globe,
  AudioWaveform,
  Activity,
  Users,
  Settings,
  Play,
  HeartPulse,
  Code
} from "lucide-react";

export const ICON_MAP = {
  Mic2,
  Zap,
  Globe,
  AudioWaveform,
  Activity,
  Users,
  Settings,
  Play,
  HeartPulse,
  Code
} as const;

export type IconName = keyof typeof ICON_MAP;

export function IconRenderer({ name, className }: { name: IconName; className?: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
