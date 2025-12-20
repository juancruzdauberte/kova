"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import RevealText from "@/components/animations/RevealText";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "¿Qué tipos de servicios de desarrollo ofrecen?",
    answer:
      "Ofrecemos soluciones integrales que incluyen desarrollo de software a medida, aplicaciones web y móviles, modernización de sistemas legacy e integración de APIs. Nos especializamos en crear arquitecturas escalables y seguras utilizando las últimas tecnologías del mercado.",
  },
  {
    question: "¿Cómo integran la Inteligencia Artificial en los proyectos?",
    answer:
      "Analizamos tus procesos de negocio para identificar oportunidades de automatización y optimización. Implementamos modelos de Machine Learning, procesamiento de lenguaje natural y agentes conversacionales que aportan valor real y medible a tu operativa diaria.",
  },
  {
    question: "¿Ofrecen servicios de consultoría estratégica?",
    answer:
      "Sí, no solo desarrollamos software. Acompañamos a tu empresa en su transformación digital, ayudándote a tomar decisiones tecnológicas informadas, optimizar costos de infraestructura y diseñar hojas de ruta tecnológicas alineadas con tus objetivos comerciales.",
  },
  {
    question: "¿Cómo garantizan la seguridad de los proyectos?",
    answer:
      "La seguridad es fundamental en nuestro ciclo de desarrollo (DevSecOps). Implementamos las mejores prácticas de la industria, auditorías de código, cifrado de datos y pruebas de vulnerabilidad para asegurar que tus activos digitales estén protegidos desde el primer día.",
  },
  {
    question: "¿Trabajan con metodologías ágiles?",
    answer:
      "Absolutamente. Adoptamos Scrum y Kanban para garantizar entregas iterativas y frecuentes, permitiendo una rápida adaptación a los cambios y asegurando que el producto final cumpla exactamente con las expectativas de los stakeholders.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate items appearing
      const items = itemsRef.current?.children || [];
      gsap.fromTo(
        items,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <RevealText
            text="Preguntas Frecuentes"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance"
          />
          <p className="text-lg text-muted-foreground">
            Resolvemos tus dudas sobre cómo podemos impulsar tu negocio con
            tecnología.
          </p>
        </div>

        <div ref={itemsRef} className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group border border-border/50 bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg sm:text-xl font-medium pr-8 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <span className="shrink-0 text-primary">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 pb-6"
                    : "grid-rows-[0fr] opacity-0 pb-0"
                }`}
              >
                <div className="overflow-hidden px-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
