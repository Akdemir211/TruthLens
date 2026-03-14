'use client';

import Link from 'next/link';

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const headerOffset = 80;
  const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 900;
  let startTime: number | null = null;

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ─────────────────── Logo SVG ─────────────────── */
function TruthLensLogo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      {/* Outer lens circle */}
      <circle cx="10.5" cy="10.5" r="7" />
      {/* Lens aperture cross-hairs */}
      <line x1="10.5" y1="3.5" x2="10.5" y2="5" strokeWidth={1.2} opacity={0.45} />
      <line x1="10.5" y1="16" x2="10.5" y2="17.5" strokeWidth={1.2} opacity={0.45} />
      <line x1="3.5" y1="10.5" x2="5" y2="10.5" strokeWidth={1.2} opacity={0.45} />
      <line x1="16" y1="10.5" x2="17.5" y2="10.5" strokeWidth={1.2} opacity={0.45} />
      {/* Handle */}
      <path strokeLinecap="round" d="M16.2 16.2 L21 21" strokeWidth={2.2} />
      {/* Check inside lens */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10.5 L10 12.5 L13.5 8.5" strokeWidth={1.8} />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─── */}
      <header className="border-b border-white/[0.06] bg-[#060714]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-500/30 rounded-xl blur-md" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 flex items-center justify-center border border-brand-400/20">
                <TruthLensLogo className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold">
                <span className="text-white">Truth</span>
                <span className="text-gradient">Lens</span>
              </span>
              <span className="hidden sm:inline-block ml-3 text-[11px] text-gray-600 font-medium tracking-wide uppercase">Sahte Haber Tespit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/[0.08] border border-brand-500/15">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              <span className="text-xs text-brand-300 font-medium">TruthAI Motor</span>
            </div>
            <Link href="/verify" className="btn-primary px-4 py-2 text-sm font-semibold rounded-xl">
              Haber Doğrula
            </Link>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center overflow-hidden">
          {/* Radar rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
            {[340, 500, 660].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-brand-500/[0.05]"
                style={{
                  width: `${size}px`, height: `${size}px`,
                  top: `${-size / 2}px`, left: `${-size / 2}px`,
                  animation: `pulseGrow 5s ease-out infinite`,
                  animationDelay: `${i * 1.6}s`,
                }}
              />
            ))}
          </div>

          {/* Badge */}
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-600/15 to-brand-500/10 border border-brand-500/20 mb-8">
            <div className="absolute inset-0 rounded-full blur-sm bg-brand-600/10" />
            <div className="relative flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-brand-200">TruthAI Destekli Haber Doğrulama</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="relative text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.08]">
            <span className="text-white">Gerçeği</span>
            <br />
            <span className="text-gradient-bright">Yanlıştan</span>
            <br />
            <span className="text-white">Ayırt Edin</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            <span className="text-white font-semibold">TruthLens</span>, gelişmiş yapay zeka motoru{' '}
            <span className="text-brand-300 font-medium">TruthAI</span> ile desteklenen,
            saniyeler içinde haber metinlerinin doğruluğunu analiz eden bir platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/verify"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.4)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9, #5b21b6)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-400/0 via-white/5 to-brand-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="relative z-10">Haber Doğrula</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-gray-300 text-lg border border-white/10 hover:border-brand-500/30 hover:text-white transition-all duration-300 hover:bg-brand-500/[0.06]"
            >
              Daha Fazla Bilgi
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="inline-flex items-center gap-8 sm:gap-12 px-8 py-5 rounded-2xl glass-card">
            {[
              { value: '98%', label: 'Doğruluk Oranı' },
              { value: '<3s', label: 'Analiz Süresi' },
              { value: '4', label: 'Karar Türü' },
              { value: 'AI', label: 'TruthAI' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-gradient tabular-nums">{stat.value}</div>
                <div className="text-[11px] text-gray-600 mt-0.5 uppercase tracking-wider whitespace-nowrap">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── About ─── */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span className="text-xs text-brand-300 font-medium uppercase tracking-wider">Proje Hakkında</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                TruthLens Nedir?
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
                TruthLens, dijital çağda hızla yayılan <span className="text-white font-medium">dezenformasyon ve sahte haberler</span> ile
                mücadele etmek amacıyla geliştirilmiş, yapay zeka destekli bir haber doğrulama platformudur.
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
                Kullanıcılar herhangi bir haber metnini platforma yapıştırarak, TruthAI motorunun
                gerçek zamanlı analizi sayesinde <span className="text-brand-300 font-medium">doğru, yanlış, yanıltıcı veya doğrulanamaz</span> şeklinde
                kategorize edilmiş bir rapor alabilirler.
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Platform yalnızca bir karar vermekle kalmaz; aynı zamanda bu karara ulaşırken kullandığı
                <span className="text-white font-medium"> gerekçeleri, güvenilirlik skorunu ve detaylı açıklamaları</span> da şeffaf biçimde sunar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
                  title: 'Misyonumuz',
                  desc: 'Okuyucuların güvenilir haberlere erişimini kolaylaştırarak bilgi kirliliğini azaltmak.',
                  color: 'from-brand-500/20 to-brand-700/10',
                },
                {
                  icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
                  title: 'Şeffaflık',
                  desc: 'Her analiz kararı, gerekçeleri ve güvenilirlik skoru ile birlikte açıkça sunulur.',
                  color: 'from-brand-400/20 to-brand-600/10',
                },
                {
                  icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
                  title: 'Güvenilirlik',
                  desc: 'TruthAI motorunun gücüyle desteklenen, %98 doğruluk oranına sahip analizler.',
                  color: 'from-brand-600/20 to-brand-800/10',
                },
                {
                  icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
                  title: 'Hız',
                  desc: '3 saniyeden kısa sürede detaylı analiz ve rapor. Zaman kaybetmeden gerçeği öğrenin.',
                  color: 'from-brand-500/15 to-brand-700/15',
                },
              ].map((card, i) => (
                <div key={i} className="glass-card-hover group p-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 border border-brand-500/10 group-hover:border-brand-500/25 transition-all duration-500`}>
                    <svg className="w-5 h-5 text-brand-400 group-hover:text-brand-300 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-1.5 text-sm">{card.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="py-20 sm:py-28 relative">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)',
          }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span className="text-xs text-brand-300 font-medium uppercase tracking-wider">Nasıl Çalışır?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">3 Adımda Haber Doğrulama</h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">Birkaç saniye içinde herhangi bir haberin doğruluğunu öğrenin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
              {[
                {
                  step: '01',
                  icon: 'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75',
                  title: 'Metni Yapıştırın',
                  desc: 'Doğruluğundan emin olmak istediğiniz haber metnini kopyalayıp analiz kutusuna yapıştırın.',
                },
                {
                  step: '02',
                  icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
                  title: 'TruthAI Analiz Eder',
                  desc: 'TruthAI motoru metni 4 adımlı karar ağacıyla analiz eder ve güvenilirlik skorunu hesaplar.',
                },
                {
                  step: '03',
                  icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
                  title: 'Raporu Görün',
                  desc: 'Detaylı güvenilirlik skoru, karar gerekçeleri ve açıklamalarla birlikte kapsamlı raporu inceleyin.',
                },
              ].map((item, i) => (
                <div key={i} className="glass-card-hover group p-8 text-center relative">
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 bg-brand-500/20 rounded-2xl blur-lg" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/25 to-brand-700/15 flex items-center justify-center border border-brand-500/20 group-hover:border-brand-500/40 transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(124,58,237,0.2)]">
                      <svg className="w-7 h-7 text-brand-400 group-hover:text-brand-300 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center border border-brand-400/20">
                      <span className="text-[9px] font-bold text-white">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span className="text-xs text-brand-300 font-medium uppercase tracking-wider">Özellikler</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Neden TruthLens?</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Sahte haberlere karşı en güçlü silah: şeffaf, hızlı ve akıllı analiz.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
                title: 'Gerçek Zamanlı Analiz',
                desc: '3 saniyeden kısa sürede TruthAI ile kapsamlı haber analizi gerçekleştirilir.',
                gradient: 'from-brand-500/20 to-brand-700/20',
              },
              {
                icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
                title: '4 Karar Kategorisi',
                desc: 'Doğru, Yanlış, Yanıltıcı ve Doğrulanamaz olmak üzere 4 farklı kategori ile hassas sınıflandırma.',
                gradient: 'from-brand-400/20 to-brand-600/20',
              },
              {
                icon: 'M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
                title: 'Güvenilirlik Skoru',
                desc: '0-100 arası ölçekte hesaplanan güvenilirlik skoru ile haberin doğruluk seviyesini görsel olarak inceleyin.',
                gradient: 'from-brand-600/20 to-brand-800/20',
              },
              {
                icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Şeffaf Gerekçeler',
                desc: 'Her analiz kararı için ayrıntılı gerekçe ve açıklama sunulur. Yapay zekanın mantığını anlayın.',
                gradient: 'from-brand-500/15 to-brand-700/15',
              },
              {
                icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
                title: 'TruthAI Motor',
                desc: 'TruthAI\'nın en gelişmiş doğal dil işleme ve bilgi doğrulama yetenekleriyle desteklenen kapsamlı analiz.',
                gradient: 'from-brand-400/15 to-brand-600/15',
              },
              {
                icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
                title: 'Güvenli & Hızlı',
                desc: 'Rate limiting ve güvenlik önlemleriyle korunan API. Verileriniz güvende, analiziniz hızlı.',
                gradient: 'from-brand-600/15 to-brand-800/15',
              },
            ].map((feature, i) => (
              <div key={i} className="glass-card-hover group p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 border border-brand-500/10 group-hover:border-brand-500/25 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]`}>
                  <svg className="w-6 h-6 text-brand-400 group-hover:text-brand-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Verdict Types ─── */}
        <section className="py-20 sm:py-28 relative">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.03) 0%, transparent 60%)',
          }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span className="text-xs text-brand-300 font-medium uppercase tracking-wider">Analiz Sonuçları</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">4 Farklı Karar Kategorisi</h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">TruthLens, haberleri dört farklı kategoride değerlendirir.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  label: 'Doğru',
                  desc: 'Haber, güvenilir kaynaklarca doğrulanmış gerçek bilgiler içeriyor.',
                  textColor: 'text-success-400',
                  borderStyle: 'rgba(34,197,94,0.2)',
                  bgClass: 'bg-success-500/10',
                  borderClass: 'border-success-500/20',
                  glowColor: 'rgba(34,197,94,0.08)',
                  icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                },
                {
                  label: 'Yanlış',
                  desc: 'Haber, gerçeklerle çelişen ya da yanıltıcı bilgiler barındırıyor.',
                  textColor: 'text-danger-400',
                  borderStyle: 'rgba(239,68,68,0.2)',
                  bgClass: 'bg-danger-500/10',
                  borderClass: 'border-danger-500/20',
                  glowColor: 'rgba(239,68,68,0.08)',
                  icon: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                },
                {
                  label: 'Yanıltıcı',
                  desc: 'Haber gerçek bilgiler içerse de bağlamdan koparılmış ya da çarpıtılmış.',
                  textColor: 'text-warning-400',
                  borderStyle: 'rgba(245,158,11,0.2)',
                  bgClass: 'bg-warning-500/10',
                  borderClass: 'border-warning-500/20',
                  glowColor: 'rgba(245,158,11,0.08)',
                  icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
                },
                {
                  label: 'Doğrulanamaz',
                  desc: 'Haber hakkında yeterli kanıt bulunmuyor; doğrulama yapılamıyor.',
                  textColor: 'text-gray-400',
                  borderStyle: 'rgba(107,114,128,0.2)',
                  bgClass: 'bg-gray-500/10',
                  borderClass: 'border-gray-500/20',
                  glowColor: 'rgba(107,114,128,0.08)',
                  icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z',
                },
              ].map((verdict, i) => (
                <div
                  key={i}
                  className="glass-card group p-6 hover:scale-[1.02] transition-all duration-300"
                  style={{ borderColor: verdict.borderStyle, boxShadow: `0 0 20px ${verdict.glowColor}` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${verdict.bgClass} border ${verdict.borderClass} flex items-center justify-center mb-4`}>
                    <svg className={`w-6 h-6 ${verdict.textColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={verdict.icon} />
                    </svg>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${verdict.textColor}`}>{verdict.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{verdict.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Tech Stack ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="glass-card p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span className="text-xs text-brand-300 font-medium uppercase tracking-wider">Teknoloji</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Güçlü Bir Altyapı</h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  TruthLens, modern web teknolojileri ve dünyanın en gelişmiş yapay zeka motorları ile inşa edilmiştir.
                  Her bileşen, en yüksek performans ve güvenilirlik için özenle seçilmiştir.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'TruthAI Motor', role: 'Yapay Zeka Motoru', icon: '✦' },
                  { name: 'Next.js 14', role: 'Frontend Framework', icon: '▲' },
                  { name: 'Express.js', role: 'Backend API', icon: '⬡' },
                  { name: 'TypeScript', role: 'Tip Güvenliği', icon: 'TS' },
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-500/20 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-700/10 border border-brand-500/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-400 font-bold text-xs">{tech.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{tech.name}</div>
                      <div className="text-xs text-gray-600">{tech.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contributors ─── */}
        <section id="contributors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span className="text-xs text-brand-300 font-medium uppercase tracking-wider">Ekip</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Projede Emeği Geçenler</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">TruthLens&apos;i hayata geçiren yazılım ekibi.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'İbrahim Akdemir',
                initials: 'İA',
                role: 'Full-Stack Geliştirici',
                roleColor: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
                desc: 'Proje mimarisi, full-stack geliştirme ve teknik koordinasyonu üstlendi.',
                avatarFrom: 'from-violet-600',
                avatarTo: 'to-purple-800',
              },
              {
                name: 'Esma Eylül Batır',
                initials: 'EB',
                role: 'Frontend & UI/UX',
                roleColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
                desc: 'Kullanıcı arayüzü tasarımı, animasyonlar ve frontend geliştirmeyi üstlendi.',
                avatarFrom: 'from-fuchsia-600',
                avatarTo: 'to-pink-700',
              },
              {
                name: 'İbrahim Ethem Erkan',
                initials: 'İE',
                role: 'Backend Geliştirici',
                roleColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
                desc: 'Sunucu mimarisi, API geliştirme ve TruthAI entegrasyonunu gerçekleştirdi.',
                avatarFrom: 'from-indigo-600',
                avatarTo: 'to-violet-700',
              },
              {
                name: 'Ahmet Efe Gücek',
                initials: 'AG',
                role: 'Ar-Ge Mühendisi',
                roleColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                desc: 'Yapay zeka araştırması, model optimizasyonu ve kalite testlerini yürüttü.',
                avatarFrom: 'from-purple-600',
                avatarTo: 'to-indigo-700',
              },
            ].map((person, i) => (
              <div key={i} className="glass-card-hover group p-6 text-center flex flex-col items-center">
                {/* Avatar */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-40"
                    style={{ background: `radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)` }} />
                  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${person.avatarFrom} ${person.avatarTo} flex items-center justify-center border-2 border-white/10 group-hover:border-brand-500/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]`}>
                    <span className="text-2xl font-extrabold text-white tracking-tight">{person.initials}</span>
                  </div>
                  {/* Online dot */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-success-500 border-2 border-[#060714] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>

                {/* Name */}
                <h3 className="font-bold text-white text-base mb-2 group-hover:text-brand-200 transition-colors duration-300">
                  {person.name}
                </h3>

                {/* Role badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border mb-4 ${person.roleColor}`}>
                  {person.role}
                </span>

                {/* Description */}
                <p className="text-gray-500 text-xs leading-relaxed text-center">
                  {person.desc}
                </p>

                {/* Decorative line */}
                <div className="mt-5 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="relative glass-card p-12 sm:p-16 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-[80px]"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-sm text-brand-300 font-medium">Ücretsiz &amp; Hemen Kullanıma Hazır</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Haberin Doğruluğunu<br />
                <span className="text-gradient">Hemen Öğrenin</span>
              </h2>

              <p className="text-gray-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Kayıt gerekmez. Herhangi bir haber metnini yapıştırın ve TruthAI&apos;nın gücünü deneyimleyin.
              </p>

              <Link
                href="/verify"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9, #5b21b6)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400/0 via-white/8 to-brand-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="relative z-10">Haber Doğrula</span>
                <svg className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="mt-auto">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" />
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center border border-brand-500/20">
                  <TruthLensLogo className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <span className="font-bold text-sm">
                  <span className="text-white">Truth</span>
                  <span className="text-gradient">Lens</span>
                </span>
                <p className="text-[10px] text-gray-600 mt-0.5">Sahte Haber Tespit Platformu</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/verify" className="hover:text-gray-400 transition-colors duration-200">Haber Doğrula</Link>
              <button
                onClick={() => scrollToSection('contributors')}
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Ekip
              </button>
              <span>&copy; 2026 TruthLens</span>
              <span className="text-gray-700 hidden sm:inline">Sonuçlar bilgilendirme amaçlıdır.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
