import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundEffects from "@/components/BackgroundEffects";
import FloatingElements from "@/components/FloatingElements";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TruthLens - Sahte Haber Tespit Motoru",
  description: "TruthAI destekli sahte haber ve yanlış bilgi tespit platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className={inter.className}>
        {/* Base dark background */}
        <div className="fixed inset-0 -z-20 bg-[#060714]" />

        {/* Gradient orbs */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full blur-[160px]"
            style={{
              top: '-15%', left: '-10%',
              width: '700px', height: '700px',
              background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, rgba(91,33,182,0.08) 50%, transparent 70%)',
              animation: 'orbFloat1 12s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full blur-[140px]"
            style={{
              top: '30%', right: '-8%',
              width: '600px', height: '600px',
              background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)',
              animation: 'orbFloat2 15s ease-in-out infinite',
              animationDelay: '2s',
            }}
          />
          <div
            className="absolute rounded-full blur-[120px]"
            style={{
              bottom: '-10%', left: '25%',
              width: '800px', height: '500px',
              background: 'radial-gradient(circle, rgba(76,29,149,0.12) 0%, rgba(109,40,217,0.05) 50%, transparent 70%)',
              animation: 'orbFloat3 10s ease-in-out infinite',
              animationDelay: '4s',
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(124,58,237,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124,58,237,0.025) 1px, transparent 1px)
              `,
              backgroundSize: '70px 70px',
            }}
          />
          {/* Vignette */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6,7,20,0.6) 100%)',
          }} />
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 30%, rgba(167,139,250,0.6) 50%, rgba(124,58,237,0.4) 70%, transparent)' }}
          />
        </div>

        {/* Neural network canvas */}
        <BackgroundEffects />

        {/* Floating cards + particles */}
        <FloatingElements />

        {/* Content */}
        {children}
      </body>
    </html>
  );
}
