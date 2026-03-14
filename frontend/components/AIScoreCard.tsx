'use client';

interface AIScoreCardProps {
  probability: number;
  confidence: number;
  explanation: string;
}

export default function AIScoreCard({ probability, confidence, explanation }: AIScoreCardProps) {
  const percentage = Math.round(probability * 100);
  
  const getColor = () => {
    if (percentage >= 70) return 'text-danger-600 border-danger-200 bg-danger-50';
    if (percentage >= 40) return 'text-warning-600 border-warning-200 bg-warning-50';
    return 'text-success-600 border-success-200 bg-success-50';
  };

  const getRingColor = () => {
    if (percentage >= 70) return '#dc2626';
    if (percentage >= 40) return '#d97706';
    return '#16a34a';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`border-2 rounded-2xl p-6 ${getColor()}`}>
      <h3 className="text-xl font-bold mb-4">AI Üretimi Olasılığı</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke={getRingColor()}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm opacity-75">Güven Skoru</div>
            <div className="text-2xl font-semibold">{Math.round(confidence * 100)}%</div>
          </div>
        </div>

        <div className="flex-1 pl-6">
          <p className="text-sm leading-relaxed">{explanation}</p>
        </div>
      </div>
    </div>
  );
}
