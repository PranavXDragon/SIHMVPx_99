'use client';

import { ChevronRight, MoreVertical, Sparkles, Building2 } from 'lucide-react';
import MatchScoreRing from './MatchScoreRing';

export default function ResultRow({ material, onViewDetails }) {
  if (!material) return null;

  const isFirst = material.rank === 1 || material.isBestMatch;

  return (
    <div className="relative group bg-gradient-to-r from-white via-slate-50/30 to-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 p-5.5 overflow-hidden">
      
      {/* Left Hover Accent Glow Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Section: Rank + Product Image + Info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Rank Number Badge */}
          <div
            className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center flex-shrink-0 mt-1 shadow-xs transition-all duration-300 group-hover:scale-105 ${
              isFirst
                ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-indigo-600 text-white shadow-md shadow-amber-500/25 border border-amber-300/60'
                : 'bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/70 text-indigo-900 border border-slate-200/80'
            }`}
          >
            {material.rank}
          </div>

          {/* Material Image Box */}
          <div className="w-24 h-24 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/50 p-2 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:border-indigo-200 group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <img
              src={material.image}
              alt={material.name}
              className="w-full h-full object-contain rounded-lg transform group-hover:scale-110 transition-transform duration-300 ease-out"
            />
          </div>

          {/* Title, Specs & Tag Pills */}
          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Best Match Badge (if applicable) */}
            {material.isBestMatch && (
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-xs shadow-emerald-500/20 mb-1">
                <Sparkles className="w-3 h-3 text-emerald-100" />
                <span>Best Match</span>
              </div>
            )}

            {/* Material Name */}
            <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug truncate group-hover:text-indigo-600 transition-colors duration-200">
              {material.name}
            </h3>

            {/* Short Description */}
            <p className="text-xs font-semibold text-slate-500">
              {material.shortDesc}
            </p>

            {/* Dimensional Specifications */}
            <p className="text-xs font-bold text-slate-700 font-mono tracking-tight bg-slate-100/80 hover:bg-slate-100 px-2 py-0.5 rounded-md inline-block border border-slate-200/60">
              {material.dimensions}
            </p>

            {/* Specification Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {material.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold bg-gradient-to-r from-sky-50 to-indigo-50/90 text-indigo-700 border border-indigo-200/60 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section: CPSE Detail Metadata Card */}
        <div className="lg:w-64 bg-gradient-to-br from-slate-50/90 via-white to-slate-50/60 p-4 rounded-xl border border-slate-200/80 shadow-2xs group-hover:border-indigo-200/80 group-hover:shadow-xs transition-all duration-300 space-y-1.5 text-xs">
          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">From CPSE</span>
            <span
              className="px-2.5 py-0.5 rounded-md text-xs font-black shadow-2xs border"
              style={{
                color: material.cpseColor || '#0284C7',
                backgroundColor: (material.cpseColor || '#0284C7') + '12',
                borderColor: (material.cpseColor || '#0284C7') + '33',
              }}
            >
              {material.cpse}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Material Code</span>
            <span className="font-mono font-extrabold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200/70 shadow-2xs">
              {material.cpseMaterialCode}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Common Code</span>
            <span className="font-mono font-extrabold text-indigo-700 bg-indigo-50/80 px-1.5 py-0.5 rounded border border-indigo-100">
              {material.commonCode}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Unit</span>
            <span className="font-extrabold text-slate-800">{material.unit}</span>
          </div>
        </div>

        {/* Right Section: Match Score Gauge & View Details */}
        <div className="flex items-center justify-between lg:justify-end gap-5 border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Match Score
            </span>
            <MatchScoreRing
              score={material.matchScore}
              classification={material.similarityClass}
            />
          </div>

          {/* Action Menu & View Details Link */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(material)}
              className="group/btn inline-flex items-center gap-1.5 text-xs font-black text-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-600 hover:to-purple-600 hover:text-white px-4 py-2.5 rounded-xl transition-all duration-200 border border-indigo-200/70 hover:border-indigo-600 shadow-2xs hover:shadow-md hover:shadow-indigo-500/25 cursor-pointer"
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </button>

            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/60 bg-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
