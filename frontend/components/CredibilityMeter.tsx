'use client';

interface CredibilityMeterProps {
  score: number;
}

export default function CredibilityMeter({ score }: CredibilityMeterProps) {
  const getConfig = () => {
    if (score >= 80) return {
      gradient: 'from-emerald-500 to-green-400',
      glow: 'rgba(34,197,94,0.15)',
      text: 'text-emerald-400',
      label: 'Yüksek Güvenilirlik',
      badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      ring: '#22c55e',
    };
    if (score >= 60) return {
      gradient: 'from-brand-500 to-brand-400',
      glow: 'rgba(124,58,237,0.15)',
      text: 'text-brand-400',
      label: 'Orta Güvenilirlik',
      badge: 'bg-brand-500/10 border-brand-500/20 text-brand-400',
      ring: '#8b5cf6',
    };
    if (score >= 40) return {
      gradient: 'from-amber-500 to-yellow-400',
      glow: 'rgba(245,158,11,0.15)',
      text: 'text-amber-400',
      label: 'Düşük Güvenilirlik',
      badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      ring: '#f59e0b',
    };
    return {
      gradient: 'from-red-500 to-rose-400',
      glow: 'rgba(239,68,68,0.15)',
      text: 'text-red-400',
      label: 'Çok Düşük Güvenilirlik',
      badge: 'bg-red-500/10 border-red-500/20 text-red-400',
      ring: '#ef4444',
    };
  };

  const config = getConfig();
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card p-6 sm:p-8" style={{ boxShadow: `0 0 40px ${config.glow}` }}>
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Circular gauge */}
        <div className="relative w-40 h-40 flex-shrink-0">
          {/* Glow behind */}
          <div className="absolute inset-4 rounded-full blur-xl" style={{ background: config.glow }} />

          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Background ring */}
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
            {/* Gradient ring */}
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={config.ring}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 6px ${config.ring}40)` }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold tabular-nums ${config.text}`}>{score}</span>
            <span className="text-xs text-gray-600 mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-white mb-1">Güvenilirlik Skoru</h3>
          <p className="text-sm text-gray-500 mb-4">TruthAI tarafından analiz edildi</p>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden mb-4">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-1000 ease-out`}
              style={{ width: `${score}%`, boxShadow: `0 0 10px ${config.ring}50` }}
            />
          </div>

          {/* Badge */}
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${config.badge}`}>
            {score >= 80 && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {score >= 40 && score < 80 && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            )}
            {score < 40 && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            )}
            {config.label}
          </span>
        </div>
      </div>
    </div>
  );
}
