'use client';

import { useState } from 'react';

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function TextInput({ onAnalyze, isLoading }: TextInputProps) {
  const [text, setText] = useState('');
  const maxLength = 5000;
  const [isFocused, setIsFocused] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length >= 10 && !isLoading) {
      onAnalyze(text);
    }
  }

  const charPercent = Math.round((text.length / maxLength) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Input wrapper with gradient border effect */}
        <div className="relative group">
          {/* Animated glow behind */}
          <div className={`absolute -inset-[1px] rounded-2xl transition-all duration-500 ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(139,92,246,0.15), rgba(167,139,250,0.4))' }}
          />
          <div className={`absolute -inset-1 rounded-2xl blur-xl transition-all duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(139,92,246,0.1), rgba(167,139,250,0.3))' }}
          />

          {/* Card */}
          <div className={`relative glass-card transition-all duration-300 ${isFocused ? '' : ''}`}>
            {/* Top accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

            <div className="p-1.5">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Analiz etmek istediğiniz haber metnini buraya yapıştırın..."
                className="w-full h-52 sm:h-60 px-5 py-4 bg-transparent text-gray-200 placeholder-gray-600 text-base sm:text-lg outline-none resize-none"
                maxLength={maxLength}
                disabled={isLoading}
              />

              {/* Bottom bar */}
              <div className="px-5 pb-3 flex items-center justify-between border-t border-white/[0.04] pt-3 mt-1">
                <div className="flex items-center gap-3">
                  <div className="w-28 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${charPercent}%`,
                        background: charPercent > 80
                          ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                          : 'linear-gradient(90deg, #7C3AED, #a78bfa)',
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 tabular-nums">
                    {text.length.toLocaleString()} / {maxLength.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {text.length > 0 && text.length < 10 && (
                    <span className="text-xs text-danger-400 font-medium">En az 10 karakter</span>
                  )}
                  {text.length >= 10 && (
                    <span className="text-xs text-brand-400/60 font-medium">Analiz için hazır</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            disabled={text.trim().length < 10 || isLoading}
            className="btn-primary text-base sm:text-lg group px-10 py-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analiz Ediliyor...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Haberi Analiz Et
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
