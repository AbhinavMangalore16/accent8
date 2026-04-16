"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Headset, Mail } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

// const greetings = [
//   "Nice to see you",
//   "Welcome back",
//   "Good to have you back",
//   "Glad you're here",
// ];

const subtitles = [
  "Generate natural, expressive speech with Accent8.",
  "Turn text into lifelike voices in seconds.",
  "Your ideas deserve a voice.",
  "Create, refine, and bring voices to life.",
];

function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function pickStable(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function DashboardHeader() {
  const { isLoaded, user } = useUser();

  const name =
    user?.fullName || user?.firstName || "there";

  const greetingLine = useMemo(() => {
    const time = getTimeGreeting();
    return `${time}, ${name}!`;
  }, [name]);

  const subtitle = useMemo(() => {
    return pickStable(subtitles);
  }, []);

  return (
    <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 py-2">
    
    {/* LEFT */}
    <div className="flex flex-col gap-2 max-w-2xl">
        <h1 className="text-xl lg:text-2xl font-semibold tracking-tight leading-snug">
        {isLoaded ? greetingLine : "..."}
        </h1>

        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
        {isLoaded ? subtitle : ""}
        </p>
    </div>

    {/* RIGHT */}
    <div className="hidden lg:flex items-center gap-2">
        <Button variant="outline" size="sm">
        <Link
            href="mailto:abhinavm16104@gmail.com"
            className="flex items-center gap-2"
        >
            <Mail className="h-4 w-4" />
            <span>Feedback</span>
        </Link>
        </Button>

        <Button variant="outline" size="sm">
        <Link
            href="mailto:abhinavm16104@gmail.com"
            className="flex items-center gap-2"
        >
            <Headset className="h-4 w-4" />
            <span>Need Help?</span>
        </Link>
        </Button>
    </div>

    </header>
  );
}