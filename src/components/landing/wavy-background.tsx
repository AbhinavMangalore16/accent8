"use client";

import { motion } from "framer-motion";

export function WavyBackground() {
  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] bg-[#FAFAFA] rounded-[32px] overflow-hidden border border-slate-200/80 flex flex-col items-center justify-center p-8">
      {/* Wavy abstract placeholder */}
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

      <div className="relative z-10 w-full max-w-2xl bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60">
        <textarea 
          placeholder="Type something in Hindi or English..." 
          className="w-full bg-transparent outline-none resize-none text-slate-800 placeholder-slate-400 font-medium h-24"
        />
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
          <div className="flex gap-2">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div 
                key={i} 
                className={`w-8 h-8 rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-800 cursor-pointer hover:scale-105 hover:bg-slate-50 hover:shadow-md transition-all ${
                  i === 1 ? 'bg-slate-100 ring-2 ring-slate-900 ring-offset-2 border-slate-300' : 'bg-white'
                }`}
              >
                V{i}
              </div>
            ))}
          </div>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-full font-medium text-sm hover:bg-slate-800 transition-colors">
            Generate Audio
          </button>
        </div>
      </div>
    </div>
  );
}
