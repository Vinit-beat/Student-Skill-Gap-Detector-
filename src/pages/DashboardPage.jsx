// src/pages/DashboardPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Target, 
  TrendingUp, 
  Map, 
  FileEdit, 
  GitCompare, 
  Compass, 
  Briefcase, 
  Award, 
  Clock, 
  CheckCircle,
  BarChart2,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useApp } from '../context/AppContext';
import ReadinessGauge from '../components/common/ReadinessGauge';
import { StatusBadge, PriorityBadge } from '../components/common/SkillBadge';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, analysis, targetRoleId, roadmapTasks, roadmapProgress, loadDemoData } = useApp();

  const studentName = profile?.name || 'Student';
  const roleTitle = analysis?.role?.title || 'Target Role';

  // Prepare data for Current vs Required Bar Chart
  const chartData = analysis.analyzedSkills.map(s => ({
    name: s.name.length > 15 ? s.name.slice(0, 14) + '…' : s.name,
    fullName: s.name,
    Current: s.currentLevel,
    Required: s.requiredLevel,
    Gap: s.skillGap
  }));

  // Prepare data for Priority Breakdown Pie Chart
  const priorityChartData = [
    { name: 'High Priority Gaps', value: analysis.allGaps.filter(g => g.priority === 'High').length, color: '#ef4444' },
    { name: 'Medium Priority Gaps', value: analysis.allGaps.filter(g => g.priority === 'Medium').length, color: '#f59e0b' },
    { name: 'Low Priority Gaps', value: analysis.allGaps.filter(g => g.priority === 'Low').length, color: '#3b82f6' },
    { name: 'Matched Competencies', value: analysis.matchedCount, color: '#10b981' }
  ].filter(d => d.value > 0);

  // Completed vs In Progress vs Not Started roadmap tasks
  const completedTasks = roadmapTasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = roadmapTasks.filter(t => t.status === 'In Progress').length;
  const notStartedTasks = roadmapTasks.filter(t => t.status === 'Not Started').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-brand-indigo-900 text-white p-6 sm:p-8 shadow-soft-lg">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-radial from-brand-indigo-500/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-brand-indigo-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-indigo-300" />
              <span>Career Analytics & Gap Diagnostic Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {studentName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Tracking your readiness for <strong className="text-white font-semibold">{roleTitle}</strong>. 
              Review your proficiency gaps, track weekly milestone progress, and follow curated roadmaps.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Link
              to="/gap-analysis"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-500 text-white font-semibold text-xs shadow-md transition-all"
            >
              <GitCompare className="w-4 h-4" />
              <span>Full Gap Analysis</span>
            </Link>
            <Link
              to="/roadmap"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
            >
              <Map className="w-4 h-4" />
              <span>My Roadmap</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Readiness Gauge Card */}
        <div className="sm:col-span-2 lg:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col items-center justify-center text-center">
          <ReadinessGauge score={analysis.readinessScore} size={110} strokeWidth={9} />
          <p className="text-xs font-bold text-slate-800 mt-2">Overall Readiness</p>
          <p className="text-[11px] text-slate-400">Target: {roleTitle}</p>
        </div>

        {/* Matched Skills */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matched</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-slate-900">{analysis.matchedCount}</div>
            <p className="text-[11px] text-emerald-600 font-medium">Meets/Exceeds standard</p>
          </div>
          <div className="text-[10px] text-slate-400">
            Out of {analysis.totalRequired} required skills
          </div>
        </div>

        {/* Needs Improvement Skills */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weak Skills</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-slate-900">{analysis.needsImprovementCount}</div>
            <p className="text-[11px] text-amber-600 font-medium">Below required level</p>
          </div>
          <div className="text-[10px] text-slate-400">
            Requires upskilling
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Missing Skills</span>
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-slate-900">{analysis.missingCount}</div>
            <p className="text-[11px] text-rose-600 font-medium">Unlisted prerequisites</p>
          </div>
          <div className="text-[10px] text-slate-400">
            High priority focus
          </div>
        </div>

        {/* Roadmap Progress */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Roadmap</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-brand-indigo-600">
              <Map className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-brand-indigo-600">{roadmapProgress}%</div>
            <p className="text-[11px] text-slate-500 font-medium">{completedTasks} of {roadmapTasks.length} tasks done</p>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${roadmapProgress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Charts Section: Current vs Required & Gap Priority Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Proficiency Comparison Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Current vs. Required Proficiency Levels
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Benchmark comparison across all required skills for {roleTitle} (1=Beginner, 2=Intermediate, 3=Advanced)
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-brand-indigo-600" /> Student
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-slate-300" /> Required
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  interval={0} 
                  angle={-25} 
                  textAnchor="end" 
                />
                <YAxis 
                  domain={[0, 3]} 
                  ticks={[0, 1, 2, 3]} 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const levelName = (lvl) => lvl === 3 ? 'Advanced (3)' : lvl === 2 ? 'Intermediate (2)' : lvl === 1 ? 'Beginner (1)' : 'Missing (0)';
                      return (
                        <div className="p-3 bg-brand-navy-900 text-white rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-bold text-indigo-300">{data.fullName}</p>
                          <p>Current: <strong className="text-white">{levelName(data.Current)}</strong></p>
                          <p>Required: <strong className="text-white">{levelName(data.Required)}</strong></p>
                          <p className="pt-1 border-t border-white/10 text-amber-300">
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

        {/* Gap Priority Distribution Pie Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieChartIcon className="w-4 h-4 text-brand-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Skill Gap Priority Distribution
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Breakdown based on gap size and role importance weight
            </p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {priorityChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name) => [`${val} skills`, name]}
                    contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {priorityChartData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.name}</span>
                </span>
                <span className="font-bold text-slate-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top 3 Recommended Skills & Recent Learning Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top 3 Recommended Skills */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Top Recommended Skills to Improve
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Highest impact skills to boost your readiness score for {roleTitle}
              </p>
            </div>

            <Link
              to="/roadmap"
              className="text-xs font-semibold text-brand-indigo-600 hover:text-brand-indigo-700 flex items-center gap-1"
            >
              <span>View Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {analysis.topRecommendations.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">Exceptional Readiness!</p>
              <p>You have met all required skills for this role.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {analysis.topRecommendations.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-brand-indigo-200 transition-all shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{skill.name}</span>
                      <PriorityBadge priority={skill.priority} size="xs" />
                      <StatusBadge status={skill.status} size="xs" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                      {skill.importanceReason}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-0.5">
                      <span>Current: <strong className="text-slate-700">{skill.currentLabel}</strong></span>
                      <span>•</span>
                      <span>Target: <strong className="text-brand-indigo-600">{skill.requiredLabel}</strong></span>
                      <span>•</span>
                      <span>Est: {skill.estimatedHours}</span>
                    </div>
                  </div>

                  <Link
                    to="/roadmap"
                    className="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-brand-indigo-400 hover:bg-brand-indigo-50 text-xs font-semibold text-brand-indigo-600 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Quick Career Actions
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Explore alternate tools and update your inventory
            </p>

            <div className="space-y-2">
              <Link
                to="/assessment"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-indigo-300 hover:bg-brand-indigo-50/50 transition-all text-xs font-semibold text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-brand-indigo-600" />
                  <span>Update Profile & Skills</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/gap-analysis"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-indigo-300 hover:bg-brand-indigo-50/50 transition-all text-xs font-semibold text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-brand-indigo-600" />
                  <span>Interactive Gap Analysis</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/career-explorer"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-indigo-300 hover:bg-brand-indigo-50/50 transition-all text-xs font-semibold text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brand-indigo-600" />
                  <span>Benchmark All 8 Roles</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Roadmap Milestone</span>
              <span className="font-bold text-brand-indigo-600">{roadmapProgress}%</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">
              {completedTasks} completed, {inProgressTasks} in progress
            </p>
            <Link
              to="/roadmap"
              className="text-xs font-bold text-brand-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>Manage tasks</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
