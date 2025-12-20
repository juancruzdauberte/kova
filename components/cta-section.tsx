"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      const titleChars = titleRef.current?.textContent?.split("") || [];
      if (titleRef.current) {
        titleRef.current.innerHTML = titleChars
          .map(
            (char) =>
              `<span class="inline-block">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");
      }

      gsap.from(titleRef.current?.querySelectorAll("span") || [], {
        opacity: 0,
        y: 50,
        stagger: 0.03,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 75%",
        },
      });

      gsap.from(formRef.current?.children || [], {
        x: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
        },
      });

      gsap.to(bgShapeRef.current, {
        scale: 1.3,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(containerRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 sm:py-24 md:py-32 px-4 overflow-hidden"
    >
      <div
        ref={bgShapeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] opacity-10"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />

      <div className="container mx-auto relative z-10">
        <div
          ref={containerRef}
          className="bg-linear-to-br from-card to-card/50 backdrop-blur-xl border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 max-w-4xl mx-auto shadow-2xl"
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance"
            >
              Únete a la revolución
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto px-4">
              Sé parte de la plataforma que está transformando la forma en que
              las marcas se conectan con los jugadores.
            </p>
          </div>

          <form
            ref={formRef}
            className="space-y-4 sm:space-y-6 max-w-md mx-auto"
          >
            <Input
              type="text"
              placeholder="Tu nombre"
              className="h-12 sm:h-14 text-base sm:text-lg bg-background/50 backdrop-blur-sm border-2 rounded-xl"
            />
            <Input
              type="email"
              placeholder="tu@email.com"
              className="h-12 sm:h-14 text-base sm:text-lg bg-background/50 backdrop-blur-sm border-2 rounded-xl"
            />
            <Button
              size="lg"
              className="w-full text-base sm:text-lg h-12 sm:h-14 rounded-xl"
            >
              Comenzar gratis
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
              Sin tarjeta de crédito. Comienza en minutos.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
