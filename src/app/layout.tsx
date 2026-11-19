import "@fontsource-variable/space-grotesk";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { AnimatedBackground } from "@/components/motion/AnimatedBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PREFERENCES_INIT_SCRIPT } from "@/config/preferences";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} · ${siteConfig.lab}`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  // Maqueta no aprobada para publicación: se pide a los buscadores no indexarla.
  robots: siteConfig.status.published ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07111f" },
    { media: "(prefers-color-scheme: light)", color: "#f3f7fb" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <head>
        <Script id="mulser-preferences" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: PREFERENCES_INIT_SCRIPT }} />
        {/* Sin JavaScript, las entradas animadas deben quedar visibles. */}
        <noscript>
          <style>{"[data-animate]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <MotionProvider>
            <a href="#contenido" className="skip-link">
              Saltar al contenido
            </a>
            <AnimatedBackground />
            <Header />
            <main id="contenido" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
