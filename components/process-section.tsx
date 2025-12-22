"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Pencil, Code2, Rocket, ArrowRight } from "lucide-react";
import RevealText from "@/components/animations/RevealText";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Lightbulb,
    title: "Descubrimiento & Estrategia",
    description:
      "Analizamos tu negocio, objetivos y audiencia para definir una estrategia digital clara y efectiva.",
  },
  {
    icon: Pencil,
    title: "Diseño UX/UI",
    description:
      "Creamos prototipos interactivos y diseños visuales que priorizan la experiencia del usuario y la identidad de marca.",
  },
  {
    icon: Code2,
    title: "Desarrollo Ágil",
    description:
      "Construimos tu solución utilizando las últimas tecnologías, con entregas iterativas y código limpio.",
  },
  {
    icon: Rocket,
    title: "Lanzamiento & Escala",
    description:
      "Desplegamos tu producto, monitoreamos su rendimiento y te ayudamos a crecer con soporte continuo.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Animation
      mm.add("(min-width: 768px)", () => {
        // Line animation
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 0.5,
            },
          }
        );

        // Steps animation
        stepsRef.current.forEach((step, index) => {
          if (!step) return;

          const isEven = index % 2 === 0;

          gsap.from(step, {
            opacity: 0,
            x: isEven ? -50 : 50,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      // Mobile Animation
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );

        stepsRef.current.forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            x: 30,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block">
            Nuestro Método
          </span>
          <RevealText
            text="Cómo Trabajamos"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un proceso transparente y eficiente diseñado para transformar tus
            ideas en resultados tangibles.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2">
            <div ref={lineRef} className="w-full bg-primary origin-top" />
          </div>

          <div className="flex flex-col gap-12 md:gap-24 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) stepsRef.current[index] = el;
                  }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? "md:pl-16 text-left" : "md:pr-16 md:text-right"
                    }`}
                  >
                    <div className="space-y-4">
                      <div
                        className={`inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary md:hidden mb-2`}
                      >
                        <step.icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Point */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-background border-4 border-primary z-10 hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    </div>
                    {/* Mobile Dot */}
                    <div className="w-4 h-4 rounded-full bg-primary md:hidden border-2 border-background z-10" />
                  </div>

                  {/* Empty half for desktop layout balance */}
                  <div className="w-full md:w-1/2 hidden md:flex justify-center items-center">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/80 transform transition-transform hover:scale-110 hover:rotate-3 duration-300 ${
                        !isEven ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <step.icon size={32} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
