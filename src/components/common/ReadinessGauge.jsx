// src/components/common/ReadinessGauge.jsx
import React from 'react';

export default function ReadinessGauge({ score = 0, size = 160, strokeWidth = 12, showLabel = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return { stroke: '#10b981', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Job Ready' };
    if (s >= 60) return { stroke: '#4f46e5', text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', label: 'Moderate Readiness' };
    if (s >= 40) return { stroke: '#f59e0b', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Developing' };
    return { stroke: '#ef4444', text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', label: 'Early Stage' };
  };

  const status = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={status.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
            {score}%
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
            Readiness
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-3 text-center">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text} border ${status.border}`}>
            {status.label}
          </span>
        </div>
      )}
    </div>
  );
}
