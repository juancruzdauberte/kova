"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/animations/RevealText";
import ScrollFade from "@/components/animations/ScrollFade";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);
  const bgShape2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Title and Subtitle animations handled by components */

      /* Button animation on mount */
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.8, // Wait for text
        ease: "back.out(1.2)",
      });

      gsap.to(bgShapeRef.current, {
        y: 300,
        rotation: 45,
        scale: 1.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(bgShape2Ref.current, {
        y: -200,
        rotation: -30,
        scale: 0.8,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      <div
        ref={bgShapeRef}
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />
      <div
        ref={bgShape2Ref}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full opacity-30 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="mb-6">
          <RevealText
            text="Impulsando la Transformación Digital."
            tag="h1"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-balance leading-[0.95] tracking-tight"
            delay={0.2}
          />
        </div>

        <ScrollFade delay={0.4}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto text-balance leading-relaxed px-4">
            Soluciones de software personalizadas, consultoría estratégica y
            arquitectura cloud para empresas que miran al futuro.
          </p>
        </ScrollFade>

        <div ref={ctaRef} className="flex justify-center px-4 opacity-0">
          <Button
            size="lg"
            className="text-lg sm:text-xl font-bold px-10 py-7 rounded-full w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.8)] transition-all duration-300 scale-100 hover:scale-105 cursor-pointer"
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
}
