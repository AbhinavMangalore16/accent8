"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Check, X, AudioLines } from "lucide-react";
import { Marquee } from "@/components/landing/marquee";
import { BouncyCardsFeatures } from "@/components/landing/bouncy-cards-features";
import { WavyBackground } from "@/components/landing/wavy-background";
import TestimonialV2 from "@/components/ui/testimonial-v2";
import VoiceLab from "@/modules/landing-showcase/VoiceLab";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-200">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
              <img
                src="/Accent8-wbg.png"
                alt="Accent8 logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">Accent8</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/sign-in" className="text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link href="/sign-up" className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-16 overflow-hidden">
        {/* 1. HERO SECTION */}
        <SmoothScrollTTSHero />

        {/* 2. MARQUEE */}
        <Marquee />

        {/* 3. THE STORY */}
        <section className="py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="aspect-square rounded-[32px] bg-slate-50 border border-slate-200/60 flex items-center justify-center relative overflow-hidden shadow-sm"
              >
                <div className="absolute inset-0 z-10 bg-linear-to-tr from-slate-100 to-transparent opacity-50" />
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop"
                  alt="Microphone"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Why we built Accent8
                </h2>

                {/* Punch line */}
                <p className="text-2xl text-slate-900 font-semibold leading-snug">
                  Voice AI has a neutrality problem.
                </p>

                {/* Contrast */}
                <p className="text-lg text-slate-600 leading-relaxed">
                  It's designed to sound correct everywhere — and authentic nowhere.
                </p>

                {/* Shift */}
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Accent8 changes that.
                </p>

                {/* Core explanation */}
                <p className="text-lg text-slate-600 leading-relaxed">
                  We built a model that understands how speech varies across regions — the cadence,
                  the inflections, the cultural context behind every sentence.
                </p>

                {/* Proof / example */}
                <p className="text-lg text-slate-600 leading-relaxed">
                  From Hinglish in India to Russian and other regional nuances, Accent8 adapts to how people actually speak — not how models expect them to.
                </p>

                {/* Closing statement */}
                <p className="text-xl text-slate-900 font-semibold leading-relaxed">
                  This isn't global voice AI. <br />
                  It's voice AI that feels local, everywhere.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. FEATURES BENTO */}
        <BouncyCardsFeatures />

        {/* 5. VOICE EXPERIMENTALS */}
          
          <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-slate-900">
              The Voice Lab
            </h2>
            <p className="text-xl text-slate-500 font-light">
              Test our most popular personas raw.
            </p>
          </div>

          <VoiceLab />
        </div>
      </section>

        {/* 6. PRODUCT SHOWCASE */}
        {/* <section className="py-32 px-6 bg-[#0A0A0A] text-white rounded-[32px] mx-4 md:mx-8 shadow-xl relative overflow-hidden my-16 border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800/40 via-[#0A0A0A] to-[#0A0A0A]" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 text-slate-300">
                Sneak Peek
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-white">The Accent8 Dashboard</h2>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-video max-w-4xl mx-auto bg-[#111111] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center transform-gpu"
              style={{ transformStyle: "preserve-3d", transform: "perspective(1200px) rotateX(4deg)" }}
            >
              <div className="absolute inset-0 z-10 bg-linear-to-tr from-transparent via-white/2 to-transparent" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                alt="Dashboard Mockup"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 font-medium text-white shadow-xl text-sm z-20">
                Coming Soon
              </div>
            </motion.div>
          </div>
        </section> */}

        {/* 7. PRICING */}
        <PricingShowcase />

        {/* 8. TESTIMONIALS */}
        <TestimonialV2 />
        <section className="py-32 px-6">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-slate-900">Beta Access</h2>
                <p className="text-xl text-slate-500 font-light">
                  Join our beta program to get early access to new features and voice options.
                </p>
              </div>
              <WavyBackground />
            </div>
          </section>

        {/* 9. UPDATES */}
        <section className="py-24 px-6 relative">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Changelog</h2>

            <div className="space-y-10 border-l-2 border-slate-200 pl-6 ml-4">

              {/* April 2026 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-slate-900 ring-4 ring-white" />
                <div className="text-sm text-slate-500 font-medium mb-1 tracking-wide uppercase">
                  April 2026
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Accent8 Core v1.0 — Regional Intelligence Layer
                </h3>
                <p className="text-slate-500 text-lg font-light">
                  Introduced our accent-aware prompting and cadence modeling system. 
                  Improved realism across Hinglish, Marathi, and mixed-language speech with better pacing and tone consistency.
                </p>
              </div>

              {/* March 2026 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-slate-900 ring-4 ring-white" />
                <div className="text-sm text-slate-500 font-medium mb-1 tracking-wide uppercase">
                  March 2026
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Real-time Inference Upgrade (−40ms latency)
                </h3>
                <p className="text-slate-500 text-lg font-light">
                  Optimized streaming pipeline and batching. Enabled smoother real-time playback for voice agents and interactive applications.
                </p>
              </div>

              {/* February 2026 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-slate-900 ring-4 ring-white" />
                <div className="text-sm text-slate-500 font-medium mb-1 tracking-wide uppercase">
                  February 2026
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Zero-shot Voice Cloning (5s Input)
                </h3>
                <p className="text-slate-500 text-lg font-light">
                  Added support for cloning voices from short reference clips. Improved speaker similarity and reduced artifacts in expressive speech.
                </p>
              </div>

              {/* January 2026 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white" />
                <div className="text-sm text-slate-400 font-medium mb-1 tracking-wide uppercase">
                  January 2026
                </div>
                <h3 className="text-xl font-medium mb-2 text-slate-700">
                  Multilingual Expansion (Hindi, Marathi, English)
                </h3>
                <p className="text-slate-500 text-lg font-light">
                  Introduced support for Indian languages with improved phoneme handling and early-stage code-switching capabilities.
                </p>
              </div>

              {/* December 2025 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white" />
                <div className="text-sm text-slate-400 font-medium mb-1 tracking-wide uppercase">
                  December 2025
                </div>
                <h3 className="text-xl font-medium mb-2 text-slate-700">
                  Paralinguistic Prompting Support
                </h3>
                <p className="text-slate-500 text-lg font-light">
                  Enabled expressive tags like [laugh], [breath], and [pause] to generate more human-like speech patterns.
                </p>
              </div>

              {/* November 2025 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white" />
                <div className="text-sm text-slate-400 font-medium mb-1 tracking-wide uppercase">
                  November 2025
                </div>
                <h3 className="text-xl font-medium mb-2 text-slate-700">
                  Accent8 Prototype Release
                </h3>
                <p className="text-slate-500 text-lg font-light">
                  Initial release with baseline TTS capabilities and early experiments in regional cadence modeling.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 10. CTA & FOOTER */}
        <section className="mt-16 mb-8">
          <div className="mx-4 md:mx-8 rounded-[32px] bg-[#0A0A0A] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-xl border border-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,calc(100%-100px),transparent)] from-white/3 to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">Ready to build with soul?</h2>
              <p className="text-lg md:text-xl text-slate-300 font-light">Join 500+ creators building the next generation of Indian content.</p>
              <div className="pt-4">
                <Link href="/sign-up" className="inline-block px-8 py-4 bg-white text-slate-900 rounded-full font-medium text-lg hover:bg-slate-100 transition-colors shadow-lg">
                  Start Cloning Your Voice
                </Link>
              </div>
            </div>
          </div>

          <footer className="pt-12 pb-4 px-6 text-center text-sm text-slate-500 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div>&copy; 2026 Accent8. All rights reserved.</div>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-slate-900 transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-slate-900 transition-colors">Discord</Link>
                <Link href="#" className="hover:text-slate-900 transition-colors">GitHub</Link>
              </div>
            </div>
          </footer>
        </section>

      </main>
    </div>
  );
}

