// src/pages/RoadmapPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Code, 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Calendar, 
  AlertTriangle,
  Check,
  Award,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PriorityBadge, LevelBadge } from '../components/common/SkillBadge';

export default function RoadmapPage() {
  const { 
    profile, 
    analysis, 
    roadmapTasks, 
    updateTaskStatus, 
    resetRoadmapProgress, 
    roadmapProgress,
    loadDemoData 
  } = useApp();

  const [activeWeekTab, setActiveWeekTab] = useState('ALL'); // 'ALL' | 1 | 2 | 3 | 4
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState(new Set());

  const toggleTaskExpanded = (taskId) => {
    setExpandedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const roleTitle = analysis?.role?.title || 'Target Role';

  const completedCount = roadmapTasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = roadmapTasks.filter(t => t.status === 'In Progress').length;
  const notStartedCount = roadmapTasks.filter(t => t.status === 'Not Started').length;

  // Filter tasks based on selected week tab
  const displayTasks = activeWeekTab === 'ALL'
    ? roadmapTasks
    : roadmapTasks.filter(t => t.week === Number(activeWeekTab));

  const weekDescriptions = {
    1: 'Week 1: Core Foundations & High-Impact Skills',
    2: 'Week 2: Framework Mastery & Essential Engineering',
    3: 'Week 3: Tooling, Architecture & Production Best Practices',
    4: 'Week 4: Applied Mini-Projects, Testing & Portfolio Capstone'
  };

  if (!roadmapTasks || roadmapTasks.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-soft-sm">
          <Award className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            No Skill Gaps Identified!
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Your current skill inventory matches or exceeds all benchmark requirements for <strong>{roleTitle}</strong>. 
            You can benchmark against other career paths or load a demo profile.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/career-explorer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo-600 text-white font-bold text-xs shadow-soft-md hover:bg-brand-indigo-700 transition-colors"
          >
            <span>Explore Other Career Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={loadDemoData}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-soft-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-brand-indigo-600" />
            <span>Load Demo Student Data</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Header & Overall Roadmap Progress */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded">
                Personalized Learning Path
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{roleTitle}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              4-Week Adaptive Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated from your actual gap analysis. Foundational & high-priority gaps are front-loaded into Weeks 1 & 2.
            </p>
          </div>

          {/* Reset Progress Action with Confirmation Modal */}
          <div className="relative self-start md:self-auto">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition-colors"
                title="Reset all tasks back to Not Started"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset Roadmap Progress</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 p-1.5 bg-rose-50 border border-rose-200 rounded-xl animate-fade-in text-xs">
                <span className="text-rose-800 font-semibold px-2">Reset to 0%?</span>
                <button
                  onClick={() => {
                    resetRoadmapProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2 py-1 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Progress Bar & Metrics */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-2 gap-2">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-slate-900 text-sm">
                Overall Roadmap Completion: <strong className="text-brand-indigo-600 font-bold">{roadmapProgress}%</strong>
              </span>
              {roadmapProgress === 100 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Fully Completed!
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> {completedCount} Completed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-indigo-500" /> {inProgressCount} In Progress
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300" /> {notStartedCount} Not Started
              </span>
            </div>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, roadmapProgress))}%` }}
            />
          </div>
        </div>

        {/* Week Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          {[
            { id: 'ALL', label: 'All 4 Weeks', count: roadmapTasks.length },
            { id: 1, label: 'Week 1', count: roadmapTasks.filter(t => t.week === 1).length },
            { id: 2, label: 'Week 2', count: roadmapTasks.filter(t => t.week === 2).length },
            { id: 3, label: 'Week 3', count: roadmapTasks.filter(t => t.week === 3).length },
            { id: 4, label: 'Week 4', count: roadmapTasks.filter(t => t.week === 4).length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveWeekTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeWeekTab === tab.id
                  ? 'bg-brand-indigo-600 text-white shadow-soft-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeWeekTab === tab.id ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Week Sections & Tasks List */}
      <div className="space-y-6">
        {[1, 2, 3, 4].map(weekNum => {
          if (activeWeekTab !== 'ALL' && Number(activeWeekTab) !== weekNum) {
            return null;
          }

          const weekTasks = roadmapTasks.filter(t => t.week === weekNum);
          if (weekTasks.length === 0) return null;

          const weekCompleted = weekTasks.filter(t => t.status === 'Completed').length;

          return (
            <div key={weekNum} className="space-y-4">
              
              {/* Week Header Banner */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-brand-navy-900 text-white flex items-center justify-center font-bold text-xs">
                    W{weekNum}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {weekDescriptions[weekNum]}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {weekTasks.length} milestone tasks • {weekCompleted} of {weekTasks.length} completed
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-brand-indigo-600 bg-brand-indigo-50 px-2.5 py-1 rounded-full border border-brand-indigo-100">
                  {Math.round((weekCompleted / weekTasks.length) * 100)}% Week Done
                </span>
              </div>

              {/* Tasks in this week */}
              <div className="space-y-4">
                {weekTasks.map(task => {
                  const isExpanded = expandedTasks.has(task.id);
                  const isCompleted = task.status === 'Completed';
                  const isInProgress = task.status === 'In Progress';

                  return (
                    <div
                      key={task.id}
                      className={`rounded-2xl border transition-all duration-200 shadow-soft-sm overflow-hidden ${
                        isCompleted
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : isInProgress
                          ? 'border-brand-indigo-200 bg-brand-indigo-50/15'
                          : 'border-slate-200/90 bg-white'
                      }`}
                    >
                      {/* Card Header & Working Status Selector */}
                      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-base text-slate-900">
                              {task.title}
                            </span>
                            <PriorityBadge priority={task.priority} size="xs" />
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {task.estimatedHours}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                            {task.importanceReason}
                          </p>

                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span>Level:</span>
                            <LevelBadge level={task.currentLevel} label={task.currentLabel} />
                            <span>&rarr;</span>
                            <LevelBadge level={task.requiredLevel} label={task.requiredLabel} />
                          </div>
                        </div>

                        {/* Working Interactive Status Control */}
                        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">
                            Status:
                          </label>
                          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                            {[
                              { key: 'Not Started', label: 'Not Started' },
                              { key: 'In Progress', label: 'In Progress' },
                              { key: 'Completed', label: 'Completed' }
                            ].map(st => {
                              const isCurrent = task.status === st.key;
                              return (
                                <button
                                  key={st.key}
                                  type="button"
                                  onClick={() => updateTaskStatus(task.id, st.key)}
                                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                                    isCurrent
                                      ? st.key === 'Completed'
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : st.key === 'In Progress'
                                        ? 'bg-brand-indigo-600 text-white shadow-xs'
                                        : 'bg-white text-slate-800 shadow-xs'
                                      : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  {st.label}
                                </button>
                              );
                            })}
                          </div>

                          {/* Expand/Collapse details button */}
                          <button
                            onClick={() => toggleTaskExpanded(task.id)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors ml-1"
                            title={isExpanded ? 'Collapse study details' : 'Expand topics & mini-project'}
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Section: Topics, Exercises, Mini-Project & Genuine Resources */}
                      <div className={`px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Recommended Topics */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                              <BookOpen className="w-3.5 h-3.5 text-brand-indigo-600" />
                              <span>Core Study Topics</span>
                            </h4>
                            <ul className="space-y-1">
                              {task.topics.map((tp, idx) => (
                                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo-500 mt-1.5 shrink-0" />
                                  <span>{tp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Practice Exercises */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                              <Code className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Practice Exercises</span>
                            </h4>
                            <ul className="space-y-1">
                              {task.practiceExercises.map((ex, idx) => (
                                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>

                        {/* Hands-on Mini-Project */}
                        {task.miniProject && (
                          <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-brand-purple-electric/10 text-brand-purple-600 shrink-0">
                              <FolderGit2 className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                                Suggested Mini-Project
                              </span>
                              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                                {task.miniProject}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Free Curated Learning Resources with Genuine URLs */}
                        {task.resources && task.resources.length > 0 && (
                          <div className="pt-2">
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Verified Free Learning Resources
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {task.resources.map((res, idx) => (
                                <a
                                  key={idx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-brand-indigo-300 hover:bg-brand-indigo-50/60 text-xs text-slate-700 hover:text-brand-indigo-700 font-medium transition-all shadow-2xs group"
                                >
                                  <span>{res.title}</span>
                                  <span className="text-[10px] text-slate-400 group-hover:text-brand-indigo-500">({res.provider})</span>
                                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-brand-indigo-600" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
