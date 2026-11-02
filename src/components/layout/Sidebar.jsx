// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileEdit, 
  GitCompare, 
  Map, 
  Compass, 
  FileText, 
  Sparkles,
  RotateCcw,
  User,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Target,
  LogIn,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAREER_ROLES } from '../../data/rolesData';

export default function Sidebar() {
  const { 
    profile, 
    analysis, 
    targetRoleId, 
    setTargetRole, 
    loadDemoData, 
    clearProfileToBlank, 
    roadmapProgress,
    authSession,
    signOut
  } = useApp();

  const currentRole = CAREER_ROLES.find(r => r.id === targetRoleId) || CAREER_ROLES[0];
  const currentUser = authSession?.user;

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { to: '/assessment', label: 'Skill Assessment', icon: FileEdit, badge: `${profile?.skills?.length || 0} skills` },
    { to: '/gap-analysis', label: 'Gap Analysis', icon: GitCompare, badge: `${analysis.readinessScore}%` },
    { to: '/roadmap', label: 'Learning Roadmap', icon: Map, badge: `${roadmapProgress}%` },
    { to: '/career-explorer', label: 'Career Explorer', icon: Compass, badge: '8 Roles' },
    { to: '/report', label: 'Executive Report', icon: FileText, badge: null },
    { 
      to: currentUser ? '/dashboard' : '/auth?mode=signin', 
      label: currentUser ? 'My Account' : 'Sign In / Register', 
      icon: User, 
      badge: currentUser ? 'Active' : 'New' 
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] p-4 shrink-0 no-print">
      
      {/* Student Profile Quick Card */}
      <div className="p-3.5 mb-4 rounded-xl bg-gradient-to-br from-slate-50 to-brand-indigo-50/40 border border-slate-200/90 shadow-soft-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-indigo-600 to-brand-purple-electric text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {profile?.name || 'Guest Student'}
            </h4>
            <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{profile?.degree || 'B.Tech'} • {profile?.academicYear || '3rd Year'}</span>
            </p>
          </div>
        </div>

        {/* Target Role Selector in Sidebar */}
        <div className="mt-3 pt-3 border-t border-slate-200/70">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between mb-1">
            <span>Target Role</span>
            <span className="text-[10px] text-brand-indigo-600 font-medium">Change</span>
          </label>
          <select
            value={targetRoleId}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo-500"
          >
            {CAREER_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>

        {/* Readiness Micro-Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
            <span className="text-slate-500">Readiness Score</span>
            <span className="font-bold text-brand-indigo-600">{analysis.readinessScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, analysis.readinessScore))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1">
        <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-brand-indigo-600 text-white shadow-soft-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Demo Controls Card */}
      <div className="mt-auto pt-4 border-t border-slate-200/80 space-y-2">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <p className="text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-indigo-600" />
            <span>Prototype Demo Tools</span>
          </p>
          <p className="text-[10px] text-slate-500 mb-2.5 leading-relaxed">
            Fill realistic student data to test analysis, charts, and 4-week roadmap.
          </p>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={loadDemoData}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Sparkles className="w-3 h-3 text-indigo-200" />
              <span>Load Demo Profile</span>
            </button>
            <button
              onClick={clearProfileToBlank}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset Blank Profile</span>
            </button>
          </div>
        </div>

        <div className="px-2 text-[10px] text-slate-400 text-center">
          Rule-Based Algorithm • LocalStorage
        </div>
      </div>

    </aside>
  );
}
