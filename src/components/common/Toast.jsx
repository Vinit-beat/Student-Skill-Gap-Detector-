// src/components/common/Toast.jsx
import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white text-slate-800 shadow-soft-lg',
    error: 'border-rose-200 bg-white text-slate-800 shadow-soft-lg',
    info: 'border-indigo-200 bg-white text-slate-800 shadow-soft-lg'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${borders[toast.type] || borders.info} shadow-xl`}>
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium pr-2">{toast.message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
