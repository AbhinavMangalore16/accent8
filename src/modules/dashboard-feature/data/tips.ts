import gradientManim from "../../../../public/animations/gradientManim.json";
import gradientManim2 from "../../../../public/animations/gradientManim2.json";
import gradientManim3 from "../../../../public/animations/gradientManim3.json";
import gradientManim4 from "../../../../public/animations/gradientManim4.json";
import gradientManim5 from "../../../../public/animations/gradientManim5.json";

export type TipIcon = "mic2" | "languages" | "zap" | "audioLines" | "heart" | "sliders";

export type VoiceOption = {
  id: string;
  name: string;
  label: string;
  previewUrl: string; // The specific audio file for this voice + text combo
};

export type Tip = {
  title: string;
  description: string;
  icon: TipIcon;
  gradient?: string;
  text: string;
  tags: string[];
  voices: VoiceOption[];
  href: string;
  animationData: object;
};

const encode = (text: string) => `/tts?text=${encodeURIComponent(text)}`;

export const tips: Tip[] = [
  {
    title: "Narrate a Story",
    description: "Immersive storytelling with cinematic warmth.",
    icon: "mic2",
    gradient: "from-[#E4DBF4] to-[#8645FF]",
    text: "Once upon a time, in a quiet village, there lived a dreamer who believed in magic.",
    animationData: gradientManim3,
    tags: ["Narrator", "Warm", "Deep"],
    href: "/tts-feature?=In a village lived a dreamer who believed in magic.",
    voices: [
      { id: "v1", name: "Aman", label: "Aman (Storyteller)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: "v2", name: "Trisha", label: "Trisha (Soft)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
    ],
  },
  {
    title: "Regional Nuance",
    description: "Perfect Indian accents for local resonance.",
    icon: "languages",
    gradient: "from-lavender-400 to-[#E0B0FF]-500",
    text: "Namaste! Welcome to Accent8, where technology meets the heart of India.",
    animationData: gradientManim2,
    tags: ["Hindi", "Natural", "Indian"],
    href: "/tts-feature?=Namaste! Welcome to Accent8, where technology meets the heart of India.",
    voices: [
      { id: "v3", name: "Raj", label: "Raj (Neutral Hindi)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: "v4", name: "Priya", label: "Priya (Corporate)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
    ],
  },
  {
    title: "Promotional Ads",
    description: "High-energy voices that drive conversions.",
    icon: "zap",
    gradient: "from-[#F4EADB] to-[#C4C7AD]",
    text: "Introducing Accent8 — fast, natural, and starting at just ₹1/min.",
    animationData: gradientManim,
    tags: ["Energetic", "Bold", "Fast"],
    href: "/tts-feature?=Introducing Accent8 — fast, natural, and starting at just ₹1/min.",
    voices: [
      { id: "v5", name: "Kabir", label: "Kabir (Radio)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: "v6", name: "Sanya", label: "Sanya (Excited)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ],
  },
  {
    title: "Meditation & Calm",
    description: "Soothing tones for mindfulness and sleep.",
    icon: "audioLines",
    gradient: "from-indigo-400 to-cyan-400",
    text: "Take a deep breath in... and slowly exhale. Let your mind drift into peace.",
    animationData: gradientManim,
    tags: ["Calm", "Soft", "Zen"],
    href: "/tts-feature?=Take a deep breath in... and slowly exhale. Let your mind drift into peace.",
    voices: [
      { id: "v7", name: "Ishaan", label: "Ishaan (Deep Calm)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      { id: "v8", name: "Aditi", label: "Aditi (Whisper)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
    ],
  },
  {
    title: "Expressive Emotion",
    description: "Add joy, sadness, or excitement to your text.",
    icon: "heart",
    gradient: "from-[#F4DBF0] to-rose-500",
    text: "I can't believe this! This is the most incredible news I've ever heard!",
    animationData: gradientManim4,
    tags: ["Excited", "Dynamic", "Human"],
    href: "/tts-feature?=I can't believe this! This is the most incredible news I've ever heard!",
    voices: [
      { id: "v9", name: "Vihaan", label: "Vihaan (Shouting)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
      { id: "v10", name: "Meera", label: "Meera (Emotional)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
    ],
  },
  {
    title: "Professional Podcast",
    description: "Host-ready voices for your next big episode.",
    icon: "sliders",
    gradient: "from-blue-500 to-indigo-600",
    text: "Welcome back to the show. Today, we're diving deep into the future of AI.",
    animationData: gradientManim5,
    tags: ["Host", "Confident", "Clear"],
    href: "/tts-feature?=Welcome back to the show. Today, we're diving deep into the future of AI.",
    voices: [
      { id: "v11", name: "Arjun", label: "Arjun (Authority)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
      { id: "v12", name: "Kavya", label: "Kavya (Friendly)", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
    ],
  },
];