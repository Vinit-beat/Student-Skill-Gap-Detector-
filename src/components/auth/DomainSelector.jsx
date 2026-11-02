// src/components/auth/DomainSelector.jsx
import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  TrendingUp, 
  Shield, 
  Cloud, 
  Code2, 
  Palette, 
  Wifi, 
  Layers, 
  Check 
} from 'lucide-react';

export const DOMAINS_LIST = [
  { id: 'web', name: 'Web Development', icon: Globe },
  { id: 'app', name: 'App Development', icon: Smartphone },
  { id: 'aiml', name: 'Artificial Intelligence and Machine Learning', icon: Cpu },
  { id: 'data', name: 'Data Science and Analytics', icon: TrendingUp },
  { id: 'cyber', name: 'Cybersecurity', icon: Shield },
  { id: 'cloud', name: 'Cloud Computing', icon: Cloud },
  { id: 'swe', name: 'Software Engineering', icon: Code2 },
  { id: 'uiux', name: 'UI/UX Design', icon: Palette },
  { id: 'iot', name: 'Internet of Things', icon: Wifi },
  { id: 'blockchain', name: 'Blockchain', icon: Layers }
];

export default function DomainSelector({
  selectedDomains = [],
  onChange,
  error,
  required = false
}) {
  const toggleDomain = (domainName) => {
    if (selectedDomains.includes(domainName)) {
      onChange(selectedDomains.filter(d => d !== domainName));
    } else {
      onChange([...selectedDomains, domainName]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">
          Interested Domains {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        <span className="text-[11px] font-semibold text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded-full">
          {selectedDomains.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {DOMAINS_LIST.map((domain) => {
          const isSelected = selectedDomains.includes(domain.name);
          const Icon = domain.icon;

          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => toggleDomain(domain.name)}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all duration-150 ${
                isSelected
                  ? 'border-brand-indigo-500 bg-brand-indigo-50/50 ring-1 ring-brand-indigo-500 shadow-2xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isSelected
                    ? 'bg-brand-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-xs font-medium truncate ${
                  isSelected ? 'text-brand-indigo-950 font-bold' : 'text-slate-700'
                }`}>
                  {domain.name}
                </span>
              </div>

              <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                isSelected
                  ? 'border-brand-indigo-600 bg-brand-indigo-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      )}
    </div>
  );
}
