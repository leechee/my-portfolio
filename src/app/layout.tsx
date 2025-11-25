import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Particles from "@/components/Particles";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import Preloader from "@/components/preloader";
import { config } from "@/data/config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MusicToggle from "@/components/ui/music-toggle";
import { AudioProvider } from "@/contexts/audio-context";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  metadataBase: new URL(config.site),
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    siteName: "Jason Lee Portfolio",
    images: [
      {
        url: config.ogImg,
        width: 1144,
        height: 714,
        alt: "Jason Lee - Computational Engineering & Robotics Student Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[archivoBlack.className, inter.variable].join(" ")}>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="630f4fb7-b73f-468f-aa9d-ba410ef239bd"
        ></Script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <Preloader>
            <AudioProvider>
              <TooltipProvider>
                <Header />
                {children}
                <Footer />
                <MusicToggle />
              </TooltipProvider>
              <Toaster />
              <ElasticCursor />
            </AudioProvider>
          </Preloader>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
