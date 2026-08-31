'use client';

import { useState } from 'react';
import {
  X, CheckCircle2, ShieldCheck, Building2, Package, Layers,
  ExternalLink, BarChart3, AlertCircle, ArrowRight, Download, Check
} from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';

export default function MaterialDetailModal({ material, onClose }) {
  const [activeTab, setActiveTab] = useState('specs');
  const [isApproved, setIsApproved] = useState(false);

  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white p-2 flex items-center justify-center shadow-xs flex-shrink-0">
              <img src={material.image} alt={material.name} className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {material.commonCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {material.similarityClass} ({material.matchScore}%)
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {material.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Source CPSE: <span className="font-bold text-slate-800">{material.cpse}</span> | Legacy Code: <span className="font-mono text-slate-800 font-bold">{material.cpseMaterialCode}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Navigation */}
        <div className="flex items-center gap-6 px-6 border-b border-slate-200/80 bg-white text-xs font-bold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('cross-mapping')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'cross-mapping'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            CPSE Inventory & Mapping
          </button>
          <button
            onClick={() => setActiveTab('ai-reasoning')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'ai-reasoning'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            AI Confidence Explanation
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Standardized Attributes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(material.attributes || {}).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center text-xs"
                  >
                    <span className="text-slate-500 font-semibold">{key}</span>
                    <span className="font-extrabold text-slate-900 font-mono text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cross-mapping' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                CPSE Stock & Procurement Opportunity
              </h3>
              <div className="border border-slate-200/90 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200/80">
                    <tr>
                      <th className="p-3 font-extrabold text-slate-700">CPSE Name</th>
                      <th className="p-3 font-extrabold text-slate-700">Available Stock</th>
                      <th className="p-3 font-extrabold text-slate-700">Unit Price</th>
                      <th className="p-3 font-extrabold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(material.stock || {}).map(([cpseId, qty]) => {
                      const cpseObj = CPSE_LIST.find((c) => c.id === cpseId);
                      return (
                        <tr key={cpseId} className="hover:bg-slate-50/60">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: cpseObj?.color || '#3B82F6' }}
                            />
                            {cpseObj?.name || cpseId} ({cpseId})
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-700">{qty} NOS</td>
                          <td className="p-3 font-mono text-slate-700">{material.lastPrice}</td>
                          <td className="p-3 font-semibold text-emerald-600">Active Stock</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ai-reasoning' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Alignment Factors
              </h3>
              <div className="space-y-3">
                {material.aiConfidenceBreakdown?.map((factor, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span>{factor.factor}</span>
                      <span className="text-indigo-600 font-mono">{factor.score}% Match</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Weight in global formula: {factor.weight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            onClick={() => setIsApproved(!isApproved)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
              isApproved
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isApproved ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{isApproved ? 'Common Mapping Approved' : 'Approve Common Code Mapping'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
