'use client';

import { Database, Search } from 'lucide-react';
import { INITIAL_MATERIALS } from '../../data/mockData';

export default function CommonCodesView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">National Common Material Codes Registry</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Central standard taxonomy for Indian Central Public Sector Enterprises
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_MATERIALS.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                {m.commonCode}
              </span>
              <span className="text-xs font-semibold text-slate-400">{m.unit}</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">{m.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{m.dimensions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
