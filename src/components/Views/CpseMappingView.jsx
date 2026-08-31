'use client';

import { Building2, Search, ArrowRight } from 'lucide-react';
import { CPSE_LIST, INITIAL_MATERIALS } from '../../data/mockData';

export default function CpseMappingView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">CPSE Cross-Mapping Matrix</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Unified material mapping table across CPCL, IOCL, BPCL, NTPC, ONGC, SAIL, HPCL, and MRPL
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80">
              <tr>
                <th className="p-4 font-extrabold text-slate-700">Common Code</th>
                <th className="p-4 font-extrabold text-slate-700">Standardized Name</th>
                <th className="p-4 font-extrabold text-slate-700">CPCL</th>
                <th className="p-4 font-extrabold text-slate-700">IOCL</th>
                <th className="p-4 font-extrabold text-slate-700">BPCL</th>
                <th className="p-4 font-extrabold text-slate-700">NTPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {INITIAL_MATERIALS.slice(0, 4).map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60">
                  <td className="p-4 font-bold text-indigo-600">{m.commonCode}</td>
                  <td className="p-4 font-sans font-bold text-slate-900">{m.name}</td>
                  <td className="p-4 text-slate-700 font-semibold">CPCL-MAT-001245</td>
                  <td className="p-4 text-slate-700 font-semibold">IOCL-PRT-778899</td>
                  <td className="p-4 text-slate-700 font-semibold">BPCL-MAT-332211</td>
                  <td className="p-4 text-slate-700 font-semibold">NTPC-IM-556677</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
