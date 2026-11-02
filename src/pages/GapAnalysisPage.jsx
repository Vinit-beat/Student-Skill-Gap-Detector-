// src/pages/GapAnalysisPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  GitCompare, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Briefcase, 
  HelpCircle, 
  Map, 
  BarChart2, 
  Layers, 
  Info,
  Check,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES } from '../data/rolesData';
import ReadinessGauge from '../components/common/ReadinessGauge';
import { StatusBadge, PriorityBadge, LevelBadge } from '../components/common/SkillBadge';

export default function GapAnalysisPage() {
  const navigate = useNavigate();
  const { profile, analysis, targetRoleId, setTargetRole, loadDemoData } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Matched' | 'Needs Improvement' | 'Missing' | 'HIGH_PRIORITY'
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  const role = analysis.role;
  const studentHasSkills = profile?.skills && profile.skills.length > 0;

  // Filter skills table
  const filteredSkills = analysis.analyzedSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          skill.importanceReason.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'HIGH_PRIORITY') return skill.priority === 'High';
    return skill.status === statusFilter;
  });

  // Data for comparison chart
  const chartData = analysis.analyzedSkills.map(s => ({
    name: s.name.length > 14 ? s.name.slice(0, 13) + '…' : s.name,
    fullName: s.name,
    Current: s.currentLevel,
    Required: s.requiredLevel,
    Gap: s.skillGap
  }));

  // Empty State if no profile skills
  if (!studentHasSkills) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-indigo-50 border border-brand-indigo-200 text-brand-indigo-600 flex items-center justify-center mx-auto shadow-soft-sm">
          <GitCompare className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            No Student Skills Found For Analysis
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Please add your current technical and soft skills in the assessment form or load the realistic 3rd-year CS demo profile to test the algorithm.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={loadDemoData}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 text-white font-bold text-xs shadow-soft-md hover:shadow-soft-lg transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Load Demo CS Student Profile</span>
          </button>
          <Link
            to="/assessment"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-soft-sm transition-all"
          >
            <span>Go to Assessment Form</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Header & Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded">
              Core Engine
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Student: <strong>{profile?.name}</strong></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Deterministic rule-based evaluation comparing your proficiency against standard benchmarks for <strong className="text-brand-indigo-600 font-semibold">{role.title}</strong>.
          </p>
        </div>

        {/* Dynamic Role Switcher Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Analyze Against Role
            </label>
            <select
              value={targetRoleId}
              onChange={(e) => setTargetRole(e.target.value)}
              className="text-xs font-bold py-2 px-3 pr-8 rounded-xl border border-brand-indigo-300 bg-white text-brand-indigo-900 shadow-soft-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo-500"
            >
              {CAREER_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.skills.length} skills)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Score Overview & Mathematical Transparency Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Readiness Circular Gauge Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm flex flex-col items-center justify-center text-center">
          <ReadinessGauge score={analysis.readinessScore} size={150} strokeWidth={11} />
          <h3 className="text-base font-bold text-slate-900 mt-4">
            {role.title} Readiness
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mt-1">
            {analysis.readinessScore >= 80 
              ? 'Excellent match! You possess majority of target proficiencies.'
              : analysis.readinessScore >= 60
              ? 'Solid foundation. Focus on the high-priority gaps below.'
              : 'Developing skillset. Follow the 4-week roadmap to bridge requirements.'}
          </p>
        </div>

        {/* Metric Summary & Mathematical Breakdown */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-indigo-600" />
                <span>Skill Breakdown & Classification</span>
              </h3>

              <button
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="text-xs font-semibold text-brand-indigo-600 hover:text-brand-indigo-800 flex items-center gap-1"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showFormulaDetails ? 'Hide Formula' : 'View Formula'}</span>
              </button>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div 
                onClick={() => setStatusFilter(statusFilter === 'Matched' ? 'ALL' : 'Matched')}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all text-center ${
                  statusFilter === 'Matched' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200' : 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-emerald-700">{analysis.matchedCount}</div>
                <div className="text-xs font-bold text-emerald-800 mt-0.5">Matched</div>
                <div className="text-[10px] text-emerald-600">Level meets required</div>
              </div>

              <div 
                onClick={() => setStatusFilter(statusFilter === 'Needs Improvement' ? 'ALL' : 'Needs Improvement')}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all text-center ${
                  statusFilter === 'Needs Improvement' ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200' : 'border-amber-200 bg-amber-50/50 hover:bg-amber-50'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-amber-700">{analysis.needsImprovementCount}</div>
                <div className="text-xs font-bold text-amber-800 mt-0.5">Needs Work</div>
                <div className="text-[10px] text-amber-600">Skill below level</div>
              </div>

              <div 
                onClick={() => setStatusFilter(statusFilter === 'Missing' ? 'ALL' : 'Missing')}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all text-center ${
                  statusFilter === 'Missing' ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200' : 'border-rose-200 bg-rose-50/50 hover:bg-rose-50'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-rose-700">{analysis.missingCount}</div>
                <div className="text-xs font-bold text-rose-800 mt-0.5">Missing</div>
                <div className="text-[10px] text-rose-600">Not in profile</div>
              </div>
            </div>
          </div>

          {/* Transparent Formula Detail Box */}
          {showFormulaDetails && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 animate-fade-in font-mono">
              <div className="font-bold text-slate-900 font-sans flex items-center justify-between">
                <span>Transparent Scoring Formula:</span>
                <span className="text-[11px] text-brand-indigo-600 font-semibold">{analysis.formulaExplanation}</span>
              </div>
              <p className="font-sans text-slate-600 text-[11px] leading-relaxed">
                Score = [ &sum;(Weight &times; min(Current, Required)) / &sum;(Weight &times; Required) ] &times; 100
              </p>
              <div className="text-[11px] text-slate-500 font-sans grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                <span>Beginner = 1, Intermediate = 2, Advanced = 3, Missing = 0</span>
                <span>Priority: High (gap&ge;2 &amp; wt&ge;2 or wt=3), Med (gap&ge;1 &amp; wt=2), Low (wt=1)</span>
              </div>
            </div>
          )}

          {/* Quick CTA to Roadmap */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Ready to address identified gaps?
            </span>
            <button
              onClick={() => navigate('/roadmap')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white font-semibold text-xs shadow-soft-sm transition-all"
            >
              <Map className="w-4 h-4" />
              <span>Generate 4-Week Learning Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Comparison Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-brand-indigo-600" />
              <span>Skill Level Comparison Chart</span>
            </h3>
            <p className="text-xs text-slate-500">
              Side-by-side visualization of student proficiency vs target requirements (0=Missing, 1=Beginner, 2=Intermediate, 3=Advanced)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-3 h-3 rounded bg-brand-indigo-600" /> Current Level
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-3 h-3 rounded bg-slate-300" /> Required Benchmark
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-20} textAnchor="end" />
              <YAxis domain={[0, 3]} ticks={[0, 1, 2, 3]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-brand-navy-900 text-white rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-indigo-300">{data.fullName}</p>
                        <p>Current: <strong>{data.Current} / 3</strong></p>
                        <p>Required: <strong>{data.Required} / 3</strong></p>
                        <p className="text-amber-300 pt-1 border-t border-white/10">
                          Gap: {data.Gap > 0 ? `${data.Gap} level(s)` : 'Met / Exceeded'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="Current" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Your Level" />
              <Bar dataKey="Required" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Required Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Searchable & Filterable Skills Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm overflow-hidden">
        
        {/* Table Controls Bar */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Detailed Skills Breakdown ({filteredSkills.length} of {analysis.analyzedSkills.length})
            </h3>
            <p className="text-xs text-slate-500">
              Filter by status or priority to investigate gaps and read skill importance rationales.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search skill name or rationale..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-200/60 rounded-xl">
              {[
                { key: 'ALL', label: 'All' },
                { key: 'HIGH_PRIORITY', label: 'High Priority' },
                { key: 'Needs Improvement', label: 'Weak' },
                { key: 'Missing', label: 'Missing' },
                { key: 'Matched', label: 'Matched' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                    statusFilter === tab.key
                      ? 'bg-white text-brand-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Body */}
        {filteredSkills.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No skills match the current search query or filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Skill & Category</th>
                  <th className="py-3 px-3">Current</th>
                  <th className="py-3 px-3">Required</th>
                  <th className="py-3 px-3">Gap</th>
                  <th className="py-3 px-3">Weight</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-4">Why It Matters</th>
                  <th className="py-3 px-4 text-right">Roadmap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredSkills.map((skill, idx) => {
                  const isGap = skill.skillGap > 0;
                  return (
                    <tr
                      key={skill.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        skill.priority === 'High' ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      {/* Name & Category */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{skill.name}</div>
                        <div className="text-[10px] text-slate-400">{skill.category}</div>
                      </td>

                      {/* Current Level */}
                      <td className="py-3.5 px-3">
                        <LevelBadge level={skill.currentLevel} label={skill.currentLabel} />
                      </td>

                      {/* Required Level */}
                      <td className="py-3.5 px-3">
                        <LevelBadge level={skill.requiredLevel} label={skill.requiredLabel} />
                      </td>

                      {/* Gap */}
                      <td className="py-3.5 px-3 font-semibold">
                        {skill.skillGap > 0 ? (
                          <span className="text-rose-600 font-bold">+{skill.skillGap}</span>
                        ) : (
                          <span className="text-emerald-600 font-medium">0</span>
                        )}
                      </td>

                      {/* Weight */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          skill.weight === 3 ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          skill.weight === 2 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {skill.weight === 3 ? 'Critical (3)' : skill.weight === 2 ? 'Important (2)' : 'Helpful (1)'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <StatusBadge status={skill.status} size="xs" />
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-3">
                        <PriorityBadge priority={skill.priority} size="xs" />
                      </td>

                      {/* Rationale */}
                      <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-xs text-[11px]">
                        {skill.importanceReason}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        {isGap ? (
                          <Link
                            to="/roadmap"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-indigo-600 hover:text-brand-indigo-800 bg-brand-indigo-50 px-2.5 py-1 rounded-lg border border-brand-indigo-100 transition-colors"
                          >
                            <span>Learn</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-medium inline-flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Met
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
