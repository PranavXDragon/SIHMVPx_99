'use client';

import { useState } from 'react';
import { Sun, Moon, Bell, HelpCircle } from 'lucide-react';

export default function Header({ isDarkMode, setIsDarkMode }) {
  const [notificationCount] = useState(3);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Material Search & Match
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-0.5">
          Search any part/material and find likely matches across CPSEs
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 self-start sm:self-auto">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80 bg-white shadow-xs"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications Bell */}
        <button className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80 bg-white shadow-xs">
          <Bell className="w-4 h-4 text-slate-600" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Help Icon */}
        <button className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80 bg-white shadow-xs">
          <HelpCircle className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </header>
  );
}
