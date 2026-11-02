// src/components/auth/FormInput.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  icon: Icon,
  hint,
  disabled = false,
  autoComplete,
  className = '',
  rows = 3,
  options = [] // for select inputs
}) {
  const isSelect = type === 'select';
  const isTextarea = type === 'textarea';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label 
          htmlFor={name}
          className="flex items-center justify-between text-xs font-semibold text-slate-700"
        >
          <span>
            {label} {required && <span className="text-rose-500 font-bold">*</span>}
          </span>
          {hint && !error && (
            <span className="text-[11px] font-normal text-slate-400">{hint}</span>
          )}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {isSelect ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full py-2.5 text-xs sm:text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-8 ${
              error
                ? 'border-rose-300 focus:ring-rose-500 text-rose-900 bg-rose-50/20'
                : 'border-slate-200 focus:border-brand-indigo-500 focus:ring-brand-indigo-500/20 text-slate-800'
            }`}
          >
            {options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
        ) : isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full py-2 px-3.5 text-xs sm:text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
              error
                ? 'border-rose-300 focus:ring-rose-500 text-rose-900 bg-rose-50/20'
                : 'border-slate-200 focus:border-brand-indigo-500 focus:ring-brand-indigo-500/20 text-slate-800'
            }`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={`w-full py-2.5 text-xs sm:text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 ${
              error
                ? 'border-rose-300 focus:ring-rose-500 text-rose-900 bg-rose-50/20'
                : 'border-slate-200 focus:border-brand-indigo-500 focus:ring-brand-indigo-500/20 text-slate-800'
            }`}
          />
        )}
      </div>

      {error && (
        <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1 animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
