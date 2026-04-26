"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function BouncyCardsFeatures() {
  return (
    <section className="py-32 px-6 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-6xl text-slate-800">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Features that matter
            <span className="text-slate-400"> for voice products that scale</span>
          </h2>
          <motion.a
            href="/sign-up"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-xl transition-colors hover:bg-slate-700"
          >
            Start building
          </motion.a>
        </div>

        {/* Row 1 */}
        <div className="mb-4 grid grid-cols-12 gap-4">
          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-sky-300 to-cyan-400">
            <CardTitle
              title="Regional cadence"
              subtitle="Generate speech that adapts to accents, dialects, and regional speaking styles."
              stat="Multilingual"
            />
            <CardMedia
              alt="Waveform"
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-8" accentClassName="from-amber-300 to-orange-400">
            <CardTitle
              title="Emotion control"
              subtitle="Dial expressiveness from flat narration to dramatic performance with a single parameter."
              stat="Fine-grained"
            />
            <CardMedia
              alt="Studio"
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>
        </div>

        {/* Row 2 */}
        <div className="mb-4 grid grid-cols-12 gap-4">
          <BounceCard className="col-span-12 md:col-span-8" accentClassName="from-emerald-300 to-green-500">
            <CardTitle
              title="Low-latency API"
              subtitle="Streaming-ready inference built for real-time agents, assistants, and interactive apps."
              stat="75ms latency"
            />
            <CardMedia
              alt="Code"
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-rose-300 to-red-400">
            <CardTitle
              title="Voice cloning"
              subtitle="Clone voices from seconds of audio with zero-shot generation-no training required."
              stat="5s input"
            />
            <CardMedia
              alt="Mic"
              src="https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>
        </div>

        {/* Row 3 (NEW) */}
        <div className="grid grid-cols-12 gap-4">
          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-purple-300 to-indigo-400">
            <CardTitle
              title="Paralinguistic prompting"
              subtitle="Use tags like [laugh], [sigh], or [whisper] to generate natural human reactions."
              stat="Human-like"
            />
            <CardMedia
              src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400&auto=format&fit=crop"
              alt="Voice UI"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-zinc-300 to-gray-400">
            <CardTitle
              title="Built-in watermarking"
              subtitle="Every generated audio is traceable without affecting sound quality."
              stat="Secure by default"
            />
            <CardMedia
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop"
              alt="Security"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-blue-300 to-indigo-500">
            <CardTitle
              title="High-performance model"
              subtitle="Optimized architecture delivering speed and quality for production workloads."
              stat="6x realtime"
            />
            <CardMedia
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"
              alt="GPU"
            />
          </BounceCard>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Components ---------------- */

type BounceCardProps = {
  className: string;
  children: ReactNode;
  accentClassName: string;
};

function BounceCard({ className, children, accentClassName }: BounceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 0.985, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={`group relative min-h-80 cursor-pointer overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-7 pb-36 shadow-sm ${className}`}
    >
      {children}
      <div
        aria-hidden
        className={`absolute inset-x-4 bottom-0 top-36 z-0 translate-y-8 rounded-t-2xl bg-linear-to-br ${accentClassName} p-2 transition-transform duration-300 group-hover:translate-y-3 group-hover:rotate-1`}
      >
        <div className="size-full rounded-xl bg-white/35 ring-1 ring-white/70" />
      </div>
    </motion.div>
  );
}

type CardMediaProps = {
  src: string;
  alt: string;
};

function CardMedia({ src, alt }: CardMediaProps) {
  return (
    <div className="absolute inset-x-4 bottom-0 top-36 z-10 translate-y-8 rounded-t-2xl p-2 transition-transform duration-300 group-hover:translate-y-3 group-hover:rotate-1">
      <img
        src={src}
        alt={alt}
        className="size-full rounded-xl object-cover ring-1 ring-white/70"
        loading="lazy"
      />
    </div>
  );
}

type CardTitleProps = {
  title: string;
  subtitle?: string;
  stat?: string;
};

function CardTitle({ title, subtitle, stat }: CardTitleProps) {
  return (
    <div className="relative z-20 space-y-2">
      {stat && (
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {stat}
        </div>
      )}
      <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}
