import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KOVA",
  description:
    "Transformamos ideas en productos digitales de alto impacto. Desarrollo web a medida, software escalable y optimización de procesos para potenciar tu negocio.",
  applicationName: "KOVA",
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
