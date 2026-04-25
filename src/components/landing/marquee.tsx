"use client";

import { motion } from "framer-motion";

const TRUSTED_BY = [
  "Unacademy", "PhysicsWallah", "BYJU'S", "UpGrad", "Groww", "Zerodha", "CRED", "Swiggy"
];

export function Marquee() {
  return (
    <div className="w-full py-12 overflow-hidden bg-white/30 backdrop-blur-sm border-y border-dashed border-slate-900/5">
      <p className="text-center text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">
        Trusted by 500+ creators across Bharat
      </p>
      <div className="relative flex max-w-[100vw] overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-16 px-8 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ willChange: "transform" }}
        >
          {/* Duplicate for seamless infinite loop */}
          {[...TRUSTED_BY, ...TRUSTED_BY, ...TRUSTED_BY].map((brand, i) => (
            <div key={i} className="text-2xl font-bold text-slate-800/20 tracking-tighter">
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
