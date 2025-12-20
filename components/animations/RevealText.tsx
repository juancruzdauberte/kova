"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function RevealText({
  text,
  className,
  delay = 0,
  tag: Tag = "div",
}: RevealTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const chars = container.current?.querySelectorAll(".char");
      if (!chars) return;

      gsap.fromTo(
        chars,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <Tag
      ref={container}
      className={cn("inline-block leading-tight", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="inline-block whitespace-nowrap mr-[0.2em]"
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className="char inline-block"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
