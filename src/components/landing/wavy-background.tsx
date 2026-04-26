"use client";

import { useState } from "react";

export function WavyBackground() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="relative w-full 
                bg-[#FAFAFA] 
                rounded-[32px] 
                border border-slate-200/80 
                flex flex-col items-center justify-center 
                p-8">
      
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="url(#grad1)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Form */}
      <form
        action="https://formspree.io/f/xojybloo"
        method="POST"
        onSubmit={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);
          }, 1200);
        }}
        className="relative z-10 w-full max-w-2xl mx-auto 
                  bg-white 
                  p-4 sm:p-6 md:p-8 
                  rounded-xl sm:rounded-2xl 
                  shadow-sm border border-slate-200/60 
                  space-y-4 sm:space-y-5"
      >
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900">
          Join Beta Access
        </h3>

        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="w-full px-3 sm:px-4 py-3 
                    text-sm sm:text-base 
                    rounded-lg border border-slate-200 
                    outline-none 
                    focus:ring-2 focus:ring-slate-900"
        />

        <textarea
          name="message"
          required
          placeholder="What would you use this for? (optional but helps)"
          className="w-full px-3 sm:px-4 py-3 
                    text-sm sm:text-base 
                    rounded-lg border border-slate-200 
                    outline-none resize-none 
                    h-24 sm:h-28"
        />

        {/* Interest tags */}
        <div className="flex flex-wrap gap-2">
          {["TTS", "Voice Cloning", "Agents", "Content", "Startup", "Research"].map(tag => (
            <label
              key={tag}
              className="px-3 py-2 sm:py-1.5 
                        text-xs sm:text-sm 
                        rounded-full border border-slate-200 
                        cursor-pointer 
                        hover:bg-slate-100 
                        active:scale-95 transition"
            >
              <input type="checkbox" name="interest" value={tag} className="hidden" />
              {tag}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 sm:py-3.5 
                    text-sm sm:text-base 
                    bg-slate-900 text-white 
                    rounded-xl font-medium 
                    hover:bg-slate-800 
                    active:scale-[0.98] 
                    transition-all"
        >
          {loading ? "Submitting..." : success ? "You're in 🚀" : "Request Beta Access"}
        </button>
      </form>
    </div>
  );
}
