'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextInput from '@/components/TextInput';
import AnalysisResult from '@/components/AnalysisResult';
import { AnalysisResponse } from '@/types';
import api from '@/services/api';

export default function VerifyPage() {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(text: string) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.analyzeText(text);
      setResult(response);
    } catch (err: unknown) {
      console.error('Analysis error:', err);
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr.response?.data?.message ||
        'Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError(null);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#060714]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image src="/logo.png" alt="TruthLens Logo" fill sizes="44px" className="object-contain" priority />
              </div>
              <div>
                <span className="text-lg font-bold">
                  <span className="text-white">Truth</span>
                  <span className="text-gradient">Lens</span>
                </span>
                <span className="hidden sm:inline-block ml-3 text-[11px] text-gray-600 font-medium tracking-wide uppercase">Sahte Haber Tespit</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-gray-200 hover:border-white/20 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Ana Sayfa
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/[0.08] border border-brand-500/15">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              <span className="text-xs text-brand-300 font-medium">TruthAI Motor</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-success-400 font-medium">
              <div className="w-2 h-2 rounded-full bg-success-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
              Aktif
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {!result && !isLoading && !error && (
          <div className="animate-fade-in">
            {/* Hero */}
            <div className="text-center mb-12 sm:mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
                {[280, 380, 480].map((size, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-brand-500/[0.06]"
                    style={{
                      width: `${size}px`, height: `${size}px`,
                      top: `${-size / 2}px`, left: `${-size / 2}px`,
                      animation: `pulseGrow 4s ease-out infinite`,
                      animationDelay: `${i * 1.3}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-600/15 to-brand-500/10 border border-brand-500/20 mb-8">
                <div className="absolute inset-0 rounded-full blur-sm bg-brand-600/10" />
                <div className="relative flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-brand-200">TruthAI Destekli</span>
                </div>
              </div>

              <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                <span className="text-white">Haberlerin</span>
                <br />
                <span className="text-gradient-bright">Doğruluğunu</span>
                <br />
                <span className="text-white">Anında </span>
                <span className="relative inline-block">
                  <span className="text-gradient">Tespit Edin</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 rounded-full opacity-60" />
                </span>
              </h1>

              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mt-6">
                Haber metnini yapıştırın, yapay zeka saniyeler içinde
                <span className="text-brand-300 font-medium"> doğruluğunu analiz etsin</span>.
              </p>

              <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
                {[
                  { value: '98%', label: 'Doğruluk' },
                  { value: '<3s', label: 'Analiz Süresi' },
                  { value: 'AI', label: 'TruthAI' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-gradient tabular-nums">{stat.value}</div>
                    <div className="text-[11px] text-gray-600 mt-0.5 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 sm:mt-20 max-w-4xl mx-auto">
              <FeatureCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                }
                title="Hızlı Analiz"
                desc="Saniyeler içinde detaylı sonuç alın"
                gradient="from-brand-500/20 to-brand-700/20"
              />
              <FeatureCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                }
                title="TruthAI Motor"
                desc="TruthAI&apos;nın güçlü doğrulama motoru"
                gradient="from-brand-400/20 to-brand-600/20"
              />
              <FeatureCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                }
                title="Detaylı Rapor"
                desc="Güvenilirlik skoru ve açıklama"
                gradient="from-brand-600/20 to-brand-800/20"
              />
            </div>
          </div>
        )}

        {isLoading && <LoadingState />}

        {error && (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="glass-card p-8 text-center" style={{ borderColor: 'rgba(248,113,113,0.2)', boxShadow: '0 0 30px rgba(248,113,113,0.08)' }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-danger-500/20 to-danger-600/10 flex items-center justify-center mx-auto mb-5 border border-danger-500/20">
                <svg className="w-8 h-8 text-danger-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-danger-400 mb-2">Bir Hata Oluştu</h3>
              <p className="text-gray-400 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(248,113,113,0.3)]"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        )}

        {result && <AnalysisResult result={result} onReset={handleReset} />}
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" />
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Image src="/logo.png" alt="TruthLens Logo" fill sizes="24px" className="object-contain" />
            </div>
            <span>TruthLens &copy; 2026</span>
          </div>
          <p className="text-gray-700">Sonuçlar bilgilendirme amaçlıdır.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, gradient }: { icon: React.ReactNode; title: string; desc: string; gradient: string }) {
  return (
    <div className="glass-card-hover group p-6">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 border border-brand-500/10 group-hover:border-brand-500/25 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]`}>
        <div className="text-brand-400 group-hover:text-brand-300 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-white mb-1.5">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function LoadingState() {
  const steps = [
    { text: 'Metin analiz ediliyor', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { text: "TruthAI'ya gönderiliyor", icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
    { text: 'Doğruluk kontrol ediliyor', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { text: 'Sonuçlar hazırlanıyor', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
  ];

  return (
    <div className="max-w-md mx-auto text-center animate-fade-in py-16">
      <div className="relative w-28 h-28 mx-auto mb-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500/20 to-brand-700/10 animate-pulse-slow" />
        <div className="absolute inset-1 rounded-full border-2 border-brand-600/15" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-brand-500 border-r-brand-400/50 animate-spin" />
        <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-brand-400 border-l-brand-300/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.8s' }} />
        <div className="absolute inset-7 rounded-full bg-gradient-to-br from-brand-600/20 to-brand-800/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-brand-300 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Analiz Ediliyor</h2>
      <p className="text-gray-500 mb-10">TruthAI haberin doğruluğunu araştırıyor...</p>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-4 glass-card px-5 py-3.5 animate-fade-in"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-700/10 flex items-center justify-center flex-shrink-0 border border-brand-500/10">
              <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
              </svg>
            </div>
            <span className="text-sm text-gray-300 flex-1 text-left">{step.text}</span>
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
          </div>
        ))}
      </div>

      <div className="mt-8 w-full h-1 rounded-full bg-white/[0.04] overflow-hidden">
        <div className="h-full w-full shimmer-line rounded-full" />
      </div>
    </div>
  );
}