const HERO_SCROLL_HEIGHT = 1450;

function SmoothScrollTTSHero() {
  return (
    <section className="relative w-full bg-[#070D1C] text-white">
      <div className="relative w-full md:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,28,0.35)_0%,rgba(7,13,28,0.9)_100%)]" />
        <img
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1400&auto=format&fit=crop"
          alt="Studio microphone"
          className="h-[68vh] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-sm"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
              <AudioLines className="size-3.5" />
              <span>Indigenously created</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white leading-tight">
              AI voices, minus the AI.
              <br />
              <span className="text-white/75">Built for how we really speak.</span>
            </h1>
            <p className="mx-auto mt-4 text-sm text-white/75">
              Build expressive narration, ad reads, and conversational agents with regional cadence.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Start Building Free <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ height: `calc(${HERO_SCROLL_HEIGHT}px + 100vh)` }} className="relative hidden w-full md:block">
        <CenterHeroImage />
        <HeroParallaxImages />

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-80 bg-linear-to-b from-[#070D1C]/0 to-[#070D1C]" />

        <div className="pointer-events-none absolute inset-x-0 top-12 z-20 px-6 text-center translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md md:text-sm">
              <AudioLines className="size-3.5" />
              <span>Indigenously created</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.05]">
              AI voices, minus the AI
              <br />
              <span className="text-white/70">Built for how we speak</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-white/75 md:text-lg">
              Build expressive narration, ad reads, and conversational agents with regional cadence,
              emotion control, and low-latency APIs.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 md:text-base"
              >
                Start Building Free <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="mx-4 my-16 overflow-hidden rounded-[32px] bg-[#050816] px-6 py-20 text-white shadow-xl md:mx-8 md:px-8 md:py-28 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_30%),linear-gradient(180deg,#070D1B_0%,#050816_100%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[48px_48px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200 backdrop-blur-md">
              Sneak Peek
            </div>
            <h2 className="mt-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
              The Accent8 Dashboard
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
              A cinematic preview of the dashboard experience, presented inside a floating MacBook frame.
            </p>
          </div>

          <div className="relative mx-auto max-w-6xl md:hidden">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-3 shadow-2xl backdrop-blur-sm">
              <img
                src="/landing/image.png"
                alt="Accent8 dashboard preview"
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>
          </div>

          <div className="dark relative mx-auto hidden max-w-6xl md:block">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_50%),radial-gradient(circle_at_top,rgba(168,85,247,0.14),transparent_38%)] blur-3xl" />
            <MacbookScroll
              title={
                <span>
                  Finally, AI that doesn't sound like AI. <br /> About time.
                </span>
              }
              badge={
                <Link href="https://peerlist.io/abhinavmanglore" target="_blank" rel="noreferrer" aria-label="Open Peerlist profile">
                  <PeerlistBadge className="h-10 w-10 -rotate-12 transform rounded-full shadow-lg" />
                </Link>
              }
              src="/landing/image.png"
              showGradient={false}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

