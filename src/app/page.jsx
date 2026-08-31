'use client';

import { useState, useMemo } from 'react';
import { Sparkles, ChevronDown, Filter, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import ResultRow from '../components/ResultRow';
import MaterialDetailModal from '../components/MaterialDetailModal';
import DashboardView from '../components/Views/DashboardView';
import AiMatchingView from '../components/Views/AiMatchingView';
import MyApprovalsView from '../components/Views/MyApprovalsView';
import CpseMappingView from '../components/Views/CpseMappingView';
import CommonCodesView from '../components/Views/CommonCodesView';
import UploadDataView from '../components/Views/UploadDataView';
import ReportsAnalyticsView from '../components/Views/ReportsAnalyticsView';
import { INITIAL_MATERIALS } from '../data/mockData';

export default function Home() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('ball bearing 6205');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [sortBy, setSortBy] = useState('best-match');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Search logic & dynamic results
  const filteredMaterials = useMemo(() => {
    if (!searchQuery.trim()) return INITIAL_MATERIALS;

    const queryLower = searchQuery.toLowerCase().trim();
    return INITIAL_MATERIALS.filter((mat) => {
      const haystack = [
        mat.name,
        mat.shortDesc,
        mat.dimensions,
        mat.commonCode,
        mat.cpseMaterialCode,
        mat.cpse,
        ...mat.tags,
        ...Object.values(mat.attributes || {}),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(queryLower) || queryLower.split(/\s+/).some((token) => token.length > 2 && haystack.includes(token));
    });
  }, [searchQuery]);

  // Sort logic
  const sortedMaterials = useMemo(() => {
    const copy = [...filteredMaterials];
    if (sortBy === 'match-score') {
      return copy.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'name') {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'cpse') {
      return copy.sort((a, b) => a.cpse.localeCompare(b.cpse));
    }
    // Default Best Match (by rank)
    return copy.sort((a, b) => a.rank - b.rank);
  }, [filteredMaterials, sortBy]);

  const handleSearch = (query) => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} antialiased font-sans`}>
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Header */}
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Tab 1: Material Search & Match (Main UI matching screenshot) */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Controls Section */}
            <SearchSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
            />

            {/* Error Toggle / Simulation bar if requested */}
            {hasError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>AI Matching Service temporarily busy. Showing cached catalog results.</span>
                </div>
                <button onClick={() => setHasError(false)} className="underline hover:text-rose-900">
                  Dismiss
                </button>
              </div>
            )}

            {/* Results Section Header */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Top Matches Found ({sortedMaterials.length})
                </h2>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-slate-500">Sort by</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <option value="best-match">Best Match</option>
                    <option value="match-score">Highest Match Score</option>
                    <option value="cpse">CPSE Name</option>
                    <option value="name">Material Name</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results List / Loading / Empty States */}
            {isLoading ? (
              /* Loading Skeletons */
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-slate-200" />
                      <div className="w-24 h-24 rounded-xl bg-slate-200" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-200 rounded w-1/2" />
                        <div className="h-3 bg-slate-200 rounded w-1/3" />
                        <div className="h-3 bg-slate-200 rounded w-1/4" />
                      </div>
                    </div>
                    <div className="w-32 h-16 bg-slate-200 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : sortedMaterials.length > 0 ? (
              /* Enterprise Result Rows */
              <div className="space-y-4">
                {sortedMaterials.map((mat) => (
                  <ResultRow
                    key={mat.id}
                    material={mat}
                    onViewDetails={(m) => setSelectedMaterial(m)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3 max-w-md mx-auto my-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">No Matching Materials Found</h3>
                <p className="text-xs text-slate-500 font-medium">
                  We couldn't find exact matches for "{searchQuery}". Try using alternative technical terms or select an example pill.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('ball bearing 6205');
                    handleSearch('ball bearing 6205');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Other Sidebar Navigation Tabs */}
        {activeTab === 'dashboard' && (
          <DashboardView onNavigateSearch={() => setActiveTab('search')} />
        )}
        {activeTab === 'ai-matching' && <AiMatchingView />}
        {activeTab === 'approvals' && <MyApprovalsView />}
        {activeTab === 'cpse-mapping' && <CpseMappingView />}
        {activeTab === 'common-codes' && <CommonCodesView />}
        {activeTab === 'upload-data' && <UploadDataView />}
        {activeTab === 'reports' && <ReportsAnalyticsView />}
        {activeTab === 'notifications' && (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">Notifications Center</h2>
            <p className="text-xs text-slate-500">You have 3 unread AI mapping alerts.</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900">Platform Settings</h2>
            <p className="text-xs text-slate-500">AI Confidence thresholds: 85% Auto-Approval.</p>
          </div>
        )}
      </main>

      {/* Material Specification & AI Detail Modal */}
      {selectedMaterial && (
        <MaterialDetailModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
        />
      )}
    </div>
  );
}
