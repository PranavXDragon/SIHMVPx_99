'use client';

import { Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react';

export default function AiMatchingView() {
  const steps = [
    { title: '1. Description Normalization', desc: 'Converts legacy SAP uppercase text, removes noise characters, standardizes units (mm, IN, PN, Class).' },
    { title: '2. Attribute Extraction & Classification', desc: 'Parses dimensional features (ID, OD, Width, Thread Pitch) using Transformer-based NLP models.' },
    { title: '3. Vector Similarity Search', desc: 'Performs cosine similarity search against 345,000+ indexed National Material Master vector embeddings.' },
    { title: '4. National Code Generation', desc: 'Maps verified clusters to unified NMM code formats (e.g. NMM-BA-6205-STD).' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-900 to-purple-950 p-6 rounded-3xl text-white space-y-2 border border-indigo-800 shadow-lg">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
          <Cpu className="w-4 h-4" />
          <span>AI Matching Engine Architecture</span>
        </div>
        <h2 className="text-2xl font-extrabold">Deep Natural Language Matching Pipeline</h2>
        <p className="text-xs text-indigo-200">
          How National Material Master matches non-standard material descriptions across 8 CPSEs in milliseconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-2 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>{step.title}</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
