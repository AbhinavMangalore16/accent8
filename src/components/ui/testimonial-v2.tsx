"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Accent8 is the first TTS that actually sounds like our audience. The delivery feels natural — not forced like other models.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sofia Martinez",
    role: "Content Creator",
  },
  {
    text: "We replaced our entire voice stack with Accent8. Latency is insanely low, and the emotional control is something we couldn’t get elsewhere.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Daniel Kim",
    role: "AI Engineer",
  },
  {
    text: "The voice cloning is scary good. 5 seconds of audio and it captured tone, pacing, and personality almost perfectly.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Emily Carter",
    role: "Podcast Producer",
  },
  {
    text: "We tested it against other TTS tools — Accent8 just sounded more human. Especially for localized content.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Luca Rossi",
    role: "Startup Founder",
  },
  {
    text: "Paralinguistic tags are a game changer. Adding [laugh] or [pause] makes scripts feel alive without manual editing.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Amina Hassan",
    role: "Voice UX Designer",
  },
  {
    text: "Finally, a model that understands multilingual flow. Switching languages doesn’t break pronunciation anymore.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar El-Sayed",
    role: "Product Manager",
  },
  {
    text: "Integration took minutes. The API is clean, fast, and actually developer-friendly — which is rare in AI tools.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "James Walker",
    role: "Full Stack Developer",
  },
  {
    text: "We use Accent8 for ads and reels — engagement went up because the voice finally matches our audience.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Isabella Ferreira",
    role: "Growth Marketer",
  },
  {
    text: "It’s rare to see open-source-level flexibility with production-level quality. Accent8 hits that balance.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Noah Thompson",
    role: "ML Engineer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration ?? 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6 transition-colors duration-300"
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileFocus={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="group w-full max-w-xs cursor-default select-none rounded-3xl border border-neutral-200 bg-white p-10 shadow-lg shadow-black/5 transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:outline-none"
              >
                <blockquote className="m-0 p-0">
                  <p className="m-0 leading-relaxed font-normal text-neutral-600 transition-colors duration-300">
                    {text}
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 transition-all duration-300 ease-in-out group-hover:ring-primary/30"
                    />
                    <div className="flex flex-col">
                      <cite className="not-italic leading-5 font-semibold tracking-tight text-neutral-900 transition-colors duration-300">
                        {name}
                      </cite>
                      <span className="mt-0.5 text-sm leading-5 tracking-tight text-neutral-500 transition-colors duration-300">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-transparent py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="container z-10 mx-auto px-4"
      >
        <div className="mx-auto mb-16 flex max-w-135 flex-col items-center justify-center">
          <div className="flex justify-center">
            <div className="rounded-full border border-neutral-300 bg-neutral-100/50 px-4 py-1 text-xs font-semibold tracking-wide text-neutral-600 uppercase transition-colors">
              Testimonials
            </div>
          </div>

          <h2
            id="testimonials-heading"
            className="mt-6 text-center text-4xl font-extrabold tracking-tight text-neutral-900 transition-colors md:text-5xl"
          >
            What our users say
          </h2>
          <p className="mt-5 max-w-sm text-center text-lg leading-relaxed text-neutral-500 transition-colors">
            Discover how thousands of teams streamline their operations with our platform.
          </p>
        </div>

        <div
          className="mt-10 flex max-h-185 justify-center gap-6 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
}

export default function TestimonialV2() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col justify-center bg-white transition-colors duration-300 selection:bg-primary selection:text-white">
      <TestimonialsSection />
    </div>
  );
}
