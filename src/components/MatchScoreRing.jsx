'use client';

export default function MatchScoreRing({ score, classification }) {
  // SVG Gradient IDs and styling
  let gradientId = 'grad-emerald';
  let stopStart = '#10B981';
  let stopEnd = '#059669';
  let textColor = 'text-emerald-700';
  let badgeBg = 'bg-emerald-50 border-emerald-200/80 text-emerald-800';

  if (score >= 95) {
    gradientId = 'grad-emerald';
    stopStart = '#34D399';
    stopEnd = '#059669';
    textColor = 'text-emerald-700';
    badgeBg = 'bg-emerald-50 border-emerald-200/80 text-emerald-800';
  } else if (score >= 85) {
    gradientId = 'grad-sky';
    stopStart = '#38BDF8';
    stopEnd = '#0284C7';
    textColor = 'text-sky-700';
    badgeBg = 'bg-sky-50 border-sky-200/80 text-sky-800';
  } else if (score >= 80) {
    gradientId = 'grad-purple';
    stopStart = '#A78BFA';
    stopEnd = '#6D28D9';
    textColor = 'text-purple-700';
    badgeBg = 'bg-purple-50 border-purple-200/80 text-purple-800';
  } else {
    gradientId = 'grad-amber';
    stopStart = '#FBBF24';
    stopEnd = '#D97706';
    textColor = 'text-amber-700';
    badgeBg = 'bg-amber-50 border-amber-200/80 text-amber-800';
  }

  // SVG parameters for ring gauge
  const radius = 32;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      {/* Luminous Circle Gauge */}
      <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0 drop-shadow-xs group-hover:drop-shadow-md transition-all duration-300">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 76 76">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={stopStart} />
              <stop offset="100%" stopColor={stopEnd} />
            </linearGradient>
          </defs>

          {/* Track Ring */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Gradient Ring */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-extrabold text-slate-900 tracking-tight font-sans">
            {score}%
          </span>
        </div>
      </div>

      {/* Similarity Classification pill badge */}
      {classification && (
        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border shadow-2xs ${badgeBg}`}>
          {classification}
        </span>
      )}
    </div>
  );
}