function CenterHeroImage() {
  const { scrollY } = useScroll();

  const clipA = useTransform(scrollY, [0, HERO_SCROLL_HEIGHT], [24, 0]);
  const clipB = useTransform(scrollY, [0, HERO_SCROLL_HEIGHT], [76, 100]);
  const clipPath = useMotionTemplate`polygon(${clipA}% ${clipA}%, ${clipB}% ${clipA}%, ${clipB}% ${clipB}%, ${clipA}% ${clipB}%)`;

  const backgroundSize = useTransform(scrollY, [0, HERO_SCROLL_HEIGHT + 400], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [HERO_SCROLL_HEIGHT - 80, HERO_SCROLL_HEIGHT + 380], [1, 0]);

  return (
    <motion.div
      className="sticky top-16 h-[calc(100vh-4rem)] w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        // The Hero: A sleek, high-end studio microphone bathed in cinematic lighting
        // Represents: VOICEOVER, CORPORATE, ADVERTISING
        backgroundImage:
          "url(https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=3000&auto=format&fit=crop)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

function HeroParallaxImages() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-55">
      <ParallaxImage
        // Represents: AUDIOBOOK & NARRATIVE
        // Visual: Cozy, immersive reading experience with headphones
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1800&auto=format&fit=crop"
        alt="Audiobook storytelling"
        start={-180}
        end={220}
        className="w-full max-w-sm"
      />
      <ParallaxImage
        // Represents: CHARACTERS & ANIMATION
        // Visual: Vibrant, neon-lit gaming/anime aesthetic setup
        src="https://images.unsplash.com/photo-1594769777888-c6bf27dd87ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVkaW9ib29rfGVufDB8fDB8fHww"
        alt="Anime and character voice acting"
        start={180}
        end={-260}
        className="mx-auto mt-10 w-full max-w-2xl"
      />
      <ParallaxImage
        // Represents: MEDITATION
        // Visual: Calm, atmospheric nature and mindfulness aesthetics
        src="https://media.istockphoto.com/id/2191212982/photo/people-talking-during-a-podcast-at-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=TXgP5fDUU3vsWGt7tcWDOo-9wtFOOiIqluJCgeQbMOU="
        alt="Calm meditation audio"
        start={-120}
        end={180}
        className="ml-auto mt-10 w-full max-w-lg"
      />
      <ParallaxImage
        // Represents: PODCAST & CONVERSATIONAL
        // Visual: Dynamic dual-mic podcast recording environment
        src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Conversational podcast recording"
        start={20}
        end={-420}
        className="ml-8 mt-12 w-full max-w-lg"
      />
    </div>
  );
}

