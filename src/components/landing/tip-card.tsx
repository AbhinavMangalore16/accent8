"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { IconRenderer, IconName } from "./icon-renderer";

interface TipCardProps {
  title: string;
  description: string;
  iconName: IconName;
}

export function TipCard({ title, description, iconName }: TipCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("Priya (Bangalore)");

  return (
    <motion.div
      className="relative flex flex-col gap-4 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 shadow-sm">
          <IconRenderer name={iconName} className="w-6 h-6" />
        </div>
        
        <select 
          className="text-xs bg-slate-50 border border-slate-200 rounded-full px-3 py-1 outline-none text-slate-700 cursor-pointer shadow-sm hover:border-slate-300 transition-colors"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <option>Priya (Bangalore)</option>
          <option>Rahul (Delhi)</option>
          <option>Anita (Mumbai)</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-3">{description}</p>
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
        <button className="flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-slate-600">
          <Play className="w-4 h-4 fill-current" />
          Listen Preview
        </button>

        {/* Bouncing Waveform Micro-interaction */}
        <div className="flex items-center gap-[2px] h-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-slate-900 rounded-full"
              initial={{ height: "4px" }}
              animate={{ 
                height: isHovered ? ["4px", "16px", "4px"] : "4px" 
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
