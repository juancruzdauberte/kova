"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Instagram, Mail } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

export default function Footer() {
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
    }
  };

  return (
    <footer className="border-t border-border py-8 sm:py-10 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 lg:pr-16 lg:pl-16">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="kova_black.png"
              alt="Kova"
              width={160}
              height={80}
              className="h-12 w-auto object-contain dark:hidden"
            />

            <Image
              src="kova_white.png"
              alt="Kova"
              width={160}
              height={80}
              className="h-12 w-auto object-contain hidden dark:block"
            />
            <p className="text-muted-foreground text-sm ml-1 mt-2">
              Transformamos ideas en soluciones digitales robustas y escalables
              para potenciar negocios.
            </p>

            <div className="flex gap-4 mt-6 ml-1">
              <a
                href="https://instagram.com/kova.jp"
                target="_blank"
                className="bg-accent/10 p-3 rounded-full hover:bg-accent hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-foreground group-hover:text-accent-foreground" />
              </a>
              <a
                href="mailto:kovasolutionsjp@gmail.com"
                target="_blank"
                className="bg-accent/10 p-3 rounded-full hover:bg-accent hover:scale-110 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-foreground group-hover:text-accent-foreground" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-6 md:gap-14">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 sm:mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground text-start">
                <li>
                  <Link
                    href="#features"
                    onClick={(e) => handleScroll(e, "#features")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Características
                  </Link>
                </li>
                <li>
                  <Link
                    href="#stats"
                    onClick={(e) => handleScroll(e, "#stats")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Estadísticas
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    onClick={(e) => handleScroll(e, "#contact")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 sm:mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground text-start">
                <li>
                  <Link
                    href="#about"
                    onClick={(e) => handleScroll(e, "#about")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => handleScroll(e, "#about")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => handleScroll(e, "#about")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 sm:mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground text-start">
                <li>
                  <Link
                    href="#"
                    onClick={(e) => handleScroll(e, "#about")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => handleScroll(e, "#about")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Términos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => handleScroll(e, "#about")}
                    className="inline-block p-1 rounded-md hover:text-accent-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} KOVA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
