import { LucideIcon, Mic2, Zap, Languages, Sliders, AudioLines, Heart } from "lucide-react";

export type VoiceOption = {
  id: string;
  name: string;
  label: string;
  previewUrl: string; // The specific audio file for this voice + text combo
};

export type Tip = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
  text: string;
  tags: string[];
  voices: VoiceOption[]; // New: Supports switching voices per card
};

const encode = (text: string) => `/tts?text=${encodeURIComponent(text)}`;

export const tips: Tip[] = [
  {
    title: "Narrate a Story",
    description: "Immersive storytelling with cinematic warmth.",
    icon: Mic2,
    gradient: "from-purple-500 to-indigo-500",
    text: "Once upon a time, in a quiet village, there lived a dreamer who believed in magic.",
    tags: ["Narrator", "Warm", "Deep"],
    href: encode("Once upon a time, in a quiet village, there lived a dreamer who believed in magic."),
    voices: [
      { id: "v1", name: "Aman", label: "Aman (Storyteller)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: "v2", name: "Trisha", label: "Trisha (Soft)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
    ],
  },
  {
    title: "Regional Nuance",
    description: "Perfect Indian accents for local resonance.",
    icon: Languages,
    gradient: "from-sky-400 to-blue-500",
    text: "Namaste! Welcome to Accent8, where technology meets the heart of India.",
    tags: ["Hindi", "Natural", "Indian"],
    href: encode("Namaste! Welcome to Accent8, where technology meets the heart of India."),
    voices: [
      { id: "v3", name: "Raj", label: "Raj (Neutral Hindi)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: "v4", name: "Priya", label: "Priya (Corporate)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
    ],
  },
  {
    title: "Promotional Ads",
    description: "High-energy voices that drive conversions.",
    icon: Zap,
    gradient: "from-rose-400 to-orange-400",
    text: "Introducing Accent8 — fast, natural, and starting at just ₹1/min.",
    tags: ["Energetic", "Bold", "Fast"],
    href: encode("Introducing Accent8 — fast, natural, and starting at just ₹1/min."),
    voices: [
      { id: "v5", name: "Kabir", label: "Kabir (Radio)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: "v6", name: "Sanya", label: "Sanya (Excited)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ],
  },
  {
    title: "Meditation & Calm",
    description: "Soothing tones for mindfulness and sleep.",
    icon: AudioLines,
    gradient: "from-indigo-400 to-cyan-400",
    text: "Take a deep breath in... and slowly exhale. Let your mind drift into peace.",
    tags: ["Calm", "Soft", "Zen"],
    href: encode("Take a deep breath in... and slowly exhale. Let your mind drift into peace."),
    voices: [
      { id: "v7", name: "Ishaan", label: "Ishaan (Deep Calm)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      { id: "v8", name: "Aditi", label: "Aditi (Whisper)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
    ],
  },
  {
    title: "Expressive Emotion",
    description: "Add joy, sadness, or excitement to your text.",
    icon: Heart,
    gradient: "from-fuchsia-500 to-rose-500",
    text: "I can't believe this! This is the most incredible news I've ever heard!",
    tags: ["Excited", "Dynamic", "Human"],
    href: encode("I can't believe this! This is the most incredible news I've ever heard!"),
    voices: [
      { id: "v9", name: "Vihaan", label: "Vihaan (Shouting)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
      { id: "v10", name: "Meera", label: "Meera (Emotional)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
    ],
  },
  {
    title: "Professional Podcast",
    description: "Host-ready voices for your next big episode.",
    icon: Sliders,
    gradient: "from-blue-500 to-indigo-600",
    text: "Welcome back to the show. Today, we're diving deep into the future of AI.",
    tags: ["Host", "Confident", "Clear"],
    href: encode("Welcome back to the show. Today, we're diving deep into the future of AI."),
    voices: [
      { id: "v11", name: "Arjun", label: "Arjun (Authority)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
      { id: "v12", name: "Kavya", label: "Kavya (Friendly)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
    ],
  },
];