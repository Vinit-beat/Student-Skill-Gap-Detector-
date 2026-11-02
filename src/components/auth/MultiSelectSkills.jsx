// src/components/auth/MultiSelectSkills.jsx
import React, { useState } from 'react';
import { Search, Plus, X, Check, Sparkles } from 'lucide-react';

export default function MultiSelectSkills({
  label,
  selectedSkills = [],
  onChange,
  availableSuggestions = [],
  placeholder = 'Search or add skill...',
  category = 'Technical',
  error,
  required = false
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = (skillName) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;

    if (selectedSkills.includes(trimmed)) {
      onChange(selectedSkills.filter(s => s !== trimmed));
    } else {
      onChange([...selectedSkills, trimmed]);
      setSearchTerm('');
    }
  };

  const handleRemove = (skillName) => {
    onChange(selectedSkills.filter(s => s !== skillName));
  };

  const filteredSuggestions = availableSuggestions.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        <span className="text-[11px] font-semibold text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded-full">
          {selectedSkills.length} selected
        </span>
      </div>

      {/* Selected Skill Chips */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 min-h-[42px] max-h-36 overflow-y-auto">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs group"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemove(skill)}
                className="text-slate-400 hover:text-rose-600 rounded-full p-0.5 transition-colors"
                title={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (searchTerm.trim()) {
                handleToggle(searchTerm.trim());
              }
            }
          }}
          placeholder={placeholder}
          className="w-full pl-9 pr-14 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo-500/20 focus:border-brand-indigo-500 text-slate-800"
        />
        {searchTerm.trim() && (
          <button
            type="button"
            onClick={() => handleToggle(searchTerm.trim())}
            className="absolute right-1.5 top-1 px-2.5 py-1 text-xs font-semibold bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white rounded-lg transition-colors"
          >
            Add
          </button>
        )}
      </div>

      {/* Suggestion Chips */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Suggested {category} Skills:
        </span>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
          {filteredSuggestions.map((suggestion) => {
            const isSelected = selectedSkills.includes(suggestion);
            return (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleToggle(suggestion)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-brand-indigo-50 text-brand-indigo-700 border border-brand-indigo-200 font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {isSelected ? (
                  <Check className="w-3 h-3 text-brand-indigo-600" />
                ) : (
                  <Plus className="w-3 h-3 text-slate-400" />
                )}
                <span>{suggestion}</span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      )}
    </div>
  );
}
