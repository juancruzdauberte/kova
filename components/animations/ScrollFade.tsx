"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export default function ScrollFade({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 50,
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let x = 0;
      let y = 0;

      switch (direction) {
        case "up":
          y = distance;
          break;
        case "down":
          y = -distance;
          break;
        case "left":
          x = distance;
          break;
        case "right":
          x = -distance;
          break;
      }

      gsap.fromTo(
        ref.current,
        {
          x,
          y,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
