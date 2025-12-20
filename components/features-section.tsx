"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Code, Cloud, Brain, Shield, Briefcase, Monitor } from "lucide-react";
import RevealText from "@/components/animations/RevealText";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Code,
    title: "Desarrollo a Medida",
    description:
      "Software escalable y robusto diseñado específicamente para las necesidades de tu negocio.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Arquitecturas en la nube optimizadas para rendimiento, seguridad y ahorro de costos.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description:
      "Implementación de modelos de IA para automatizar procesos y generar insights valiosos.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    description:
      "Protección integral de tus activos digitales con los más altos estándares de seguridad.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Briefcase,
    title: "Consultoría IT",
    description:
      "Asesoramiento estratégico para alinear la tecnología con tus objetivos comerciales.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Monitor,
    title: "Experiencia de Usuario",
    description:
      "Interfaces intuitivas y atractivas que garantizan la mejor experiencia para tus usuarios.",
    color: "from-yellow-500 to-amber-500",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading animation handled by RevealText */ const mm =
        gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = scrollContainerRef.current?.children || [];

        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            pin: true,
            scrub: 1,
            start: "top 80px", // Offset for fixed navbar
            snap: 1 / (cards.length - 1),
            end: () => `+=${scrollContainerRef.current?.scrollWidth}`,
          },
        });

        Array.from(cards).forEach((card) => {
          const element = card as HTMLElement;
          element.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          element.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        const cards = gridRef.current?.children || [];
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 mb-12 sm:mb-16 md:mb-20">
        <RevealText
          text="Nuestras Soluciones"
          tag="h2"
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center text-balance leading-tight"
        />
      </div>

      {/* Desktop Horizontal Scroll */}
      <div className="hidden md:block overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 lg:gap-8 px-4 w-max"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shrink-0 w-[320px] lg:w-[400px] h-[400px] lg:h-[500px] p-6 lg:p-8 bg-card border-border hover:border-primary transition-colors duration-300 relative overflow-hidden group"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br from-emerald-500 to-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 lg:w-16 lg:h-16 mb-4 lg:mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed grow">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="md:hidden container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary transition-colors duration-300 relative overflow-hidden group"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br from-emerald-500 to-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
