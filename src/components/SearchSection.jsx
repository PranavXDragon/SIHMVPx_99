'use client';

import { useState } from 'react';
import { Search, Sparkles, X, Lightbulb } from 'lucide-react';
import { EXAMPLE_SEARCHES, SEARCH_TIPS } from '../data/mockData';
import SpecularButton from './SpecularButton';

export default function SearchSection({ searchQuery, setSearchQuery, onSearch, isLoading }) {
  const [activeTab, setActiveTab] = useState('natural');

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleExampleClick = (example) => {
    setSearchQuery(example);
    onSearch(example);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-8 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search Tabs, Input Bar & Examples */}
        <div className="lg:col-span-8 space-y-5">
          {/* Search Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200/70 pb-2.5">
            <button
              onClick={() => setActiveTab('natural')}
              className={`text-sm font-bold pb-2 transition-colors relative ${
                activeTab === 'natural'
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Natural Language Search
              {activeTab === 'natural' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('advanced')}
              className={`text-sm font-bold pb-2 transition-colors relative ${
                activeTab === 'advanced'
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Advanced Search
              {activeTab === 'advanced' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          </div>

          {/* Search Input Box */}
          <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any part/material description, code, or spec..."
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 font-medium text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* SpecularButton from React Bits */}
            <SpecularButton
              type="submit"
              size="md"
              radius={12}
              tint="#4f46e5"
              tintOpacity={0.95}
              textColor="#ffffff"
              lineColor="#a5b4fc"
              baseColor="#3730a3"
              intensity={1.3}
              shineSize={12}
              autoAnimate={true}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-indigo-100" />
              )}
              <span>Search</span>
            </SpecularButton>
          </form>

          {/* Try Examples Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-semibold text-slate-400 mr-1">Try examples:</span>
            {EXAMPLE_SEARCHES.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className="px-3 py-1 bg-slate-100/90 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 border border-slate-200/80 rounded-lg text-xs font-medium transition-all"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Search Tips Box */}
        <div className="lg:col-span-4 bg-sky-50/60 border border-sky-100 rounded-xl p-4.5 space-y-2.5">
          <div className="flex items-center gap-2 text-sky-900">
            <Lightbulb className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900">
              Search Tips
            </h3>
          </div>

          <ul className="space-y-1.5 text-xs text-sky-800/90 leading-relaxed font-normal">
            {SEARCH_TIPS.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
