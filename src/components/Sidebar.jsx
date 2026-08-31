'use client';

import {
  LayoutDashboard, Search, Sparkles, CheckSquare, Database,
  Building2, Upload, TrendingUp, Bell, Settings, MoreVertical,
  Layers, Shield, Hexagon
} from 'lucide-react';
import { AI_ENGINE_STATUS, CURRENT_USER } from '../data/mockData';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Material Search', icon: Search },
    { id: 'ai-matching', label: 'AI Matching', icon: Sparkles },
    { id: 'approvals', label: 'My Approvals', icon: CheckSquare, badge: 8 },
    { id: 'common-codes', label: 'Common Codes', icon: Database },
    { id: 'cpse-mapping', label: 'CPSE Mapping', icon: Building2 },
    { id: 'upload-data', label: 'Upload Data', icon: Upload },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0B132B] text-slate-300 flex flex-col justify-between min-h-screen border-r border-slate-800/60 shadow-xl select-none flex-shrink-0">
      <div>
        {/* Logo & Header */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Hexagon className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-wide leading-tight">
              National
            </h1>
            <h2 className="text-xs font-semibold text-slate-300 tracking-wide leading-tight">
              Material Master
            </h2>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {/* Badge if present */}
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white text-indigo-700'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Active left indicator glow */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-400 rounded-r-full shadow-md shadow-indigo-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="p-3 space-y-3 border-t border-slate-800/80 bg-[#090F23]">
        {/* User Profile Card */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:bg-slate-800/60 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-500/30">
              PY
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-snug">{CURRENT_USER.name}</p>
              <p className="text-[10px] font-medium text-slate-400 leading-none">{CURRENT_USER.role}</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* AI Engine Status Box */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300">AI Engine Status</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {AI_ENGINE_STATUS.status}
            </span>
          </div>

          <div className="flex justify-between text-slate-400 text-[10px] pt-1">
            <span>Model Version</span>
            <span className="font-mono text-slate-200">{AI_ENGINE_STATUS.modelVersion}</span>
          </div>

          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>Last Updated</span>
            <span className="text-slate-300 text-[9.5px]">{AI_ENGINE_STATUS.lastUpdated}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
