'use client';

import { Claim } from '@/types';

interface FactCheckCardProps {
  claim: Claim;
}

export default function FactCheckCard({ claim }: FactCheckCardProps) {
  const getVerdictConfig = () => {
    switch (claim.verdict) {
      case 'true':
        return {
          borderGradient: 'from-emerald-500/40 via-green-500/20 to-emerald-500/40',
          bg: 'bg-emerald-500/[0.04]',
          icon: (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 flex items-center justify-center border border-emerald-500/20">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ),
          label: 'Doğru Haber',
          labelClass: 'bg-gradient-to-r from-emerald-500/15 to-green-500/10 text-emerald-400 border-emerald-500/25',
          glow: '0 0 25px rgba(34,197,94,0.08)',
        };
      case 'false':
        return {
          borderGradient: 'from-red-500/40 via-rose-500/20 to-red-500/40',
          bg: 'bg-red-500/[0.04]',
          icon: (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-600/10 flex items-center justify-center border border-red-500/20">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ),
          label: 'Yanlış Haber',
          labelClass: 'bg-gradient-to-r from-red-500/15 to-rose-500/10 text-red-400 border-red-500/25',
          glow: '0 0 25px rgba(239,68,68,0.08)',
        };
      case 'misleading':
        return {
          borderGradient: 'from-amber-500/40 via-yellow-500/20 to-amber-500/40',
          bg: 'bg-amber-500/[0.04]',
          icon: (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center border border-amber-500/20">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          ),
          label: 'Yanıltıcı',
          labelClass: 'bg-gradient-to-r from-amber-500/15 to-yellow-500/10 text-amber-400 border-amber-500/25',
          glow: '0 0 25px rgba(245,158,11,0.08)',
        };
      default:
        return {
          borderGradient: 'from-brand-500/40 via-brand-400/20 to-brand-500/40',
          bg: 'bg-brand-500/[0.04]',
          icon: (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/10 flex items-center justify-center border border-brand-500/20">
              <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
          ),
          label: 'Doğrulanamadı',
          labelClass: 'bg-gradient-to-r from-brand-500/15 to-brand-400/10 text-brand-400 border-brand-500/25',
          glow: '0 0 25px rgba(124,58,237,0.08)',
        };
    }
  };

  const config = getVerdictConfig();
  const description = claim.sources.length > 0 ? claim.sources[0]?.description : null;
  const confidencePercent = Math.round(claim.confidence * 100);

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: config.glow }}>
      {/* Gradient border top */}
      <div className={`h-[2px] bg-gradient-to-r ${config.borderGradient}`} />

      <div className={`p-5 sm:p-6 ${config.bg}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {config.icon}
            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold border ${config.labelClass}`}>
              {config.label}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600 mb-0.5">Güven Oranı</div>
            <div className="text-sm font-bold text-gray-300 tabular-nums">{confidencePercent}%</div>
          </div>
        </div>

        {/* Claim text */}
        <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04] mb-4">
          <p className="text-gray-300 text-sm leading-relaxed">{claim.text}</p>
        </div>

        {/* AI Explanation */}
        {description && (
          <div className="relative rounded-xl overflow-hidden">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
            <div className="bg-gradient-to-br from-brand-500/[0.04] to-brand-700/[0.02] p-5 border-x border-b border-white/[0.04]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-brand-500/30 to-brand-700/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-brand-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">TruthAI Analizi</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
