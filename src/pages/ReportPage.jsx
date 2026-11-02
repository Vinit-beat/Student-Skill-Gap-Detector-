// src/pages/ReportPage.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Printer, 
  Download, 
  FileDown, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Target, 
  Award, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ReadinessGauge from '../components/common/ReadinessGauge';
import { StatusBadge, PriorityBadge, LevelBadge } from '../components/common/SkillBadge';

export default function ReportPage() {
  const navigate = useNavigate();
  const { profile, analysis, roadmapTasks, roadmapProgress, showToast } = useApp();

  const reportDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const role = analysis.role;
  const studentName = profile?.name || 'Student';

  // Handler: Print Report
  const handlePrint = () => {
    window.print();
  };

  // Handler: Download Text / Markdown Report
  const handleDownloadText = () => {
    const lines = [
      `========================================================================`,
      `SKILLSYNC AI - STUDENT SKILL GAP & READINESS REPORT`,
      `Generated: ${reportDate}`,
      `========================================================================\n`,
      `STUDENT PROFILE:`,
      `Name: ${studentName}`,
      `Degree: ${profile?.degree || 'N/A'}`,
      `Branch: ${profile?.branch || 'N/A'}`,
      `Academic Year: ${profile?.academicYear || 'N/A'}`,
      `Target Career Role: ${role.title}\n`,
      `OVERALL READINESS:`,
      `Readiness Score: ${analysis.readinessScore}%`,
      `Total Skills Evaluated: ${analysis.totalRequired}`,
      `Matched Skills: ${analysis.matchedCount}`,
      `Needs Improvement: ${analysis.needsImprovementCount}`,
      `Missing Skills: ${analysis.missingCount}`,
      `Roadmap Milestone Progress: ${roadmapProgress}%\n`,
      `------------------------------------------------------------------------`,
      `DETAILED SKILLS GAP ANALYSIS:`,
      `------------------------------------------------------------------------`,
      ...analysis.analyzedSkills.map(s => 
        `• ${s.name} [${s.category}]
   Status: ${s.status} | Priority: ${s.priority} | Weight: ${s.weight}/3
   Current Level: ${s.currentLabel} (${s.currentLevel}) -> Required: ${s.requiredLabel} (${s.requiredLevel}) [Gap: ${s.skillGap}]
   Rationale: ${s.importanceReason}\n`
      ),
      `------------------------------------------------------------------------`,
      `RECOMMENDED 4-WEEK LEARNING ROADMAP:`,
      `------------------------------------------------------------------------`,
      ...roadmapTasks.map(t => 
        `[Week ${t.week}] ${t.title}
   Priority: ${t.priority} | Est: ${t.estimatedHours} | Status: ${t.status}
   Key Topics: ${t.topics.join(', ')}
   Mini-Project: ${t.miniProject || 'N/A'}\n`
      ),
      `========================================================================`,
      `End of Report - SkillSync AI Academic Prototype`,
      `========================================================================`
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SkillSync_Report_${studentName.replace(/\s+/g, '_')}_${role.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded text report successfully!', 'success');
  };

  // Handler: Download CSV Report
  const handleDownloadCSV = () => {
    const headers = ['Skill Name', 'Category', 'Current Level', 'Required Level', 'Gap', 'Weight', 'Status', 'Priority', 'Why It Matters'];
    const rows = analysis.analyzedSkills.map(s => [
      `"${s.name}"`,
      `"${s.category}"`,
      `"${s.currentLabel} (${s.currentLevel})"`,
      `"${s.requiredLabel} (${s.requiredLevel})"`,
      s.skillGap,
      s.weight,
      `"${s.status}"`,
      `"${s.priority}"`,
      `"${s.importanceReason.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SkillSync_GapAnalysis_${studentName.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded CSV spreadsheet successfully!', 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top Action Bar (Hidden when Printing) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Executive Skill Gap Report
          </h2>
          <p className="text-xs text-slate-500">
            Export or print your verified student gap diagnosis and recommended roadmap.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadText}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-brand-indigo-600" />
            <span>Download Text</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-brand-indigo-600" />
            <span>Download CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-xs font-semibold shadow-soft-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            onClick={() => navigate('/assessment')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reassess Skills</span>
          </button>
        </div>
      </div>

      {/* Printable Report Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg p-6 sm:p-10 space-y-8 print-card">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                SkillSync AI
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-indigo-50 text-brand-indigo-600 border border-brand-indigo-100">
                Official Report
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student Skill Gap & Career Readiness Diagnostic Assessment
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500 space-y-0.5">
            <div>Report Date: <strong className="text-slate-800">{reportDate}</strong></div>
            <div>Evaluation Mode: <strong className="text-slate-800">Rule-Based Deterministic</strong></div>
            <div className="text-[11px] text-slate-400">Ref ID: SKILLSYNC-{profile?.targetRole}-{Math.abs(studentName.length * 37)}</div>
          </div>
        </div>

        {/* Student Profile & Target Role Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-50/70 border border-slate-200">
          
          <div className="space-y-2 text-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Student Information
            </div>
            <div className="text-base font-extrabold text-slate-900">{studentName}</div>
            <div className="text-slate-600">
              Degree: <strong className="text-slate-800">{profile?.degree || 'B.Tech'}</strong> in <strong className="text-slate-800">{profile?.branch || 'Computer Science'}</strong>
            </div>
            <div className="text-slate-600">
              Academic Year: <strong className="text-slate-800">{profile?.academicYear || 'Third Year'}</strong>
            </div>
            {profile?.projects && profile.projects.length > 0 && (
              <div className="text-[11px] text-slate-500 pt-1">
                Completed Projects: {profile.projects.map(p => p.title).join(', ')}
              </div>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Career Evaluation Target
            </div>
            <div className="text-base font-extrabold text-brand-indigo-600">{role.title}</div>
            <div className="text-slate-600">
              Category: <strong className="text-slate-800">{role.category}</strong>
            </div>
            <div className="text-slate-600">
              Market Demand: <strong className="text-slate-800">{role.marketDemand}</strong> • Est. Range: {role.salaryRange}
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Required Competencies Benchmark: {role.skills.length} standard skills
            </div>
          </div>

        </div>

        {/* Executive Score & KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center">
            <ReadinessGauge score={analysis.readinessScore} size={95} strokeWidth={8} showLabel={false} />
            <p className="text-xs font-bold text-slate-900 mt-2">Readiness Score</p>
            <p className="text-[10px] text-slate-400">{analysis.formulaExplanation}</p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Matched Skills</span>
            <div className="my-1 text-3xl font-black text-emerald-700">{analysis.matchedCount}</div>
            <p className="text-[11px] text-emerald-600">Meets required proficiency</p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Weak Skills</span>
            <div className="my-1 text-3xl font-black text-amber-700">{analysis.needsImprovementCount}</div>
            <p className="text-[11px] text-amber-600">Below benchmark level</p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">Missing Skills</span>
            <div className="my-1 text-3xl font-black text-rose-700">{analysis.missingCount}</div>
            <p className="text-[11px] text-rose-600">Unlisted prerequisites</p>
          </div>

        </div>

        {/* Section 1: Detailed Skills Classification & Gaps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              1. Skill Gap Diagnostic Breakdown
            </h3>
            <span className="text-xs text-slate-400">
              {analysis.analyzedSkills.length} Total Evaluated Skills
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Skill & Category</th>
                  <th className="py-2.5 px-2">Current</th>
                  <th className="py-2.5 px-2">Required</th>
                  <th className="py-2.5 px-2">Gap</th>
                  <th className="py-2.5 px-2">Weight</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Priority</th>
                  <th className="py-2.5 px-3">Importance Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {analysis.analyzedSkills.map(skill => (
                  <tr key={skill.id} className={skill.priority === 'High' ? 'bg-rose-50/30' : ''}>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      {skill.name}
                      <span className="text-[10px] text-slate-400 block font-normal">{skill.category}</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <LevelBadge level={skill.currentLevel} label={skill.currentLabel} />
                    </td>
                    <td className="py-2.5 px-2">
                      <LevelBadge level={skill.requiredLevel} label={skill.requiredLabel} />
                    </td>
                    <td className="py-2.5 px-2 font-bold">
                      {skill.skillGap > 0 ? <span className="text-rose-600">+{skill.skillGap}</span> : <span className="text-emerald-600">0</span>}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="text-[10px] font-semibold text-slate-600">{skill.weight}/3</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <StatusBadge status={skill.status} size="xs" />
                    </td>
                    <td className="py-2.5 px-2">
                      <PriorityBadge priority={skill.priority} size="xs" />
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-600 max-w-xs">
                      {skill.importanceReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Recommended 4-Week Action Roadmap */}
        <div className="space-y-4 print-page-break">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              2. Recommended 4-Week Learning Roadmap Summary
            </h3>
            <span className="text-xs text-brand-indigo-600 font-bold">
              Progress: {roadmapProgress}%
            </span>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map(w => {
              const weekTasks = roadmapTasks.filter(t => t.week === w);
              if (weekTasks.length === 0) return null;

              return (
                <div key={w} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900">
                      Week {w} Milestones ({weekTasks.length} tasks)
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {weekTasks.map(t => (
                      <div key={t.id} className="p-2 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-800">{t.title}</span>
                          <span className="text-[11px] text-slate-400 ml-2">({t.estimatedHours})</span>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Focus: {t.topics.slice(0, 3).join(', ')}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          t.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          t.status === 'In Progress' ? 'bg-brand-indigo-100 text-brand-indigo-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Career Guidance & Recommendations */}
        <div className="space-y-3 p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 text-xs text-slate-700">
          <div className="flex items-center gap-2 text-brand-indigo-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-brand-indigo-600" />
            <span>Strategic Career Guidance & Recommendations</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-600">
            <li>
              <strong>Prioritize High Priority Gaps First:</strong> Address foundational concepts in Week 1 & 2 before applying to competitive entry-level positions.
            </li>
            <li>
              <strong>Validate With Mini-Projects:</strong> Commit working repositories to GitHub with clear README documentation and live demos demonstrating your upskilled competencies.
            </li>
            <li>
              <strong>Cross-Role Flexibility:</strong> Review adjacent careers on the Career Explorer where your existing skills may already yield a 70%+ match.
            </li>
          </ul>
        </div>

        {/* Footer Signature & Academic Prototype Notice */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-400 space-y-1">
          <p>SkillSync AI – Student Skill Gap Detector • Academic Prototype Report</p>
          <p className="text-[10px]">Deterministic rule-based analysis • Designed for presentation and student career planning</p>
        </div>

      </div>

    </div>
  );
}
