"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Número de teléfono inválido"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      toast.success("¡Mensaje enviado con éxito!", {
        description: "Nos pondremos en contacto contigo pronto.",
      });
      reset();
    } catch (error) {
      toast.error("Hubo un error al enviar el mensaje", {
        description: "Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Hablemos de tu proyecto
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto px-4">
              Cuéntanos qué necesitas y diseñaremos la solución perfecta para
              ti.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6 max-w-md mx-auto"
          >
            <div>
              <Input
                {...register("name")}
                type="text"
                placeholder="Tu nombre"
                className="h-12 sm:h-14 text-base sm:text-lg bg-background/50 backdrop-blur-sm border-2 rounded-xl"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="tu@email.com"
                className="h-12 sm:h-14 text-base sm:text-lg bg-background/50 backdrop-blur-sm border-2 rounded-xl"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="phone-input-container">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Número de teléfono"
                      value={field.value}
                      onChange={field.onChange}
                      defaultCountry="AR"
                      international
                      withCountryCallingCode
                      className="flex h-12 sm:h-14 w-full rounded-xl border-2 border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-base sm:text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>.PhoneInputCountry]:mr-3 [&>.PhoneInputCountry]:ml-1 [&>.PhoneInputInput]:bg-transparent [&>.PhoneInputInput]:outline-none"
                    />
                  )}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <Textarea
              {...register("message")}
              placeholder="¿En qué podemos ayudarte?"
              className="min-h-[120px] text-base sm:text-lg bg-background/50 backdrop-blur-sm border-2 rounded-xl resize-none"
            />

            <Button
              size="lg"
              disabled={isSubmitting}
              className="w-full text-base sm:text-lg h-12 sm:h-14 rounded-xl relative overflow-hidden group bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/20 cursor-pointer"
            >
              <span className="relative z-10 font-bold tracking-wide flex items-center justify-center gap-2">
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </span>
              {!isSubmitting && (
                <>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent z-0" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent blur-md" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
