'use client';

import { useState } from 'react';

export default function CpseLogo({ id, className = "w-12 h-12" }) {
  const [imgError, setImgError] = useState(false);

  if (!id) return null;

  const logoPath = `/images/logos/${id.toLowerCase()}.png`;

  // Standard container style
  const containerClass = `${className} rounded-xl border border-slate-200/90 bg-white p-1.5 flex items-center justify-center shadow-xs overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300`;

  if (!imgError) {
    return (
      <div className={containerClass}>
        <img
          src={logoPath}
          alt={`${id} Official Logo`}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Official Vector Fallbacks
  switch (id) {
    case 'IOCL':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#F97316" stroke="#1E3A8A" strokeWidth="3" />
            <circle cx="50" cy="50" r="32" fill="#1E3A8A" />
            <rect x="22" y="44" width="56" height="12" fill="#FFFFFF" rx="2" />
            <text x="50" y="53" fill="#1E3A8A" fontSize="8.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              INDIANOIL
            </text>
            <path d="M50 20 Q56 30 50 36 Q44 30 50 20 Z" fill="#F97316" />
          </svg>
        </div>
      );

    case 'BPCL':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#1E40AF" stroke="#FBBF24" strokeWidth="3" />
            <path d="M50 16 L56 36 L76 30 L62 46 L78 60 L58 60 L50 78 L42 60 L22 60 L38 46 L24 30 L44 36 Z" fill="#FBBF24" />
            <circle cx="50" cy="48" r="14" fill="#1E40AF" />
            <text x="50" y="52" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              BP
            </text>
          </svg>
        </div>
      );

    case 'HPCL':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#047857" stroke="#DC2626" strokeWidth="3" />
            <path d="M22 28 H38 V44 H62 V28 H78 V72 H62 V56 H38 V72 H22 Z" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="50" r="12" fill="#FBBF24" />
            <text x="50" y="54" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              HP
            </text>
          </svg>
        </div>
      );

    case 'ONGC':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="8" y="8" width="84" height="84" rx="14" fill="#DC2626" />
            <path d="M50 18 L68 62 H32 Z" fill="#FBBF24" />
            <path d="M50 28 L60 62 H40 Z" fill="#FFFFFF" />
            <rect x="24" y="66" width="52" height="14" rx="3" fill="#FFFFFF" />
            <text x="50" y="77" fill="#DC2626" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              ONGC
            </text>
          </svg>
        </div>
      );

    case 'CPCL':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="12 6" />
            <rect x="36" y="30" width="10" height="34" fill="#FFFFFF" />
            <rect x="54" y="24" width="10" height="40" fill="#FFFFFF" />
            <polygon points="41,20 46,30 36,30" fill="#F97316" />
            <polygon points="59,14 64,24 54,24" fill="#F97316" />
            <text x="50" y="78" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              CPCL
            </text>
          </svg>
        </div>
      );

    case 'SAIL':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="8" y="8" width="84" height="84" rx="14" fill="#1D4ED8" />
            <polygon points="50,20 80,70 20,70" fill="#F97316" />
            <polygon points="50,34 70,68 30,68" fill="#FFFFFF" />
            <text x="50" y="60" fill="#1D4ED8" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              SAIL
            </text>
          </svg>
        </div>
      );

    case 'MRPL':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="3" />
            <path d="M50 20 C65 35 70 50 50 74 C30 50 35 35 50 20 Z" fill="#38BDF8" />
            <path d="M50 34 C58 44 60 54 50 66 C40 54 42 44 50 34 Z" fill="#FBBF24" />
            <text x="50" y="80" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              MRPL
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={containerClass}>
          <span className="font-extrabold text-xs text-slate-800">{id}</span>
        </div>
      );
  }
}
