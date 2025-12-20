import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 sm:py-10 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1766172123/KOVA.-BLACK_efgp2z.png"
              alt="Kova"
              width={160}
              height={80}
              className="h-12 w-auto object-contain dark:hidden"
            />

            <Image
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1766172119/KOVA-WHITE_khctbl.png"
              alt="Kova"
              width={160}
              height={80}
              className="h-12 w-auto object-contain hidden dark:block"
            />
            <p className="text-muted-foreground text-sm ml-1">
              Conectando marcas con gamers de todo el mundo.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="#stats"
                  className="hover:text-foreground transition-colors"
                >
                  Estadísticas
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} KOVA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
