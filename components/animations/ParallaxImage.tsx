"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.1, // 0 to 1
}: ParallaxImageProps) {
  const container = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!img.current || !container.current) return;

      gsap.fromTo(
        img.current,
        {
          yPercent: -10 * speed * 10,
        },
        {
          yPercent: 10 * speed * 10,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className={cn("overflow-hidden relative", containerClassName)}
    >
      <img
        ref={img}
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover scale-110", className)}
      />
    </div>
  );
}
