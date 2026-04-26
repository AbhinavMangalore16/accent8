export type TipIcon = "mic2" | "languages" | "zap" | "audioLines" | "heart" | "sliders";

export type VoiceOption = {
  id: string;
  name: string;
  label: string;
  previewUrl: string;
};

export type VoiceTier = "premium" | "basic" | "showcase";

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
  tier: VoiceTier;
  isProfane?: boolean;
};

const encode = (text: string) => `/tts?text=${encodeURIComponent(text)}`;

// TODO: Replace with your actual Cloudflare R2 Public Dev URL
const CLOUDFLARE_BASE_URL = "https://pub-5e0f53d1a24847fe8df5271fce9c70c6.r2.dev";

// Note: Replace `{}` in animationData with your actual gradient imports (e.g., gradientManim)
export const tips: Tip[] = [
  // --- PREMIUM VOICES ---
  {
    title: "Anaya",
    description: "Rich, dynamic, and crystal clear.",
    icon: "mic2",
    gradient: "from-[#FFD700] to-[#FFA500]",
    text: "Experience the next level of vocal fidelity.",
    animationData: {}, 
    tags: ["Premium", "Warm"],
    tier: "premium",
    href: encode("Experience the next level of vocal fidelity."),
    voices: [{ id: "p_anaya", name: "Anaya", label: "Anaya (Premium)", previewUrl: `/audio/premium/_Anaya.wav` }],
  },
  {
    title: "Archer",
    description: "Deep, authoritative, and engaging.",
    icon: "sliders",
    gradient: "from-[#FFD700] to-[#FFA500]",
    text: "Command attention with every word.",
    animationData: {},
    tags: ["Premium", "Deep"],
    tier: "premium",
    href: encode("Command attention with every word."),
    voices: [{ id: "p_archer", name: "Archer", label: "Archer (Premium)", previewUrl: `/audio/premium/_Archer.wav` }],
  },
  {
    title: "Ivan",
    description: "Smooth and persuasive corporate tone.",
    icon: "zap",
    gradient: "from-[#FFD700] to-[#FFA500]",
    text: "Perfect for high-end professional narration.",
    animationData: {},
    tags: ["Premium", "Corporate"],
    tier: "premium",
    href: encode("Perfect for high-end professional narration."),
    voices: [{ id: "p_ivan", name: "Ivan", label: "Ivan (Premium)", previewUrl: `/audio/premium/Ivan.wav` }],
  },
  {
    title: "Kylie",
    description: "Bright, energetic, and youthful.",
    icon: "heart",
    gradient: "from-[#FFD700] to-[#FFA500]",
    text: "Bring your brand to life with vibrant energy.",
    animationData: {},
    tags: ["Premium", "Energetic"],
    tier: "premium",
    href: encode("Bring your brand to life with vibrant energy."),
    voices: [{ id: "p_kylie", name: "Kylie", label: "Kylie (Premium)", previewUrl: `/audio/premium/Kylie.wav` }],
  },
  {
    title: "Lucy",
    description: "Calm, empathetic, and reassuring.",
    icon: "audioLines",
    gradient: "from-[#FFD700] to-[#FFA500]",
    text: "Let your audience feel truly heard.",
    animationData: {},
    tags: ["Premium", "Empathetic"],
    tier: "premium",
    href: encode("Let your audience feel truly heard."),
    voices: [{ id: "p_lucy", name: "Lucy", label: "Lucy (Premium)", previewUrl: `/audio/premium/Lucy.wav` }],
  },

  // --- BASIC VOICES ---
  {
    title: "Adrian",
    description: "Immersive storytelling with cinematic warmth.",
    icon: "mic2",
    gradient: "from-[#E4DBF4] to-[#8645FF]",
    text: "Once upon a time, in a quiet village, there lived a dreamer.",
    animationData: {},
    tags: ["Basic", "Audiobook"],
    tier: "basic",
    href: encode("Once upon a time, in a quiet village, there lived a dreamer."),
    voices: [{ id: "b_adrian", name: "Adrian", label: "Adrian (Basic)", previewUrl: `/audio/basic/Adrian.wav` }],
  },
  {
    title: "Brianna",
    description: "Clear and articulate voices that drive conversions.",
    icon: "zap",
    gradient: "from-[#F4EADB] to-[#C4C7AD]",
    text: "Introducing Gamut AI — fast, natural, and starting at just ₹1/min.",
    animationData: {},
    tags: ["Basic", "Advertising"],
    tier: "basic",
    href: encode("Introducing Gamut AI — fast, natural, and starting at just ₹1/min."),
    voices: [{ id: "b_brianna", name: "Brianna", label: "Brianna (Basic)", previewUrl: `/audio/basic/Brianna.wav` }],
  },
  {
    title: "Carrigan",
    description: "Quirky and expressive Scottish tone.",
    icon: "heart",
    gradient: "from-[#F4DBF0] to-rose-500",
    text: "I can't believe this! This is incredible news!",
    animationData: {},
    tags: ["Basic", "Character"],
    tier: "basic",
    href: encode("I can't believe this! This is incredible news!"),
    voices: [{ id: "b_carrigan", name: "Carrigan", label: "Carrigan (Basic)", previewUrl: `/audio/basic/Carrigan.wav` }],
  },
  {
    title: "Emmanuel",
    description: "Dynamic and expressive storytelling.",
    icon: "mic2",
    gradient: "from-[#F4DBF0] to-rose-500",
    text: "Let me tell you a secret about the universe.",
    animationData: {},
    tags: ["Basic", "Dynamic"],
    tier: "basic",
    href: encode("Let me tell you a secret about the universe."),
    voices: [{ id: "b_emmanuel", name: "Emmanuel", label: "Emmanuel (Basic)", previewUrl: `/audio/basic/Emmanuel.wav` }],
  },
  {
    title: "Jessica",
    description: "Smooth and soothing tones for mindfulness.",
    icon: "audioLines",
    gradient: "from-indigo-400 to-cyan-400",
    text: "Take a deep breath in... and slowly exhale.",
    animationData: {},
    tags: ["Basic", "Calm"],
    tier: "basic",
    href: encode("Take a deep breath in... and slowly exhale."),
    voices: [{ id: "b_jessica", name: "Jessica", label: "Jessica (Basic)", previewUrl: `/audio/basic/Jessica.wav` }],
  },
  {
    title: "Miles",
    description: "Professional and friendly voices for support.",
    icon: "languages",
    gradient: "from-lavender-400 to-[#E0B0FF]",
    text: "Hello, thank you for calling. How can I assist you today?",
    animationData: {},
    tags: ["Basic", "Support"],
    tier: "basic",
    href: encode("Hello, thank you for calling. How can I assist you today?"),
    voices: [{ id: "b_miles", name: "Miles", label: "Miles (Basic)", previewUrl: `/audio/basic/Miles.wav` }],
  },
  {
    title: "Ross",
    description: "Host-ready versatile voices for podcasts.",
    icon: "sliders",
    gradient: "from-blue-500 to-indigo-600",
    text: "Welcome back to the show. Today, we're diving deep into AI.",
    animationData: {},
    tags: ["Basic", "Host"],
    tier: "basic",
    href: encode("Welcome back to the show. Today, we're diving deep into AI."),
    voices: [{ id: "b_ross", name: "Ross", label: "Ross (Basic)", previewUrl: `/audio/basic/Ross.wav` }],
  },

  // --- SHOWCASE VOICES ---
  {
    title: "Madison",
    description: "Raw, unfiltered, and highly expressive.",
    icon: "zap",
    gradient: "from-red-500 to-orange-600",
    text: "Warning: This sample contains raw and unfiltered language.",
    animationData: {},
    tags: ["Showcase", "Unfiltered"],
    tier: "showcase",
    isProfane: true, // Triggers the alert
    href: encode("Warning: This sample contains raw and unfiltered language."),
    voices: [{ id: "s_madison", name: "Madison", label: "Madison (Showcase)", previewUrl: `/audio/showcase/__Madison.wav` }],
  },
  {
    title: "Ross (Showcase)",
    description: "An extended, high-fidelity showcase of Ross.",
    icon: "sliders",
    gradient: "from-blue-400 to-indigo-500",
    text: "A deeper look into advanced vocal generation.",
    animationData: {},
    tags: ["Showcase", "Podcast"],
    tier: "showcase",
    href: encode("A deeper look into advanced vocal generation."),
    voices: [{ id: "s_ross", name: "__Ross", label: "Ross (Showcase)", previewUrl: `/audio/showcase/__Ross.wav` }],
  },
  {
    title: "Daniel",
    description: "Crisp and educational narration tone.",
    icon: "languages",
    gradient: "from-emerald-400 to-teal-500",
    text: "Let's explore the science behind this phenomenon.",
    animationData: {},
    tags: ["Showcase", "Educational"],
    tier: "showcase",
    href: encode("Let's explore the science behind this phenomenon."),
    voices: [{ id: "s_daniel", name: "Daniel", label: "Daniel (Showcase)", previewUrl: `/audio/showcase/Daniel.wav` }],
  },
  {
    title: "Edward",
    description: "Classic, refined, and distinguished.",
    icon: "mic2",
    gradient: "from-slate-500 to-gray-700",
    text: "A voice that carries the weight of history.",
    animationData: {},
    tags: ["Showcase", "Refined"],
    tier: "showcase",
    href: encode("A voice that carries the weight of history."),
    voices: [{ id: "s_edward", name: "Edward", label: "Edward (Showcase)", previewUrl: `/audio/showcase/Edward.wav` }],
  },
  {
    title: "Ingrid",
    description: "Warm, maternal, and incredibly inviting.",
    icon: "heart",
    gradient: "from-pink-400 to-rose-400",
    text: "Come in, sit down, and make yourself at home.",
    animationData: {},
    tags: ["Showcase", "Inviting"],
    tier: "showcase",
    href: encode("Come in, sit down, and make yourself at home."),
    voices: [{ id: "s_ingrid", name: "Ingrid", label: "Ingrid (Showcase)", previewUrl: `/audio/showcase/Ingrid.wav` }],
  },
  {
    title: "John",
    description: "Trustworthy and conversational everyday voice.",
    icon: "audioLines",
    gradient: "from-cyan-500 to-blue-500",
    text: "Hey there! It's great to finally meet you.",
    animationData: {},
    tags: ["Showcase", "Conversational"],
    tier: "showcase",
    href: encode("Hey there! It's great to finally meet you."),
    voices: [{ id: "s_john", name: "John", label: "John (Showcase)", previewUrl: `/audio/showcase/John.wav` }],
  },
  {
    title: "Noah",
    description: "Modern, upbeat, and tech-forward.",
    icon: "zap",
    gradient: "from-violet-500 to-fuchsia-500",
    text: "Welcome to the future of digital interaction.",
    animationData: {},
    tags: ["Showcase", "Tech"],
    tier: "showcase",
    href: encode("Welcome to the future of digital interaction."),
    voices: [{ id: "s_noah", name: "Noah", label: "Noah (Showcase)", previewUrl: `/audio/showcase/Noah.wav` }],
  },
];