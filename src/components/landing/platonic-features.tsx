"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export const PlatonicFeatures = () => {
  return (
    <section id="features" className="py-24 px-6 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 text-slate-800">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
            Features that
            <span className="text-emerald-500"> shape the future</span>
          </h2>
          <p className="text-xl text-slate-500 font-light max-w-md">Built for scale, trained for soul. Experience perfect synthesis.</p>
        </div>
        
        <div className="mb-4 grid grid-cols-12 gap-4">
          <BounceCard className="col-span-12 md:col-span-4">
            <CardTitle>Regional Cadence</CardTitle>
            <p className="text-center text-sm text-slate-500 mt-2 px-4">Perfect pronunciation of local entity names, brands, and slang.</p>
            <div className="absolute bottom-0 left-4 right-4 top-32 lg:top-40 translate-y-8 rounded-t-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1516280440504-6298579d473f?q=80&w=600&auto=format&fit=crop" 
                alt="Regional" 
                className="w-full h-full object-cover rounded-t-xl opacity-90 mix-blend-overlay"
              />
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-emerald-50 text-lg">
                Bangalore Hindi
              </span>
            </div>
          </BounceCard>
          
          <BounceCard className="col-span-12 md:col-span-8">
            <CardTitle>Emotion Control</CardTitle>
            <p className="text-center text-sm text-slate-500 mt-2 px-10">Dial up the energy for ads, or tone it down for audiobooks.</p>
            <div className="absolute bottom-0 left-4 right-4 top-32 lg:top-40 translate-y-8 rounded-t-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] overflow-hidden shadow-xl">
               <img 
                src="https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?q=80&w=800&auto=format&fit=crop" 
                alt="Emotion" 
                className="w-full h-full object-cover rounded-t-xl opacity-90 mix-blend-overlay"
              />
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-indigo-50 text-xl tracking-wider">
                DYNAMIC PROSODY
              </span>
            </div>
          </BounceCard>
        </div>
        
        <div className="mb-4 grid grid-cols-12 gap-4">
          <BounceCard className="col-span-12 md:col-span-8">
            <CardTitle>Code-Switching</CardTitle>
            <p className="text-center text-sm text-slate-500 mt-2 px-10">Seamless transitions between English and regional languages.</p>
            <div className="absolute bottom-0 left-4 right-4 top-32 lg:top-40 translate-y-8 rounded-t-2xl bg-gradient-to-br from-purple-400 to-purple-600 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] overflow-hidden shadow-xl">
               <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" 
                alt="Code Switching" 
                className="w-full h-full object-cover rounded-t-xl opacity-90 mix-blend-overlay"
              />
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-purple-50 text-xl tracking-wider">
                MULTILINGUAL FUSION
              </span>
            </div>
          </BounceCard>
          
          <BounceCard className="col-span-12 md:col-span-4">
            <CardTitle>Voice Cloning</CardTitle>
            <p className="text-center text-sm text-slate-500 mt-2 px-4">Clone any voice with 10s of high-quality audio.</p>
            <div className="absolute bottom-0 left-4 right-4 top-32 lg:top-40 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-400 to-rose-600 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=600&auto=format&fit=crop" 
                alt="Voice Cloning" 
                className="w-full h-full object-cover rounded-t-xl opacity-90 mix-blend-overlay"
              />
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-rose-50 text-lg">
                ZERO-SHOT
              </span>
            </div>
          </BounceCard>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <BounceCard className="col-span-12 md:col-span-12 min-h-[250px] lg:min-h-[350px]">
            <CardTitle>Low Latency API</CardTitle>
            <p className="text-center text-sm text-slate-500 mt-2">Sub 200ms latency designed for real-time conversational agents.</p>
            <div className="absolute bottom-0 left-4 right-4 top-32 lg:top-40 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:-rotate-[1deg] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" 
                alt="API" 
                className="w-full h-full object-cover rounded-t-xl opacity-80 mix-blend-overlay"
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-orange-50 text-2xl tracking-widest">
                STREAMING WEBSOCKETS
              </span>
            </div>
          </BounceCard>
        </div>

      </div>
    </section>
  );
};

const BounceCard = ({ className, children }: { className: string, children: ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] lg:min-h-[400px] cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200/50 p-6 lg:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">{children}</h3>
  );
};
