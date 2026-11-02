// src/pages/CareerExplorerPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Sparkles, 
  Briefcase, 
  Info, 
  Award, 
  X, 
  Layers, 
  Check,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES } from '../data/rolesData';
import { LevelBadge, PriorityBadge } from '../components/common/SkillBadge';

export default function CareerExplorerPage() {
  const navigate = useNavigate();
  const { profile, allRolesAnalysis, setTargetRole, targetRoleId, showToast } = useApp();

  // Selected role for the details modal
  const [inspectRole, setInspectRole] = useState(null);

  const handleSelectAsTarget = (roleId) => {
    setTargetRole(roleId);
    showToast(`Switched target career to ${CAREER_ROLES.find(r => r.id === roleId)?.title}`, 'success');
    navigate('/gap-analysis');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Header & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded">
              Career Benchmarking
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Student: <strong>{profile?.name || 'Guest'}</strong></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Career Match Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare your active skill inventory against all 8 standard engineering tracks, ranked from highest match to lowest.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 shadow-soft-sm max-w-xs">
          <p className="font-semibold text-slate-700">Currently Targeting:</p>
          <p className="text-brand-indigo-600 font-bold">
            {CAREER_ROLES.find(r => r.id === targetRoleId)?.title}
          </p>
        </div>
      </div>

      {/* Advisory Guidance Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Academic Advisory Guidance:</strong> Skill match calculations are derived from your self-assessed proficiencies against industry benchmark requirements. 
          These scores serve as career guidance and study direction rather than formal guarantees of employability or hiring.
        </p>
      </div>

      {/* Roles Grid Ranked by Match Percentage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allRolesAnalysis.map((item, index) => {
          const isCurrentTarget = item.roleId === targetRoleId;
          const score = item.readinessScore;

          const badgeColor = 
            score >= 70 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            score >= 50 ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
            'bg-slate-100 text-slate-600 border-slate-200';

          return (
            <div
              key={item.roleId}
              className={`rounded-2xl bg-white border p-6 transition-all duration-200 shadow-soft-sm hover:shadow-soft-md flex flex-col justify-between ${
                isCurrentTarget
                  ? 'border-brand-indigo-400 ring-2 ring-brand-indigo-100'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header: Title, Category, Match Pill */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        #{index + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {item.category}
                      </span>
                      {isCurrentTarget && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-indigo-100 text-brand-indigo-700">
                          Active Target
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-xl text-base font-extrabold border ${badgeColor}`}>
                      {score}%
                    </span>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                      Match Score
                    </div>
                  </div>
                </div>

                {/* Match Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      score >= 70 ? 'bg-emerald-500' : score >= 50 ? 'bg-brand-indigo-600' : 'bg-slate-400'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                {/* Matched vs Missing counts */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center mb-4 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Matched</span>
                    <strong className="text-emerald-700 font-bold">{item.matchedCount}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Needs Work</span>
                    <strong className="text-amber-700 font-bold">{item.needsImprovementCount}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Missing</span>
                    <strong className="text-rose-700 font-bold">{item.missingCount}</strong>
                  </div>
                </div>

                {/* Top Strengths & Critical Gaps */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                      Top Strengths:
                    </span>
                    {item.topStrengths.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.topStrengths.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-medium">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px]">No exact matched skills yet</span>
                    )}
                  </div>

                  <div className="pt-1">
                    <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
                      High-Impact Gaps:
                    </span>
                    {item.criticalGaps.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.criticalGaps.map((g, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 text-[11px] font-medium">
                            • {g}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-emerald-600 text-[11px]">All high-priority prerequisites covered!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setInspectRole(item)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  View Requirements
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectAsTarget(item.roleId)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Select & Analyze</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Role Requirements Modal */}
      {inspectRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-indigo-600">
                  Role Benchmark Specifications
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {inspectRole.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Market Demand: {inspectRole.marketDemand} • Typical Salary: {inspectRole.salaryRange}
                </p>
              </div>
              <button
                onClick={() => setInspectRole(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Skill Requirements Table */}
            <div className="p-5 overflow-y-auto space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                {CAREER_ROLES.find(r => r.id === inspectRole.roleId)?.description}
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                    <tr>
                      <th className="py-2.5 px-3">Required Skill</th>
                      <th className="py-2.5 px-3">Target Level</th>
                      <th className="py-2.5 px-3">Importance</th>
                      <th className="py-2.5 px-3">Your Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {CAREER_ROLES.find(r => r.id === inspectRole.roleId)?.skills.map(s => {
                      const analysisSkill = inspectRole.analysis.analyzedSkills.find(as => as.id === s.id);
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {s.name}
                          </td>
                          <td className="py-2.5 px-3">
                            <LevelBadge level={s.requiredLevel} />
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-[11px] text-slate-600 font-medium">
                              {s.weight === 3 ? 'Critical' : s.weight === 2 ? 'Important' : 'Helpful'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                              analysisSkill?.status === 'Matched' ? 'bg-emerald-50 text-emerald-700' :
                              analysisSkill?.status === 'Needs Improvement' ? 'bg-amber-50 text-amber-700' :
                              'bg-rose-50 text-rose-700'
                            }`}>
                              {analysisSkill?.status || 'Missing'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setInspectRole(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleSelectAsTarget(inspectRole.roleId);
                  setInspectRole(null);
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-xs font-bold shadow-soft-sm transition-all"
              >
                <span>Make Active Target & View Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
