"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navLinks = [
  { label: "Servicios", href: "#features" },
  { label: "Nosotros", href: "#about" },
  { label: "Casos de Éxito", href: "#features" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power3.inOut",
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      /* Styled sticky navbar logic */
      /* Styled sticky navbar logic with Scrub */
      const tl = gsap.timeline({
        scrollTrigger: {
          start: "top top",
          end: "+=100",
          scrub: true,
        },
      });

      tl.to(navRef.current, {
        paddingBlock: "0.20rem",
        backgroundColor: "rgba(var(--background), 0.8)",
        backdropFilter: "blur(12px)",
        borderBottomColor: "rgba(128, 128, 128, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        ease: "none",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        if (mobileListRef.current) {
          gsap.from(mobileListRef.current.children, {
            x: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.3,
            delay: 0.2,
          });
        }
      } else {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4"
        style={{ borderBottom: "1px solid transparent" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div ref={logoRef} className="shrink-0 flex items-center">
              <Link
                href="#home"
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                onClick={(e) => handleScroll(e as any, "#home")}
              >
                <Image
                  src="kova_logo.png"
                  alt="Kova Icon"
                  width={50}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />

                <Image
                  src="kova_black.png"
                  alt="Kova"
                  width={100}
                  height={40}
                  className={`h-6 w-auto object-contain dark:hidden ${
                    isMenuOpen && "hidden"
                  }`}
                />

                <Image
                  src="kova_white.png"
                  alt="Kova"
                  width={100}
                  height={40}
                  className={`h-6 w-auto object-contain ${
                    isMenuOpen ? "block" : "hidden dark:block"
                  }`}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div ref={menuRef} className="hidden md:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={(e) => handleScroll(e as any, link.href)}
                  className={`text-sm font-medium text-muted-foreground hover:text-accent-foreground transition-all duration-300 px-4 py-2 rounded-full hover:bg-accent hover:scale-105 active:scale-95`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 border-l border-border/50 pl-6 ml-2">
                <LanguageToggle />
                <ModeToggle />
              </div>
              <Button
                size="sm"
                onClick={(e) => handleScroll(e as any, "#contact")}
                className="relative overflow-hidden rounded-full px-6 font-semibold hover:bg-black/90 bg-black text-white dark:bg-white dark:text-black hover:shadow-[0_0_15px_-3px_hsl(var(--primary)/0.4)] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span className="relative z-10">Agendar Reunión</span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/25 to-transparent dark:via-black/10 z-0" />
              </Button>
            </div>

            {/* Mobile Menu Button - Toggles removed from here */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:text-primary transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-background/95 backdrop-blur-lg border-l border-border z-40 md:hidden translate-x-full cursor-pointer"
      >
        <div ref={mobileListRef} className="flex flex-col gap-6 p-8 pt-24">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-2xl font-medium hover:text-primary transition-colors cursor-pointer text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-2">
            <div className="text-white flex items-center gap-3">
              <LanguageToggle className="border-white text-white hover:bg-white/20 hover:text-white hover:border-white" />
              <ModeToggle className="border-white text-white hover:bg-white/20 hover:text-white hover:border-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
