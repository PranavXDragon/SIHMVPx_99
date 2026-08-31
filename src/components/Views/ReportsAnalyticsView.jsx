'use client';

import { TrendingUp, BarChart3, PieChart, Shield } from 'lucide-react';

export default function ReportsAnalyticsView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Reports & Analytics Overview</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Savings breakdown, duplicate identification rate, and CPSE standardization progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
          <span className="text-xs font-bold text-slate-400">Estimated Inter-CPSE Savings</span>
          <h3 className="text-3xl font-extrabold text-emerald-600">₹ 42.8 Cr</h3>
          <p className="text-xs text-slate-500 font-medium">Prevented duplicate purchases across CPCL & IOCL</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
          <span className="text-xs font-bold text-slate-400">Deadstock Reduction</span>
          <h3 className="text-3xl font-extrabold text-indigo-600">18.4%</h3>
          <p className="text-xs text-slate-500 font-medium">Shared inventory utilization in rotating bearings</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
          <span className="text-xs font-bold text-slate-400">AI Standardization Rate</span>
          <h3 className="text-3xl font-extrabold text-sky-600">94.2%</h3>
          <p className="text-xs text-slate-500 font-medium">Automated resolution without manual review</p>
        </div>
      </div>
    </div>
  );
}
