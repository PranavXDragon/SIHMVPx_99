'use client';

import { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard, Search, Upload, Copy, ClipboardList,
  Building2, Layers, Plus, Send, Mic, Paperclip,
  CheckCircle2, XCircle, AlertTriangle, ArrowRight,
  ExternalLink, Loader2, FileSpreadsheet, RotateCcw,
  Settings, Bell, Sun, Menu, ChevronDown, Shield,
  TrendingUp, Package, ShoppingCart, CheckSquare,
  Filter, ChevronRight, Database, Star, Eye, Download,
} from 'lucide-react';
import {
  MATERIALS, COMPANIES, REVIEW_ITEMS, STATS, RECENT, SUGGESTIONS, doSearch,
} from '../data/mockData';

// ─────────────────────────────────────────────────────────────
// SMALL ATOMS
// ─────────────────────────────────────────────────────────────

const getTime = () => {
  if (typeof window === 'undefined') return '';
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function Badge({ type }) {
  const cfg = {
    EXACT:    'bg-green-50 text-green-700 border-green-200',
    PROBABLE: 'bg-blue-50 text-blue-700 border-blue-200',
    REVIEW:   'bg-amber-50 text-amber-700 border-amber-200',
    CONFLICT: 'bg-red-50 text-red-700 border-red-200',
    NEW:      'bg-purple-50 text-purple-700 border-purple-200',
    VERIFIED: 'bg-green-50 text-green-700 border-green-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg[type] || cfg.PROBABLE}`}>
      {type}
    </span>
  );
}

function CpseTag({ id }) {
  const co = COMPANIES.find(c => c.id === id);
  const color = co?.color || '#64748B';
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border"
      style={{ color, borderColor: color + '44', background: color + '11' }}>
      {id}
    </span>
  );
}

