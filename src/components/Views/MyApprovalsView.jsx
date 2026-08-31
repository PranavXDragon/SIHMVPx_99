'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Shield, ArrowRight } from 'lucide-react';
import { MOCK_APPROVALS } from '../../data/mockData';

export default function MyApprovalsView() {
  const [approvals, setApprovals] = useState(MOCK_APPROVALS);

  const handleAction = (id, newStatus) => {
    setApprovals(approvals.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Pending Approval Queue
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Review and validate AI-suggested National Material Code mappings
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-extrabold border border-amber-200">
          8 Pending Items
        </span>
      </div>

      <div className="space-y-4">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                  {item.cpse}
                </span>
                <span className="font-mono text-xs font-bold text-slate-500">{item.rawCode}</span>
                <span className="text-xs font-semibold text-emerald-600">AI Confidence: {item.confidence}%</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">{item.rawDesc}</h3>
              <div className="flex items-center gap-2 text-xs text-indigo-700 font-semibold bg-indigo-50/70 p-2 rounded-xl border border-indigo-100 max-w-fit">
                <span>Suggested Code: <strong className="font-mono">{item.suggestedCode}</strong></span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{item.suggestedName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {item.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => handleAction(item.id, 'Approved')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'Rejected')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
