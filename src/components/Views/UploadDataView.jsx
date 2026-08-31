'use client';

import { Upload, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function UploadDataView() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Upload Legacy SAP/ERP Inventory File</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Drag & drop Excel or CSV files containing material descriptions to run batch AI standardization
        </p>
      </div>

      <div className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-3 transition-colors cursor-pointer">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <Upload className="w-7 h-7" />
        </div>
        <div>
          <p className="text-sm font-extrabold text-slate-900">Drag & drop material CSV / Excel file here</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Supports SAP MM exports, MM03 extracts, or custom XLSX files up to 50MB</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
          Browse Computer Files
        </button>
      </div>
    </div>
  );
}
