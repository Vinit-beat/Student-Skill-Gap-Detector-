// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  LayoutDashboard, 
  FileEdit, 
  GitCompare, 
  Map, 
  Compass, 
  FileText,
  Briefcase,
  ChevronDown,
  RotateCcw,
  User,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAREER_ROLES } from '../../data/rolesData';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    profile, 
    loadDemoData, 
    clearProfileToBlank, 
    analysis, 
    targetRoleId, 
    setTargetRole,
    authSession,
    signOut
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/assessment', label: 'Assessment', icon: FileEdit },
    { to: '/gap-analysis', label: 'Gap Analysis', icon: GitCompare },
    { to: '/roadmap', label: 'Roadmap', icon: Map },
    { to: '/career-explorer', label: 'Career Match', icon: Compass },
    { to: '/report', label: 'Report', icon: FileText },
  ];

  const currentRole = CAREER_ROLES.find(r => r.id === targetRoleId) || CAREER_ROLES[0];
  const currentUser = authSession?.user;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-soft-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-navy-900 via-brand-indigo-600 to-brand-purple-electric flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-brand-indigo-600 transition-colors">
                  SkillSync
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-indigo-50 text-brand-indigo-600 border border-brand-indigo-100">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 hidden sm:block">
                Skill Gap Detector
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-brand-indigo-50 text-brand-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Target Role Selector & Global Actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            
            {/* Quick Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
                title="Switch Target Career Role"
              >
                <Briefcase className="w-3.5 h-3.5 text-brand-indigo-600" />
                <span className="max-w-[120px] truncate">{currentRole.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setRoleDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-soft-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Target Career Role
                    </div>
                    {CAREER_ROLES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setTargetRole(r.id);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          r.id === targetRoleId ? 'font-semibold text-brand-indigo-600 bg-brand-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{r.title}</span>
                        {r.id === targetRoleId && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Live Score Pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <span className="text-[11px] text-slate-400 font-normal">Score:</span>
              <span className={analysis.readinessScore >= 75 ? 'text-emerald-600' : analysis.readinessScore >= 50 ? 'text-brand-indigo-600' : 'text-amber-600'}>
                {analysis.readinessScore}%
              </span>
            </div>

            {/* User Account / Auth Dropdown or Sign In CTA */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-indigo-600 to-brand-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                    {currentUser.fullName?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-soft-xl border border-slate-200 py-2 z-50 text-xs animate-fade-in">
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{currentUser.fullName}</p>
                        <p className="text-[11px] text-slate-400 truncate">@{currentUser.username}</p>
                        <p className="text-[10px] text-brand-indigo-600 font-semibold mt-0.5">{currentUser.degree} • {currentUser.academicYear}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          <span>Student Dashboard</span>
                        </Link>
                        <Link
                          to="/assessment"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <FileEdit className="w-4 h-4 text-slate-400" />
                          <span>Skill Assessment</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 font-medium text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/auth?mode=signin"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-brand-indigo-300 hover:bg-brand-indigo-50/50 text-slate-700 hover:text-brand-indigo-600 text-xs font-semibold transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-brand-indigo-600" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}

            {/* Load Demo Data Button */}
            <button
              onClick={loadDemoData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 hover:from-brand-indigo-700 hover:to-brand-purple-700 text-white text-xs font-semibold shadow-xs hover:shadow-soft-md transition-all active:scale-95"
              title="Populate form with realistic 3rd-year CS student data"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>Demo Data</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/auth?mode=signin"
              className="px-2.5 py-1 rounded-lg bg-brand-indigo-50 text-brand-indigo-700 border border-brand-indigo-100 text-xs font-semibold"
            >
              {currentUser ? 'Account' : 'Sign In'}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="text-xs text-slate-500">
              Student: <strong className="text-slate-800">{profile?.name || 'Guest Student'}</strong>
            </div>
            <div className="text-xs font-bold text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded-full border border-brand-indigo-100">
              Readiness: {analysis.readinessScore}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-brand-indigo-50 text-brand-indigo-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-slate-400" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth Links */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.fullName?.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">{currentUser.fullName}</p>
                    <p className="text-[10px] text-slate-400">@{currentUser.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Link
                  to="/auth?mode=signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-1.5 text-center rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-1.5 text-center rounded-lg bg-brand-indigo-600 text-white text-xs font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500">Target Role</label>
            <select
              value={targetRoleId}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full text-xs py-2 px-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:ring-2 focus:ring-brand-indigo-500"
            >
              {CAREER_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  loadDemoData();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-brand-indigo-600 text-white text-xs font-semibold text-center"
              >
                Load Demo Profile
              </button>
              <button
                onClick={() => {
                  clearProfileToBlank();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50"
                title="Clear to blank assessment"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