function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function Btn({ children, variant = 'primary', onClick, disabled, className = '', size = 'md' }) {
  const base = 'inline-flex items-center gap-1.5 font-semibold rounded-lg transition-colors disabled:opacity-40';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-sm' };
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700',
    danger: 'bg-white border border-red-200 hover:bg-red-50 text-red-600',
    ghost: 'hover:bg-slate-100 text-slate-600',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function ProgressBar({ value, color = 'bg-green-500' }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-bold text-slate-900">{value}%</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MATERIAL RESULT CARD
// ─────────────────────────────────────────────────────────────

function MaterialResultCard({ mat, onViewDetail }) {
  if (!mat) return null;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3.5 border-b border-slate-100">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-slate-900 truncate">{mat.name}</span>
            <Badge type={mat.matchType} />
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
            <span>Common Material Code:</span>
            <span className="font-bold text-blue-600 font-mono">{mat.umc}</span>
          </div>
        </div>
        <Btn variant="secondary" size="sm" onClick={() => onViewDetail && onViewDetail(mat)}>
          View Details <ExternalLink className="w-3 h-3" />
        </Btn>
      </div>

      {/* Three panels */}
      <div className="grid grid-cols-12 divide-x divide-slate-100">
        {/* Equivalent table */}
        <div className="col-span-6 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2.5">
            Equivalent Materials Across CPSEs
          </p>
          <table className="w-full">
            <thead>
              <tr>
                {['CPSE','Legacy Code','Description','Match %'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 pb-2 pr-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mat.companies.map((co, i) => (
                <tr key={i} className={i > 0 ? 'border-t border-slate-50' : ''}>
                  <td className="py-1.5 pr-2"><CpseTag id={co.id} /></td>
                  <td className="py-1.5 pr-2 font-mono text-xs text-slate-600">{co.code}</td>
                  <td className="py-1.5 pr-2 text-xs text-slate-500 max-w-[100px] truncate">{co.desc}</td>
                  <td className="py-1.5 font-bold text-green-600 text-sm">{co.match}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attributes */}
        <div className="col-span-4 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2.5">Technical Attributes</p>
          <div className="space-y-1.5">
            {Object.entries(mat.attributes).slice(0, 6).map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs gap-2">
                <span className="text-slate-500 w-28 flex-shrink-0 truncate">{k}</span>
                <span className="font-medium text-slate-900 text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="col-span-2 p-4 flex flex-col items-center gap-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide self-start">Image</p>
          {mat.image ? (
            <img src={mat.image} alt={mat.name} className="w-full max-h-24 object-contain rounded-lg border border-slate-100" />
          ) : (
            <div className="w-full h-20 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-slate-300" />
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 divide-x divide-slate-100 border-t border-slate-100">
        {[
          { icon: <Building2 className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50', val: mat.companies.length, lbl: 'CPSEs Using\nThis Material', c: '' },
          { icon: <TrendingUp className="w-4 h-4 text-green-500" />, bg: 'bg-green-50', val: `${mat.highestMatch}%`, lbl: 'Highest Match\nScore', c: 'text-green-600' },
          { icon: <Package className="w-4 h-4 text-orange-500" />, bg: 'bg-orange-50', val: mat.demand.toLocaleString(), lbl: 'Total Demand\n(Units)', c: 'text-orange-500' },
          { icon: <ShoppingCart className="w-4 h-4 text-purple-500" />, bg: 'bg-purple-50', val: mat.procurement, lbl: 'Procurement\nOpportunity', c: 'text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 p-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${s.bg}`}>{s.icon}</div>
            <div>
              <div className={`text-lg font-bold leading-tight ${s.c}`}>{s.val}</div>
              <div className="text-[10px] text-slate-400 leading-tight whitespace-pre-line">{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MATERIAL DETAIL MODAL
// ─────────────────────────────────────────────────────────────

function MaterialDetailModal({ mat, onClose }) {
  if (!mat) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <span className="font-mono text-sm font-bold text-blue-600">{mat.umc}</span>
            <h2 className="text-lg font-bold text-slate-900">{mat.name}</h2>
          </div>
          <Btn variant="ghost" size="sm" onClick={onClose}><XCircle className="w-5 h-5" /></Btn>
        </div>
        <div className="p-6 space-y-6">
          {/* Attributes */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" /> Material DNA
            </h3>
            <div className="divide-y divide-slate-50">
              {Object.entries(mat.attributes).map(([k, v]) => (
                <div key={k} className="flex items-center gap-4 py-2.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase w-32 flex-shrink-0">{k}</span>
                  <span className="text-sm font-medium text-slate-900">{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Critical */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" /> Critical Attributes
            </h3>
            <div className="flex flex-wrap gap-2">
              {mat.critical.map(a => (
                <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-xs font-medium text-green-700">
                  <CheckCircle2 className="w-3 h-3" /> {a}
                </span>
              ))}
            </div>
          </div>
          {/* Companies */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Connected Company Records ({mat.companies.length})</h3>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 rounded-lg">
                <tr>
                  {['Company','Code','Description','Confidence','Status'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-400 first:rounded-tl-lg last:rounded-tr-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mat.companies.map((co, i) => (
                  <tr key={i} className="border-t border-slate-50">
                    <td className="px-4 py-3"><CpseTag id={co.id} /></td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{co.code}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[180px] truncate">{co.desc}</td>
                    <td className="px-4 py-3"><ProgressBar value={co.match} /></td>
                    <td className="px-4 py-3"><Badge type="EXACT" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAT TAB
// ─────────────────────────────────────────────────────────────

function ChatTab({ onViewDetail }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  async function send(query) {
    const q = (query || input).trim();
    if (!q) return;
    setStarted(true);
    setInput('');
    const t = getTime();
    setMsgs(m => [...m, { role: 'user', text: q, time: t }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 1200));
    setTyping(false);
    const results = doSearch(q);
    const aiTime = getTime();
    if (results.length > 0) {
      setMsgs(m => [...m, {
        role: 'ai',
        text: `Found ${results.length} equivalent material${results.length > 1 ? 's' : ''} across CPSEs. Here's the best match:`,
        cards: results.slice(0, 2),
        time: aiTime,
      }]);
    } else {
      setMsgs(m => [...m, {
        role: 'ai',
        text: `I couldn't find a match for "${q}". Try a company code like MAT-10234, a UMC like UMC-0000001, or a description like "Ball Valve SS316 2 inch PN16".`,
        time: aiTime,
      }]);
    }
  }

  const BotIcon = () => (
    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
      <Database className="w-4 h-4 text-white" />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {!started && (
            <div>
              <div className="flex items-start gap-3 mb-4">
                <BotIcon />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Hello! How can I help you today? 👋</h2>
                  <p className="text-sm text-slate-500 mt-1">Search for materials by UMC code, company code, or description. I'll find cross-CPSE equivalents instantly.</p>
                </div>
              </div>
              <div className="ml-12 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => send(s)}
                    className="px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-all shadow-sm text-left">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {msgs.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-3'}`}>
              {msg.role === 'ai' && <BotIcon />}
              <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end max-w-sm' : 'flex-1 min-w-0'}`}>
                {msg.text && (
                  <div className={msg.role === 'user'
                    ? 'bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed'
                    : 'bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm text-slate-800 shadow-sm w-fit'}>
                    {msg.text}
                  </div>
                )}
                <span className="text-xs text-slate-400 px-1">{msg.time}</span>
                {msg.cards && msg.cards.map((card, j) => (
                  <div key={j} className="w-full mt-1">
                    <MaterialResultCard mat={card} onViewDetail={onViewDetail} />
                  </div>
                ))}
                {msg.role === 'ai' && (
                  <div className="flex gap-2 px-1 mt-0.5">
                    {['👍','👎','📋','🔄'].map((e, j) => (
                      <button key={j} className="text-base hover:scale-110 transition-transform" title={['Helpful','Not helpful','Copy','Regenerate'][j]}>{e}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-end gap-3">
              <BotIcon />
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-slate-400 dot-1" />
                <span className="w-2 h-2 rounded-full bg-slate-400 dot-2" />
                <span className="w-2 h-2 rounded-full bg-slate-400 dot-3" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <button className="text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything about materials..."
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              disabled={typing} />
            <button onClick={() => send()} disabled={typing || !input.trim()}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0">
              {input.trim() ? <Send className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">Click a suggestion above or type your query. Press Enter to send.</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD TAB
// ─────────────────────────────────────────────────────────────

function DashboardTab({ setTab }) {
  const [searchQ, setSearchQ] = useState('');
  const [quickResults, setQuickResults] = useState([]);

  function handleDashSearch(e) {
    e.preventDefault();
    if (searchQ.trim()) setTab('search');
  }

  const tiles = [
    { icon: <Database className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50', val: STATS.totalRecords.toLocaleString(), lbl: 'Company Records', tab: null },
    { icon: <Layers className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50', val: STATS.universalMaterials.toLocaleString(), lbl: 'Universal Materials', tab: 'search' },
    { icon: <Building2 className="w-5 h-5 text-teal-600" />, bg: 'bg-teal-50', val: STATS.companies, lbl: 'Connected CPSEs', tab: 'companies' },
    { icon: <CheckCircle2 className="w-5 h-5 text-green-600" />, bg: 'bg-green-50', val: STATS.exactMappings.toLocaleString(), lbl: 'Exact Mappings', c: 'text-green-600', tab: null },
    { icon: <ClipboardList className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50', val: STATS.reviewRequired, lbl: 'Review Required', c: 'text-amber-600', tab: 'review' },
    { icon: <Plus className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50', val: STATS.newUMCs, lbl: 'New UMCs This Month', tab: null },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">National overview across all connected CPSEs.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {tiles.map((t, i) => (
          <Card key={i}
            className={`flex items-center gap-4 p-4 ${t.tab ? 'hover:border-blue-300' : ''}`}
            onClick={t.tab ? () => setTab(t.tab) : undefined}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.bg}`}>{t.icon}</div>
            <div>
              <div className={`text-2xl font-bold ${t.c || 'text-slate-900'}`}>{t.val}</div>
              <div className="text-sm text-slate-500">{t.lbl}</div>
              {t.tab && <div className="text-xs text-blue-500 mt-0.5">Click to view →</div>}
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="p-5">
        <p className="text-sm font-semibold text-slate-700 mb-2">Quick Material Search</p>
        <form onSubmit={handleDashSearch} className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)}
              placeholder="Company Code, UMC, Description, Model or Part Number…"
              className="flex-1 bg-transparent text-sm placeholder-slate-400 focus:outline-none" />
          </div>
          <Btn type="submit" variant="primary">Search</Btn>
        </form>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent */}
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Recent Standardization Activity</h2>
            <Btn variant="ghost" size="sm" onClick={() => setTab('search')}>View all <ChevronRight className="w-3 h-3" /></Btn>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {['Company','Code','Match','Confidence','Time'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r, i) => (
                <tr key={i} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-blue-600 text-xs">{r.company}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-600">{r.code}</td>
                  <td className="px-4 py-2.5"><Badge type={r.type} /></td>
                  <td className="px-4 py-2.5"><ProgressBar value={r.conf} color={r.conf >= 90 ? 'bg-green-500' : r.conf >= 75 ? 'bg-blue-500' : 'bg-amber-500'} /></td>
                  <td className="px-4 py-2.5 text-xs text-slate-400">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Top Materials */}
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Universal Materials</h2>
            <Btn variant="ghost" size="sm" onClick={() => setTab('search')}>View all <ChevronRight className="w-3 h-3" /></Btn>
          </div>
          <div className="divide-y divide-slate-50">
            {MATERIALS.slice(0, 5).map(mat => (
              <div key={mat.umc} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{mat.name}</p>
                  <p className="text-xs text-slate-400 font-mono">{mat.umc} · {mat.companies.length} CPSEs · {mat.demand.toLocaleString()} units</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className="font-bold text-green-600 text-sm">{mat.highestMatch}%</span>
                  <Badge type={mat.matchType} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SEARCH TAB
// ─────────────────────────────────────────────────────────────

function SearchTab({ onViewDetail }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MATERIALS);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [matchFilter, setMatchFilter] = useState('All');
  const [cpseFilter, setCpseFilter] = useState('All');
  const [searched, setSearched] = useState(false);

  const categories = ['All', ...new Set(MATERIALS.map(m => m.category))];
  const matchTypes = ['All', 'EXACT', 'PROBABLE', 'REVIEW'];
  const cpses = ['All', ...COMPANIES.map(c => c.id)];

  function handleSearch() {
    setSearched(true);
    let res = query.trim() ? doSearch(query) : [...MATERIALS];
    if (categoryFilter !== 'All') res = res.filter(m => m.category === categoryFilter);
    if (matchFilter !== 'All') res = res.filter(m => m.matchType === matchFilter);
    if (cpseFilter !== 'All') res = res.filter(m => m.companies.some(c => c.id === cpseFilter));
    setResults(res);
  }

  function clearFilters() {
    setQuery('');
    setCategoryFilter('All');
    setMatchFilter('All');
    setCpseFilter('All');
    setResults(MATERIALS);
    setSearched(false);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Universal Search</h1>
        <p className="text-sm text-slate-500 mt-1">Search by Company Code, UMC, Description, Model or Part Number</p>
      </div>

      <Card className="p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. ONGC-VAL-7821, UMC-0000001, Ball Valve SS316, BRG-001…"
          className="flex-1 text-sm text-slate-900 placeholder-slate-400 focus:outline-none" />
        <Btn variant="primary" onClick={handleSearch}>Search</Btn>
        {searched && <Btn variant="ghost" size="sm" onClick={clearFilters}><XCircle className="w-4 h-4" /></Btn>}
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-slate-400" />
        {[
          { label: 'Category', val: categoryFilter, set: setCategoryFilter, opts: categories },
          { label: 'Match Type', val: matchFilter, set: setMatchFilter, opts: matchTypes },
          { label: 'CPSE', val: cpseFilter, set: setCpseFilter, opts: cpses },
        ].map(f => (
          <select key={f.label} value={f.val} onChange={e => f.set(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-400 bg-white">
            {f.opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        <span className="text-xs text-slate-400 ml-auto">{results.length} result{results.length !== 1 ? 's' : ''}</span>
      </div>

      {results.length === 0 && (
        <Card className="p-12 text-center">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No materials found</p>
          <p className="text-sm text-slate-400 mt-1">Try a different search term or clear filters</p>
          <Btn variant="secondary" className="mt-4 mx-auto" onClick={clearFilters}>Clear All Filters</Btn>
        </Card>
      )}

      <div className="space-y-4">
        {results.map(mat => (
          <Card key={mat.umc} className="overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">UNIVERSAL MATERIAL CODE</p>
                  <p className="font-mono text-sm font-bold text-blue-600">{mat.umc}</p>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{mat.name}</h3>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs border border-slate-200 px-2 py-0.5 rounded text-slate-500">{mat.category}</span>
                    <Badge type="VERIFIED" />
                    <Badge type={mat.matchType} />
                  </div>
                </div>
                <Btn variant="primary" size="sm" onClick={() => onViewDetail(mat)}>
                  <Eye className="w-3.5 h-3.5" /> View Full Record
                </Btn>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">CONNECTED COMPANY MATERIALS ({mat.companies.length})</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr>
                      {['Company','Material Code','Original Description','Match Type','Confidence'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-slate-400 pb-2 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mat.companies.map((co, i) => (
                      <tr key={i} className="border-t border-slate-50">
                        <td className="py-2 pr-4"><CpseTag id={co.id} /></td>
                        <td className="py-2 pr-4 font-mono text-xs text-slate-600">{co.code}</td>
                        <td className="py-2 pr-4 text-xs text-slate-500 max-w-[200px] truncate">{co.desc}</td>
                        <td className="py-2 pr-4"><Badge type={mat.matchType} /></td>
                        <td className="py-2"><ProgressBar value={co.match} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// UPLOAD TAB
// ─────────────────────────────────────────────────────────────

const STAGES = ['Uploaded','Validating Columns','AI Processing','Extracting Attributes','Matching with UMC','Creating Mappings','Completed'];
const MOCK_COLS = [
  { field: 'Company Material Code', mapped: 'Material_Code', status: 'ok' },
  { field: 'Item Description', mapped: 'Item_Description', status: 'ok' },
  { field: 'Quantity / UOM', mapped: 'Quantity + Units', status: 'warning' },
  { field: 'Unit Price', mapped: 'Not Mapped', status: 'error' },
];

function UploadTab() {
  const [company, setCompany] = useState('IOCL');
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(0);
  const [drag, setDrag] = useState(false);
  const [fileName, setFileName] = useState('');

  function startProcess() {
    setStep(2); setStage(1);
    let s = 1;
    const iv = setInterval(() => {
      s++;
      setStage(s);
      if (s >= STAGES.length) { clearInterval(iv); setTimeout(() => setStep(3), 500); }
    }, 650);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer?.files?.[0];
    setFileName(file?.name || 'materials_data.xlsx');
    setStep(1);
  }

  if (step === 3) return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="p-10 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Standardization Complete!</h2>
          <p className="text-sm text-slate-500 mt-1">All records processed, standardized, and mapped to UMCs.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[['1,240','Total Processed','text-slate-900'],['1,071','Exact Mapped','text-green-600'],['169','Need Review','text-amber-600']].map(([v,l,c],i)=>(
            <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className={`text-2xl font-bold ${c}`}>{v}</div>
              <div className="text-xs text-slate-400 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <Btn variant="secondary" onClick={() => { setStep(0); setStage(0); setFileName(''); }}>
            <RotateCcw className="w-4 h-4" /> Upload Another
          </Btn>
          <Btn variant="primary"><Download className="w-4 h-4" /> Download Report</Btn>
        </div>
      </Card>
    </div>
  );

  if (step === 2) return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="p-6 space-y-4">
        <h2 className="text-base font-semibold text-slate-900">Processing {fileName || 'materials_data.xlsx'}…</h2>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${Math.round((stage / STAGES.length) * 100)}%` }} />
        </div>
        <p className="text-xs text-slate-400 text-right">{Math.round((stage / STAGES.length) * 100)}% complete</p>
        <div className="space-y-2.5">
          {STAGES.map((s, i) => {
            const idx = i + 1;
            const done = idx < stage, active = idx === stage;
            return (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                  done ? 'bg-green-50 border border-green-200 text-green-600' :
                  active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : active ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : idx}
                </div>
                <span className={`text-sm transition-all ${done ? 'text-slate-400 line-through' : active ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>{s}</span>
                {done && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 ml-auto" />}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  if (step === 1) return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="p-6 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Column Mapping Preview</h2>
          <p className="text-sm text-slate-500 mt-1">Detected columns in <span className="font-mono font-bold">{fileName || 'materials_data.xlsx'}</span>. Review before processing.</p>
        </div>
        <div className="space-y-2">
          {MOCK_COLS.map((c, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${
              c.status === 'ok' ? 'bg-green-50 border-green-200' :
              c.status === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
            }`}>
              {c.status === 'ok' ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> :
               c.status === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" /> :
               <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
              <span className="font-mono text-xs flex-1 text-slate-700">{c.field}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span className="font-mono text-xs font-bold text-slate-900">{c.mapped}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Btn variant="secondary" onClick={() => setStep(0)}>Back</Btn>
          <Btn variant="primary" className="flex-1 justify-center" onClick={startProcess}>
            <ArrowRight className="w-4 h-4" /> Start Standardization
          </Btn>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Upload Company Material Data</h1>
        <p className="text-sm text-slate-500 mt-1">Upload CSV or XLSX for AI standardization and UMC mapping.</p>
      </div>
      <Card className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Company</label>
          <select value={company} onChange={e => setCompany(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
            {COMPANIES.map(c => <option key={c.id} value={c.id}>{c.id} — {c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Material Data File</label>
          <div onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDrop}
            onClick={() => { setFileName('materials_data.xlsx'); setStep(1); }}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
              drag ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
            }`}>
            <FileSpreadsheet className={`w-10 h-10 mx-auto mb-3 ${drag ? 'text-blue-500' : 'text-slate-300'}`} />
            <p className="text-sm font-semibold text-slate-700">Drop XLSX or CSV here</p>
            <p className="text-xs text-slate-400 mt-1">or click to browse · max 50 MB</p>
            <div className="flex justify-center gap-3 mt-4">
              {['XLSX','CSV','XLS'].map(f => (
                <span key={f} className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs rounded-md font-mono">.{f.toLowerCase()}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DUPLICATES TAB
// ─────────────────────────────────────────────────────────────

function DuplicatesTab({ onViewDetail }) {
  const [open, setOpen] = useState(null);
  const [compFilter, setCompFilter] = useState('All');

  const filtered = compFilter === 'All' ? MATERIALS :
    MATERIALS.filter(m => m.companies.some(c => c.id === compFilter));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Duplicate Explorer</h1>
          <p className="text-sm text-slate-500 mt-1">UMC groups showing identical materials used across multiple CPSEs.</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select value={compFilter} onChange={e => setCompFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 focus:outline-none bg-white">
            <option>All</option>
            {COMPANIES.map(c => <option key={c.id}>{c.id}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(mat => (
          <Card key={mat.umc} className="overflow-hidden" onClick={() => setOpen(open === mat.umc ? null : mat.umc)}>
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold text-blue-600">{mat.umc}</p>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">{mat.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs border border-slate-200 px-2 py-0.5 rounded text-slate-500">{mat.category}</span>
                    <Badge type={mat.matchType} />
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${open === mat.umc ? 'rotate-180' : ''}`} />
              </div>
            </div>

            <div className="px-5 py-3 flex gap-6 text-sm">
              <div><span className="font-bold text-slate-900">{mat.companies.length}</span> <span className="text-xs text-slate-400">CPSEs</span></div>
              <div><span className="font-bold text-green-600">{mat.highestMatch}%</span> <span className="text-xs text-slate-400">Highest match</span></div>
              <div><span className="font-bold text-slate-900">{mat.demand.toLocaleString()}</span> <span className="text-xs text-slate-400">units demand</span></div>
              <div className="ml-auto">
                <Btn variant="ghost" size="sm" onClick={e => { e.stopPropagation(); onViewDetail(mat); }}>
                  <Eye className="w-3.5 h-3.5" /> View
                </Btn>
              </div>
            </div>

            {open === mat.umc && (
              <div className="px-5 pb-5">
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-4 text-center">Company Connection Topology</p>
                  <div className="flex flex-col items-center">
                    <div className="px-4 py-2 bg-blue-600 text-white text-xs font-bold font-mono rounded-xl shadow-sm">{mat.umc}</div>
                    <div className="w-px h-4 bg-slate-300" />
                    <div className="flex flex-wrap justify-center gap-3">
                      {mat.companies.map((co, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className="w-px h-4 bg-slate-300" />
                          <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-center">
                            <p className="text-xs font-bold text-blue-600">{co.id}</p>
                            <p className="text-[10px] font-mono text-slate-400">{co.code}</p>
                            <p className="text-[10px] font-bold text-green-600 mt-0.5">{co.match}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400">Demand</p>
                    <p className="font-bold text-slate-900">{mat.demand.toLocaleString()} units</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400">Procurement</p>
                    <p className="font-bold text-slate-900">{mat.procurement}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// REVIEW TAB
// ─────────────────────────────────────────────────────────────

function ReviewTab() {
  const [items, setItems] = useState(REVIEW_ITEMS.map(i => ({ ...i, state: 'pending' })));
  const [notes, setNotes] = useState({});

  function act(id, action) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, state: action } : i));
  }

  const pending = items.filter(i => i.state === 'pending');
  const done = items.filter(i => i.state !== 'pending');

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Queue</h1>
          <p className="text-sm text-slate-500 mt-1">Ambiguous records that need domain expert review.</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-700">
            <AlertTriangle className="w-3.5 h-3.5" /> {pending.length} Pending
          </span>
          {done.length > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-bold text-green-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> {done.length} Reviewed
            </span>
          )}
        </div>
      </div>

      {pending.map(item => (
        <Card key={item.id} className="overflow-hidden">
          <div className="px-5 py-3.5 border-b border-amber-100 bg-amber-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">REVIEW REQUIRED</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-600">{item.confidence}% AI confidence</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <CpseTag id={item.company} /> <span>{item.code}</span>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Raw Company Input</p>
              <p className="font-mono text-sm font-bold text-slate-900 mb-3">{item.raw}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Extracted Attributes</p>
              <div className="space-y-1.5">
                {Object.entries(item.extracted).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 w-28 flex-shrink-0">{k}:</span>
                    <span className={`font-semibold ${v === '—' || v === '?' ? 'text-red-500' : 'text-slate-900'}`}>{v}</span>
                    {(v === '—' || v === '?') && <span className="text-[10px] text-red-400">(missing)</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">AI Suggested UMC</p>
              <p className="font-mono text-sm font-bold text-blue-600">{item.candidateUmc}</p>
              <p className="text-sm text-slate-700 mt-1 font-medium">{item.candidateDesc}</p>

              <div className="mt-3 mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">AI Confidence</span>
                  <span className={`font-bold ${item.confidence >= 80 ? 'text-blue-600' : item.confidence >= 65 ? 'text-amber-600' : 'text-red-500'}`}>{item.confidence}%</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden border border-blue-200">
                  <div className={`h-full rounded-full ${item.confidence >= 80 ? 'bg-blue-500' : item.confidence >= 65 ? 'bg-amber-400' : 'bg-red-400'}`}
                    style={{ width: `${item.confidence}%` }} />
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-400 uppercase mb-1.5">Missing Critical Fields</p>
              {item.missing.map(f => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-red-600 mb-1">
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 pb-5">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Reviewer Notes (optional)</label>
            <textarea
              value={notes[item.id] || ''}
              onChange={e => setNotes(n => ({ ...n, [item.id]: e.target.value }))}
              placeholder="Add context or justification for your decision…"
              rows={2}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 resize-none mb-3"
            />
            <div className="flex flex-wrap gap-3">
              <Btn variant="primary" onClick={() => act(item.id, 'approved')}>
                <CheckCircle2 className="w-4 h-4" /> Approve Mapping
              </Btn>
              <Btn variant="danger" onClick={() => act(item.id, 'rejected')}>
                <XCircle className="w-4 h-4" /> Reject
              </Btn>
              <Btn variant="secondary" onClick={() => act(item.id, 'new_umc')}>
                <Plus className="w-4 h-4" /> Create New UMC
              </Btn>
            </div>
          </div>
        </Card>
      ))}

      {done.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Reviewed Items</p>
          {done.map(item => (
            <div key={item.id} className={`flex items-center gap-4 p-4 rounded-xl border mb-2 ${
              item.state === 'approved' ? 'bg-green-50 border-green-200' :
              item.state === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-indigo-50 border-indigo-200'
            }`}>
              {item.state === 'approved' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
               item.state === 'rejected' ? <XCircle className="w-5 h-5 text-red-600" /> :
               <Plus className="w-5 h-5 text-indigo-600" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{item.raw}</p>
                <p className="text-xs text-slate-500">{item.company} · {item.code} → {item.candidateUmc}</p>
              </div>
              <Badge type={item.state === 'approved' ? 'EXACT' : item.state === 'rejected' ? 'CONFLICT' : 'NEW'} />
              <Btn variant="ghost" size="sm" onClick={() => act(item.id, 'pending')}>Undo</Btn>
            </div>
          ))}
        </div>
      )}

      {pending.length === 0 && done.length === REVIEW_ITEMS.length && (
        <Card className="p-10 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
          <p className="text-lg font-bold text-slate-900">All items reviewed!</p>
          <p className="text-sm text-slate-500">No pending items in the review queue.</p>
        </Card>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPANIES TAB
// ─────────────────────────────────────────────────────────────

function CompaniesTab({ onViewDetail }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const co = selected;
    const mats = MATERIALS.filter(m => m.companies.some(c => c.id === co.id));
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-5">
        <Btn variant="ghost" onClick={() => setSelected(null)}>
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Companies
        </Btn>
        <Card className="p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ background: co.color }}>{co.id[0]}</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{co.id}</h1>
            <p className="text-sm text-slate-500">{co.name}</p>
            <p className="text-xs text-slate-400 mt-1">{mats.length} UMC mappings · {(mats.length * 1200).toLocaleString()} records</p>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Material Catalog & UMC Mappings</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {['Company Code','Description','Mapped UMC','Standard Name','Match %'].map(h => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mats.map(mat => {
                const row = mat.companies.find(c => c.id === co.id);
                return (
                  <tr key={mat.umc} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate-600">{row?.code}</td>
                    <td className="px-5 py-3 text-xs text-slate-500 max-w-[160px] truncate">{row?.desc}</td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs text-blue-600 font-bold">{mat.umc}</span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700 font-medium">{mat.name}</td>
                    <td className="px-5 py-3"><ProgressBar value={row?.match || 0} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }

  const rows = COMPANIES.map((co, i) => {
    const mats = MATERIALS.filter(m => m.companies.some(c => c.id === co.id));
    const records = 2000 + i * 1100;
    return { ...co, mats, records, pending: 5 + i * 11 };
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Connected Companies</h1>
        <p className="text-sm text-slate-500 mt-1">All participating CPSEs. Click a row to see their material catalog.</p>
      </div>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['Company','Total Records','Mapped','UMCs','Pending Review',''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(co => (
              <tr key={co.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelected(co)}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: co.color }}>{co.id[0]}</div>
                    <div>
                      <p className="font-semibold text-slate-900">{co.id}</p>
                      <p className="text-xs text-slate-400 max-w-[180px] truncate">{co.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-semibold text-slate-900">{co.records.toLocaleString()}</td>
                <td className="px-5 py-3.5 font-semibold text-green-600">{(co.records - co.pending * 3).toLocaleString()}</td>
                <td className="px-5 py-3.5 font-semibold text-blue-600">{co.mats.length}</td>
                <td className="px-5 py-3.5"><Badge type={co.pending > 50 ? 'REVIEW' : 'PROBABLE'} /></td>
                <td className="px-5 py-3.5"><ChevronRight className="w-4 h-4 text-slate-400" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// APP SHELL
// ─────────────────────────────────────────────────────────────

const HISTORY = {
  Today: ['SS Hex Bolt M16x50', 'Find Equivalent Valve', 'Cross CPSE Mapping'],
  Yesterday: ['Duplicate Materials Summary', 'Pending Approvals'],
};

const NAV = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'search', icon: Search, label: 'Universal Search' },
  { id: 'upload', icon: Upload, label: 'Upload Data' },
  { id: 'duplicates', icon: Copy, label: 'Duplicate Explorer' },
  { id: 'review', icon: ClipboardList, label: 'Review Queue', badge: REVIEW_ITEMS.length },
  { id: 'companies', icon: Building2, label: 'Companies' },
];

export default function App() {
  const [tab, setTab] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [detailMat, setDetailMat] = useState(null);

  function handleViewDetail(mat) { setDetailMat(mat); }
  function closeDetail() { setDetailMat(null); }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" suppressHydrationWarning>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-[260px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
          <div className="flex items-center justify-between px-4 h-[60px] border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">NMI Assistant</p>
                <p className="text-[10px] text-slate-400 leading-none">National Material Intelligence</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Menu className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 pt-4 pb-2 flex-shrink-0">
            <button onClick={() => setTab('chat')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors">
              <Plus className="w-4 h-4 text-blue-600" /> New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-3">
            {tab === 'chat' ? (
              <div className="space-y-4 py-2">
                {Object.entries(HISTORY).map(([group, items]) => (
                  <div key={group}>
                    <p className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group}</p>
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center px-2.5 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <nav className="space-y-0.5 py-2">
                {NAV.map(({ id, icon: Icon, label, badge }) => (
                  <button key={id} onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      tab === id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{label}</span>
                    {badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">{badge}</span>}
                  </button>
                ))}
              </nav>
            )}
          </div>

          <div className="border-t border-slate-100 px-3 py-3 flex-shrink-0">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">C</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">CPCL Admin</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-[60px] bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0">
              <Menu className="w-5 h-5" />
            </button>
          )}
          {!sidebarOpen && (
            <div className="flex items-center gap-2 mr-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-900">NMI Assistant</span>
            </div>
          )}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input type="text" placeholder="Search material code, UMC, description…"
                onKeyDown={e => { if (e.key === 'Enter') setTab('search'); }}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
          </div>
          {/* Tab pills (non-chat) */}
          {tab !== 'chat' && (
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {NAV.slice(0, 4).map(({ id, label }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    tab === id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}>
                  {label}
                </button>
              ))}
            </nav>
          )}
          <div className="ml-auto flex items-center gap-1 flex-shrink-0">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setTab('review')}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {tab === 'chat' && <ChatTab onViewDetail={handleViewDetail} />}
          {tab === 'dashboard' && <DashboardTab setTab={setTab} />}
          {tab === 'search' && <SearchTab onViewDetail={handleViewDetail} />}
          {tab === 'upload' && <UploadTab />}
          {tab === 'duplicates' && <DuplicatesTab onViewDetail={handleViewDetail} />}
          {tab === 'review' && <ReviewTab />}
          {tab === 'companies' && <CompaniesTab onViewDetail={handleViewDetail} />}
        </main>
      </div>

      {/* Material Detail Modal */}
      {detailMat && <MaterialDetailModal mat={detailMat} onClose={closeDetail} />}
    </div>
  );
}
