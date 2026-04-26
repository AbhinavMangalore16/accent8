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
  previewUrl: string;
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

// TODO: Replace with your actual Cloudflare R2 Public Dev URL
const CLOUDFLARE_BASE_URL = "https://pub-5e0f53d1a24847fe8df5271fce9c70c6.r2.dev";

export const tips: Tip[] = [
  {
    title: "Narrate a Story",
    description: "Immersive storytelling with cinematic warmth.",
    icon: "mic2",
    gradient: "from-[#E4DBF4] to-[#8645FF]",
    text: "Once upon a time, in a quiet village, there lived a dreamer who believed in magic.",
    animationData: gradientManim3,
    tags: ["Audiobook", "Warm", "Narrator"],
    href: "/tts-feature?text=Once%20upon%20a%20time%2C%20in%20a%20quiet%20village%2C%20there%20lived%20a%20dreamer%20who%20believed%20in%20magic.",
    voices: [
      { id: "v1", name: "Adrian", label: "Adrian (Audiobook)", previewUrl: `/audio/basic/Adrian.wav` }
    ],
  },
  {
    title: "Promotional Ads",
    description: "Clear and articulate voices that drive conversions.",
    icon: "zap",
    gradient: "from-[#F4EADB] to-[#C4C7AD]",
    text: "Introducing Gamut AI — fast, natural, and starting at just ₹1/min.",
    animationData: gradientManim,
    tags: ["Advertising", "Bold", "Clear"],
    href: "/tts-feature?text=Introducing%20Gamut%20AI%20—%20fast,%20natural,%20and%20starting%20at%20just%20₹1/min.",
    voices: [
      { id: "v2", name: "Brianna", label: "Brianna (Corporate)", previewUrl: `/audio/basic/Brianna.wav` }
    ],
  },
  {
    title: "Expressive Characters",
    description: "Quirky and emotional voices for storytelling.",
    icon: "heart",
    gradient: "from-[#F4DBF0] to-rose-500",
    text: "I can't believe this! This is the most incredible news I've ever heard!",
    animationData: gradientManim4,
    tags: ["Character", "Dynamic", "Fun"],
    href: "/tts-feature?text=I%20can't%20believe%20this!%20This%20is%20the%20most%20incredible%20news%20I've%20ever%20heard!",
    voices: [
      { id: "v3", name: "Carrigan", label: "Carrigan (Scottish)", previewUrl: `/audio/basic/Carrigan.wav` },
      { id: "v4", name: "Emmanuel", label: "Emmanuel (Quirky)", previewUrl: `/audio/basic/Emmanuel.wav` }
    ],
  },
  {
    title: "Meditation & Calm",
    description: "Smooth and soothing tones for mindfulness.",
    icon: "audioLines",
    gradient: "from-indigo-400 to-cyan-400",
    text: "Take a deep breath in... and slowly exhale. Let your mind drift into peace.",
    animationData: gradientManim,
    tags: ["Calm", "Soft", "Zen"],
    href: "/tts-feature?text=Take%20a%20deep%20breath%20in...%20and%20slowly%20exhale.%20Let%20your%20mind%20drift%20into%20peace.",
    voices: [
      { id: "v5", name: "Jessica", label: "Jessica (Soothing)", previewUrl: `/audio/basic/Jessica.wav` }
    ],
  },
  {
    title: "Customer Service",
    description: "Professional and friendly voices for support.",
    icon: "languages",
    gradient: "from-lavender-400 to-[#E0B0FF]",
    text: "Hello, thank you for calling. How can I assist you today?",
    animationData: gradientManim2,
    tags: ["Support", "Friendly", "Clear"],
    href: "/tts-feature?text=Hello,%20thank%20you%20for%20calling.%20How%20can%20I%20assist%20you%20today?",
    voices: [
      { id: "v6", name: "Miles", label: "Miles (Professional)", previewUrl: `/audio/basic/Miles.wav` }
    ],
  },
  {
    title: "Documentary & Podcast",
    description: "Host-ready versatile voices for your next big episode.",
    icon: "sliders",
    gradient: "from-blue-500 to-indigo-600",
    text: "Welcome back to the show. Today, we're diving deep into the future of AI.",
    animationData: gradientManim5,
    tags: ["Host", "Confident", "General"],
    href: "/tts-feature?text=Welcome%20back%20to%20the%20show.%20Today,%20we're%20diving%20deep%20into%20the%20future%20of%20AI.",
    voices: [
      { id: "v7", name: "Ross", label: "Ross (Versatile)", previewUrl: `/audio/basic/Ross.wav` }
    ],
  },
];