// src/components/auth/RegistrationProgress.jsx
import React from 'react';
import { Check, User, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export const REGISTRATION_STEPS = [
  { step: 1, title: 'Personal', subtitle: 'Basic Details', icon: User },
  { step: 2, title: 'Academic', subtitle: 'College & Degree', icon: GraduationCap },
  { step: 3, title: 'Skills', subtitle: 'Interests & Goals', icon: Sparkles },
  { step: 4, title: 'Review', subtitle: 'Confirm & Register', icon: CheckCircle2 }
];

export default function RegistrationProgress({ currentStep, onStepClick }) {
  return (
    <div className="w-full py-2">
      {/* Mobile compact step counter */}
      <div className="sm:hidden flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
        <span className="font-bold text-slate-700">
          Step {currentStep} of {REGISTRATION_STEPS.length}: {REGISTRATION_STEPS[currentStep - 1]?.title}
        </span>
        <span className="font-semibold text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded-full text-[11px]">
          {Math.round((currentStep / REGISTRATION_STEPS.length) * 100)}%
        </span>
      </div>

      {/* Desktop/Tablet Stepper Bar */}
      <div className="hidden sm:grid grid-cols-4 gap-2 relative">
        {REGISTRATION_STEPS.map((s, idx) => {
          const isCompleted = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          const Icon = s.icon;

          return (
            <button
              key={s.step}
              type="button"
              onClick={() => onStepClick && isCompleted && onStepClick(s.step)}
              disabled={!isCompleted}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${
                isCurrent
                  ? 'bg-brand-indigo-50/70 border border-brand-indigo-200 shadow-2xs'
                  : isCompleted
                  ? 'bg-slate-50 border border-slate-200/80 hover:bg-slate-100 cursor-pointer'
                  : 'bg-transparent border border-transparent opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : isCurrent
                  ? 'bg-brand-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.step}
              </div>

              <div className="min-w-0">
                <div className={`text-xs font-bold leading-tight truncate ${
                  isCurrent ? 'text-brand-indigo-900' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {s.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate hidden md:block">
                  {s.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Line */}
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
        <div
          className="h-full bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 transition-all duration-300 rounded-full"
          style={{ width: `${((currentStep - 1) / (REGISTRATION_STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
