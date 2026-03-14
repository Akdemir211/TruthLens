'use client';

import { AnalysisResponse } from '@/types';
import FactCheckCard from './FactCheckCard';
import CredibilityMeter from './CredibilityMeter';

interface AnalysisResultProps {
  result: AnalysisResponse;
  onReset: () => void;
}

export default function AnalysisResult({ result, onReset }: AnalysisResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand-600/15 to-brand-500/10 border border-brand-500/20 mb-5">
          <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-brand-200">Analiz Tamamlandı</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Analiz <span className="text-gradient">Sonuçları</span>
        </h2>
        <p className="text-gray-600 text-sm">
          ID: <span className="font-mono text-brand-500/40">{result.analysisId.split('-')[0]}</span>
          <span className="mx-2 text-gray-800">&bull;</span>
          <span>{new Date(result.timestamp).toLocaleTimeString('tr-TR')}</span>
        </p>
      </div>

      {/* Score */}
      <CredibilityMeter score={result.credibilityScore} />

      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-brand-500/15" />
        <span className="text-xs text-gray-600 font-medium uppercase tracking-wider">Detaylı Analiz</span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-brand-500/15" />
      </div>

      {/* Fact Check */}
      {result.factCheck.claims.length > 0 && (
        <div className="glass-card p-6 sm:p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500/25 to-brand-700/15 flex items-center justify-center border border-brand-500/15">
              <svg className="w-4.5 h-4.5 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">TruthAI Değerlendirmesi</h3>
              <p className="text-xs text-gray-600">TruthAI motoru ile analiz</p>
            </div>
          </div>
          <div className="space-y-4">
            {result.factCheck.claims.map((claim) => (
              <FactCheckCard key={claim.id} claim={claim} />
            ))}
          </div>
        </div>
      )}

      {result.factCheck.claims.length === 0 && (
        <div className="glass-card p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-600/10 to-gray-700/5 flex items-center justify-center mx-auto mb-4 border border-gray-600/10">
            <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">TruthAI analiz yapamadı</p>
          <p className="text-gray-600 text-sm mt-1">Lütfen tekrar deneyin</p>
        </div>
      )}

      {/* New Analysis */}
      <div className="text-center pt-6">
        <button
          onClick={onReset}
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-brand-300 transition-all duration-300 bg-brand-500/[0.08] border border-brand-500/15 hover:bg-brand-500/15 hover:border-brand-500/25 hover:shadow-[0_0_25px_rgba(124,58,237,0.1)]"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          Yeni Analiz Yap
        </button>
      </div>
    </div>
  );
}