type ParallaxImageProps = {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
};

function ParallaxImage({ className, alt, src, start, end }: ParallaxImageProps) {
  const ref = useRef<HTMLImageElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.86]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={`${className} rounded-2xl border border-white/15 shadow-2xl`}
      style={{ transform, opacity }}
      loading="lazy"
    />
  );
}

function TTSRolloutTimeline() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-28 text-white" id="tts-rollout">
      <motion.h2
        initial={{ y: 42, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        className="mb-16 text-3xl font-black uppercase tracking-wide text-white md:text-5xl"
      >
         
      </motion.h2>

      <TimelineItem title="Expressive Hindi V3" date="May 2026" location="Bengaluru" />
      <TimelineItem title="Marathi Prosody Pack" date="June 2026" location="Pune" />
      <TimelineItem title="Code-Switch Engine" date="July 2026" location="Delhi" />
      <TimelineItem title="Voice Cloning Studio" date="August 2026" location="Hyderabad" />
      <TimelineItem title="Realtime Streaming API" date="September 2026" location="Mumbai" />
    </section>
  );
}

type TimelineItemProps = {
  title: string;
  date: string;
  location: string;
};

function TimelineItem({ title, date, location }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ y: 42, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.7 }}
      className="mb-8 flex items-center justify-between border-b border-white/15 px-2 pb-8"
    >
      <div>
        <p className="mb-1.5 text-lg text-white md:text-2xl">{title}</p>
        <p className="text-xs uppercase tracking-wider text-white/55 md:text-sm">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/55 md:text-sm">
        <p>{location}</p>
        <MapPin className="size-4" />
      </div>
    </motion.div>
  );
}

const PeerlistBadge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      />
    </svg>
  );
};

type PricingPlan = {
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  price: string;
  cadence: string;
  cta: string;
  featured?: boolean;
  summary: string;
  features: string[];
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    tagline: "For early-stage builders",
    image: "https://s22.postimg.cc/8mv5gn7w1/paper-plane.png",
    imageAlt: "Paper plane",
    price: "Free",
    cadence: "/month",
    cta: "Start Free",
    summary: "Perfect for testing voices, trying emotion tags, and shipping your first TTS experiences.",
    features: ["10k chars/month", "5 standard voices", "Basic style controls", "Community support"],
  },
  {
    name: "Creator",
    tagline: "Most chosen by creators",
    image: "https://s28.postimg.cc/ju5bnc3x9/plane.png",
    imageAlt: "Jet above clouds",
    price: "₹999",
    cadence: "/month",
    cta: "Start 14-Day Trial",
    featured: true,
    summary: "Scale production with premium voices, faster synthesis, and richer controls for storytelling.",
    features: ["200k chars/month", "Premium voices", "2 voice clones", "Priority API queue"],
  },
  {
    name: "Scale",
    tagline: "For product teams shipping weekly",
    image: "https://s21.postimg.cc/tpm0cge4n/space-ship.png",
    imageAlt: "Space view",
    price: "Custom",
    cadence: "/month",
    cta: "Book Strategy Call",
    summary: "Enterprise-ready deployment with advanced observability, security controls, and dedicated onboarding.",
    features: ["Unlimited volume", "Advanced analytics", "SLA and governance", "Dedicated support lead"],
  },
];

