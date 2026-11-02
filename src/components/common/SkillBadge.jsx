// src/components/common/SkillBadge.jsx
import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, ArrowUpRight } from 'lucide-react';

export function StatusBadge({ status, size = 'sm' }) {
  const configs = {
    'Matched': {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
      label: 'Matched'
    },
    'Needs Improvement': {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
      label: 'Needs Improvement'
    },
    'Missing': {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />,
      label: 'Missing Skill'
    }
  };

  const config = configs[status] || configs['Missing'];
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${sizeClasses}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}

export function PriorityBadge({ priority, size = 'sm' }) {
  const configs = {
    'High': {
      bg: 'bg-rose-100 text-rose-800 border-rose-300',
      dot: 'bg-rose-500',
      label: 'High Priority'
    },
    'Medium': {
      bg: 'bg-amber-100 text-amber-800 border-amber-300',
      dot: 'bg-amber-500',
      label: 'Medium Priority'
    },
    'Low': {
      bg: 'bg-blue-100 text-blue-800 border-blue-300',
      dot: 'bg-blue-500',
      label: 'Low Priority'
    },
    'None': {
      bg: 'bg-slate-100 text-slate-600 border-slate-200',
      dot: 'bg-emerald-500',
      label: 'Complete'
    }
  };

  const config = configs[priority] || configs['Low'];
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.bg} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}

export function LevelBadge({ level, label }) {
  const colors = {
    0: 'bg-slate-100 text-slate-500 border-slate-200',
    1: 'bg-sky-50 text-sky-700 border-sky-200',
    2: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    3: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const display = label || (level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : level === 3 ? 'Advanced' : 'None');

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[level] || colors[0]}`}>
      {display}
    </span>
  );
}
