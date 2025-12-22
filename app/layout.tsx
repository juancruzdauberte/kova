import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kova",
  description:
    "La plataforma que conecta marcas con millones de jugadores a través de recompensas en el juego.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1766169973/kova_logo_csc7lj.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1766169973/kova_logo_csc7lj.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1766169973/kova_logo_csc7lj.ico",
        type: "image/svg+xml",
      },
    ],
    apple:
      "https://res.cloudinary.com/dttpgbmdx/image/upload/v1766169973/kova_logo_csc7lj.ico",
  },
};

import FloatingWhatsApp from "@/components/floating-whatsapp";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingWhatsApp />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
