'use client';

import { Building2, Layers, CheckSquare, TrendingUp, Sparkles, ArrowUpRight, Database, ArrowUpRight as ArrowUp, ShieldCheck, Activity, ArrowRight, ExternalLink } from 'lucide-react';
import { CPSE_LIST } from '../../data/mockData';
import SpecularButton from '../SpecularButton';
import CpseLogo from '../CpseLogo';

const RICH_CPSE_DATA = [
  { id: 'CPCL', name: 'Chennai Petroleum Corporation Ltd.', color: '#0284C7', records: '18,420', matchRate: '98.2%', location: 'Chennai, TN', status: 'Live Sync' },
  { id: 'IOCL', name: 'Indian Oil Corporation Ltd.', color: '#D97706', records: '42,800', matchRate: '96.8%', location: 'Vadodara, GJ', status: 'Live Sync' },
  { id: 'BPCL', name: 'Bharat Petroleum Corporation Ltd.', color: '#7C3AED', records: '34,150', matchRate: '95.4%', location: 'Mumbai, MH', status: 'Live Sync' },
  { id: 'HPCL', name: 'Hindustan Petroleum Corporation Ltd.', color: '#16A34A', records: '28,900', matchRate: '94.1%', location: 'Visakhapatnam, AP', status: 'Live Sync' },
  { id: 'ONGC', name: 'Oil & Natural Gas Corporation', color: '#DC2626', records: '39,600', matchRate: '92.8%', location: 'Mumbai High', status: 'Live Sync' },
  { id: 'SAIL', name: 'Steel Authority of India Ltd.', color: '#2563EB', records: '24,500', matchRate: '91.5%', location: 'Bhilai, CG', status: 'Live Sync' },
  { id: 'MRPL', name: 'Mangalore Refinery & Petrochemicals', color: '#4F46E5', records: '15,200', matchRate: '90.2%', location: 'Mangalore, KA', status: 'Live Sync' },
];

export default function DashboardView({ onNavigateSearch }) {
  return (
    <div className="space-y-10 animate-fade-in pb-10">
      {/* Top Banner with SpecularButton */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            National Material Master • AI Standardization Engine
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Universal Material Standardization Across Indian CPSEs
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Search parts using natural language, detect duplicates across CPCL, IOCL, BPCL, HPCL, ONGC, SAIL, MRPL, and assign unified National Material Codes.
          </p>
          <div className="pt-3 flex items-center gap-3">
            <SpecularButton
              size="lg"
              radius={14}
              tint="#6366f1"
              tintOpacity={0.9}
              textColor="#ffffff"
              lineColor="#c7d2fe"
              baseColor="#4338ca"
              intensity={1.2}
              autoAnimate={true}
              onClick={onNavigateSearch}
            >
              <span>Launch Material Search</span>
              <ArrowUpRight className="w-4 h-4" />
            </SpecularButton>
          </div>
        </div>
      </div>

      {/* Dark Enterprise Metrics Bar */}
      <div className="bg-[#0B1222] border border-slate-800 rounded-3xl p-7 shadow-xl text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 gap-6 md:gap-0">
          
          {/* Metric 1 */}
          <div className="md:pr-8 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-extrabold text-slate-200">Total Standardized Catalog Value</h3>
                <p className="text-xs text-slate-400 font-medium">Last 60 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-3xl font-black tracking-tight text-white">₹428.5 Cr</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ArrowUp className="w-3 h-3" /> +14.2%
              </span>
            </div>
            <p className="text-xs font-bold text-emerald-400 pt-1">+₹32.4 Cr vs prev. 60 days</p>
          </div>

          {/* Metric 2 */}
          <div className="md:px-8 pt-4 md:pt-0 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-extrabold text-slate-200">Active CPSE Mapped Materials</h3>
                <p className="text-xs text-slate-400 font-medium">This quarter</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-3xl font-black tracking-tight text-white">82,450</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <ArrowUp className="w-3 h-3" /> +8.2%
              </span>
            </div>
            <p className="text-xs font-bold text-sky-400 pt-1">+4,200 codes vs last quarter</p>
          </div>

          {/* Metric 3 */}
          <div className="md:pl-8 pt-4 md:pt-0 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-extrabold text-slate-200">Duplicate Prevention Accuracy</h3>
                <p className="text-xs text-slate-400 font-medium">Last 30 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-3xl font-black tracking-tight text-white">96.4%</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <ArrowUp className="w-3 h-3" /> +3.1%
              </span>
            </div>
            <p className="text-xs font-bold text-purple-300 pt-1">+2.1% confidence vs prev. 30 days</p>
          </div>

        </div>
      </div>

      {/* Spacious Enterprise CPSE Integrations Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 space-y-6 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Connected Public Sector Enterprises (CPSEs)
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Active enterprise SAP ERP connectors and standardized material catalog feeds across India
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-extrabold border border-emerald-200 shadow-2xs self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>7 Enterprise Gateways Active</span>
          </span>
        </div>

        {/* Spacious 21st.dev Style CPSE Cards Grid with SVG Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RICH_CPSE_DATA.map((cpse) => (
            <div
              key={cpse.id}
              onClick={onNavigateSearch}
              className="group relative bg-gradient-to-br from-white via-slate-50/50 to-slate-100/40 p-6 rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer overflow-hidden"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                style={{ backgroundColor: cpse.color }}
              />

              {/* Card Header: Real SVG Logo + Status */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3.5">
                  <CpseLogo id={cpse.id} className="w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                      {cpse.id}
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
                      {cpse.location}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {cpse.status}
                </span>
              </div>

              {/* Company Full Name */}
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                {cpse.name}
              </p>

              {/* Metrics Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100/90 text-xs">
                <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                    Mapped Items
                  </span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm">
                    {cpse.records}
                  </span>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                    Match Rate
                  </span>
                  <span className="font-extrabold text-emerald-600 font-mono text-sm">
                    {cpse.matchRate}
                  </span>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="flex items-center justify-between text-xs font-black text-indigo-600 pt-1 group-hover:text-indigo-700">
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
