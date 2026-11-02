// src/components/auth/PasswordInput.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';
import { calculatePasswordStrength } from '../../utils/authValidation';

export default function PasswordInput({
  label = 'Password',
  name = 'password',
  value,
  onChange,
  placeholder = '••••••••',
  error,
  required = false,
  showStrength = false,
  autoComplete = 'current-password',
  hint
}) {
  const [showPassword, setShowPassword] = useState(false);
  const strength = showStrength ? calculatePasswordStrength(value) : null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={name}
          className="text-xs font-semibold text-slate-700"
        >
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        {hint && (
          <span className="text-[11px] text-slate-400">{hint}</span>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Lock className="w-4 h-4" />
        </div>

        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full py-2.5 pl-10 pr-10 text-xs sm:text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-rose-300 focus:ring-rose-500 text-rose-900 bg-rose-50/20'
              : 'border-slate-200 focus:border-brand-indigo-500 focus:ring-brand-indigo-500/20 text-slate-800'
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Password Strength Meter */}
      {showStrength && value && (
        <div className="space-y-1 pt-1 animate-fade-in">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Strength:</span>
            <span className={`font-semibold ${strength.text}`}>
              {strength.label}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} transition-all duration-300 rounded-full`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1 animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
