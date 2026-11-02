// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Cpu, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-navy-900 via-brand-indigo-600 to-brand-purple-electric flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 text-indigo-100" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                SkillSync AI
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Student Skill Gap Detector. Empowers college students to evaluate their skill readiness against industry job benchmarks.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600">
              <Cpu className="w-3 h-3 text-brand-indigo-600" />
              <span>Transparent Rule-Based Engine</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/assessment" className="hover:text-brand-indigo-600 transition-colors">
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-indigo-600 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/gap-analysis" className="hover:text-brand-indigo-600 transition-colors">
                  Skill Gap Analysis
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-brand-indigo-600 transition-colors">
                  Learning Roadmap
                </Link>
              </li>
              <li>
                <Link to="/career-explorer" className="hover:text-brand-indigo-600 transition-colors">
                  Career Match Explorer
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-brand-indigo-600 transition-colors">
                  Executive Gap Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Roles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Supported Roles
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-500">
              <span>Frontend Developer</span>
              <span>Backend Developer</span>
              <span>Software Developer</span>
              <span>Data Analyst</span>
              <span>Data Scientist</span>
              <span>AI/ML Engineer</span>
              <span>Cybersecurity</span>
              <span>Cloud Engineer</span>
            </div>
          </div>

          {/* Prototype Disclosure */}
          <div className="space-y-2 text-xs text-slate-500">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Academic Prototype
            </h4>
            <p className="leading-relaxed">
              Designed as a college project prototype. Uses zero backend, zero paid APIs, and persistent client-side LocalStorage.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Code2 className="w-3.5 h-3.5" />
              <span>React 18 • Vite • Tailwind • Recharts</span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} SkillSync AI. Academic Prototype for College Project Showcase.</p>
          <p className="flex items-center gap-1">
            Built for Computer Science & Engineering students
          </p>
        </div>
      </div>
    </footer>
  );
}
