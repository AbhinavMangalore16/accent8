"use client";
import React, { useState, useEffect, useRef } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20% 50% at 50% 0%, rgba(59,130,246,0.35), transparent 70%)",
    LEFT: "radial-gradient(18% 45% at 0% 50%, rgba(99,102,241,0.30), transparent 70%)",
    BOTTOM: "radial-gradient(20% 50% at 50% 100%, rgba(236,72,153,0.25), transparent 70%)",
    RIGHT: "radial-gradient(18% 45% at 100% 50%, rgba(59,130,246,0.30), transparent 70%)",
  };

  const highlight = "radial-gradient(75% 181% at 50% 50%, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0.0) 70%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return (
    <Tag
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
      "relative flex rounded-full content-center items-center justify-center",
      "p-px overflow-hidden w-fit",
      "border border-black/10 dark:border-white/10",
      "bg-white/60 dark:bg-white/10 backdrop-blur-xl",
      "transition-all duration-300",
      containerClassName
    )}
      {...props}
    >
      <div
        className={cn(
        "relative z-10 px-4 py-2 rounded-[inherit]",
        "bg-white/80 dark:bg-black/40",
        "text-black dark:text-white",
        "backdrop-blur-md",
        "transition-colors duration-300",
        className
      )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div
      className={cn(
        "absolute inset-[2px] rounded-[100px] z-0",
        "bg-white/80 dark:bg-black/40"
      )}
    />
    </Tag>
  );
}