const pricingMatrixRows = [
  { label: "Voice cloning", values: [false, true, true] },
  { label: "Emotion controls", values: [true, true, true] },
  { label: "Code-switch support", values: [false, true, true] },
  { label: "Realtime streaming API", values: [false, false, true] },
  { label: "Dedicated success manager", values: [false, false, true] },
  { label: "Launch analytics setup", values: [true, true, true] },
];

function PricingShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f7f7f7] px-4 py-20 md:px-8 md:py-28 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.1),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-350">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">Pricing</p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Built for teams that need expressive voice, not generic audio.
            </h2>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-medium text-slate-700">Every plan includes onboarding, quality review, and production QA.</p>
            <p className="mt-2 text-sm text-slate-500">Cancel anytime. No lock-in contracts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <motion.article
              key={plan.name}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className={`group relative overflow-hidden rounded-3xl border p-8 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.14)] md:p-10 ${
                plan.featured ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute -left-[35%] top-0 h-full w-[30%] -skew-x-12 bg-linear-to-r from-transparent via-slate-200/55 to-transparent transition-transform duration-700 group-hover:translate-x-[520%]" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8">
                  <div className="mb-6 flex justify-center">
                    <img
                      src={plan.image}
                      alt={plan.imageAlt}
                      className="h-20 w-20 rounded-full object-cover ring-2 ring-black/10 transition duration-300 group-hover:scale-105 md:h-24 md:w-24 lg:h-28 lg:w-28"
                    />
                  </div>

                  <p
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                      plan.featured ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold md:text-4xl">{plan.name}</h3>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-5xl font-bold md:text-6xl">{plan.price}</span>
                    <span className={`mb-2 text-sm ${plan.featured ? "text-white/70" : "text-slate-500"}`}>
                      {plan.cadence}
                    </span>
                  </div>

                  <p className={`mt-5 ${plan.featured ? "text-white/80" : "text-slate-600"}`}>{plan.summary}</p>
                </div>

                <ul className={`mb-8 space-y-3 border-t pt-6 ${plan.featured ? "border-white/15" : "border-slate-200"}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm md:text-base">
                      <Check size={18} className={plan.featured ? "text-white" : "text-slate-700"} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-auto flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold uppercase transition duration-300 hover:-translate-y-0.5 md:text-base ${
                    plan.featured
                      ? "bg-white text-slate-900 shadow-[0_8px_24px_rgba(255,255,255,0.2)] hover:bg-slate-100"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
          <div className="border-b border-white/10 px-6 py-5 md:px-8">
            <h4 className="text-2xl font-bold text-white md:text-3xl">Plan Comparison</h4>
            <p className="text-white/65">Everything you need to choose the right growth cadence.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-190 text-left">
              <thead>
                <tr className="text-sm uppercase text-white/70">
                  <th className="px-6 py-4 md:px-8">Features</th>
                  <th className="px-6 py-4">Starter</th>
                  <th className="px-6 py-4 text-white">Creator</th>
                  <th className="px-6 py-4">Scale</th>
                </tr>
              </thead>

              <tbody>
                {pricingMatrixRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? "bg-white/3" : ""}>
                    <td className="px-6 py-4 text-white md:px-8">{row.label}</td>

                    {row.values.map((value, idx) => (
                      <td key={idx} className="px-6 py-4">
                        {value ? (
                          <Check size={18} className="text-white" />
                        ) : (
                          <X size={18} className="text-white/30" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
