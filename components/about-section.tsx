"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/animations/RevealText";
import { Rocket, Target, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Rocket,
    title: "Innovación Constante",
    description:
      "Desafiamos los límites de la tecnología para crear soluciones que marcan tendencia.",
  },
  {
    icon: Target,
    title: "Excelencia Técnica",
    description:
      "Código limpio, arquitecturas robustas y estándares de calidad innegociables.",
  },
  {
    icon: Users,
    title: "Colaboración Real",
    description:
      "Nos integramos con tu equipo, hacemos nuestros tus objetivos y celebramos juntos los éxitos.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const deco1Ref = useRef<HTMLDivElement>(null);
  const deco2Ref = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // 1. Image Container Entrance
      tl.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotation: -5 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "power3.out" }
      )
        // 2. Decorative Elements Pop In
        .fromTo(
          [deco1Ref.current, deco2Ref.current],
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        // 3. Text Slide In
        .fromTo(
          textContainerRef.current?.children || [],
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        )
        // 4. Values Stagger
        .fromTo(
          valuesRef.current?.children || [],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)",
          },
          "-=0.6"
        );

      // Floating Animations for Decorative Elements
      gsap.to(deco1Ref.current, {
        y: -15,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(deco2Ref.current, {
        y: 20,
        x: 10,
        rotation: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Hover Effects for Value Cards
      const cards = valuesRef.current?.children || [];
      Array.from(cards).forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            scale: 1.05,
            backgroundColor: "rgba(var(--primary), 0.05)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(el.querySelector(".icon-box"), {
            scale: 1.1,
            rotate: 15,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            scale: 1,
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(el.querySelector(".icon-box"), {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1" ref={textContainerRef}>
            <RevealText
              text="Sobre Nosotros"
              tag="span"
              className="text-primary font-semibold tracking-wider uppercase mb-4 block"
            />
            <RevealText
              text="Impulsando el futuro digital de las empresas."
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight"
            />
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                En Kova, somos más que una empresa de desarrollo de software.
                Somos arquitectos de soluciones digitales que transforman
                visiones en realidades tangibles.
              </p>
              <p>
                Nacimos con la convicción de que la tecnología debe ser un motor
                de crecimiento, no una barrera. Por eso, combinamos creatividad,
                estrategia y excelencia técnica para entregar productos que no
                solo funcionan, sino que inspiran.
              </p>
            </div>

            <div
              ref={valuesRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
            >
              {values.map((val, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 p-4 rounded-xl transition-colors cursor-default"
                >
                  <div className="icon-box w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-transform">
                    <val.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{val.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="order-1 lg:order-2 relative perspective-1000">
            <div
              ref={imageRef}
              className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card/10 backdrop-blur-sm"
            >
              {/* Abstract shape/gradient placeholder */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-blue-600/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
              </div>

              {/* Decorative Elements */}
              <div
                ref={deco1Ref}
                className="absolute top-10 right-10 w-20 h-20 rounded-2xl bg-linear-to-tr from-white/10 to-white/5 border border-white/10 backdrop-blur-md shadow-lg"
              />
              <div
                ref={deco2Ref}
                className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-linear-to-bl from-primary/10 to-transparent border border-white/5 backdrop-blur-md shadow-lg"
              />
            </div>
            {/* Back Glow */}
            <div className="absolute -inset-10 bg-primary/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
