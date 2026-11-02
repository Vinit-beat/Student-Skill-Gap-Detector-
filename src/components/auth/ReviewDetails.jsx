// src/components/auth/ReviewDetails.jsx
import React from 'react';
import { 
  User, 
  GraduationCap, 
  Sparkles, 
  Edit3, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { CAREER_ROLES } from '../../data/rolesData';

export default function ReviewDetails({
  formData,
  onEditStep,
  acceptTerms,
  setAcceptTerms,
  termsError
}) {
  const roleName = CAREER_ROLES.find(r => r.id === formData.preferredRole)?.title || formData.preferredRole;

  return (
    <div className="space-y-5 animate-fade-in text-xs">
      
      {/* Information Header */}
      <div className="p-3 rounded-xl bg-brand-indigo-50/70 border border-brand-indigo-100 flex items-start gap-2.5 text-brand-indigo-900">
        <ShieldCheck className="w-4 h-4 text-brand-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Review Your Profile:</span> Verify your academic and skill information below. These details will configure your personalized Skill Gap dashboard.
        </div>
      </div>

      {/* Section 1: Personal Details */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <User className="w-4 h-4 text-brand-indigo-600" />
            <span>Personal Information</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-[11px] font-semibold text-brand-indigo-600 hover:text-brand-indigo-800 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          <div>
            <span className="text-slate-400 block text-[11px]">Full Name</span>
            <strong className="text-slate-800">{formData.fullName}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Username</span>
            <strong className="text-slate-800">@{formData.username}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Email Address</span>
            <strong className="text-slate-800">{formData.email}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Phone Number</span>
            <strong className="text-slate-800">{formData.phone}</strong>
          </div>
          {formData.dob && (
            <div>
              <span className="text-slate-400 block text-[11px]">Date of Birth</span>
              <strong className="text-slate-800">{formData.dob}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Academic Details */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <GraduationCap className="w-4 h-4 text-brand-indigo-600" />
            <span>Academic Details</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-[11px] font-semibold text-brand-indigo-600 hover:text-brand-indigo-800 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          <div className="sm:col-span-2">
            <span className="text-slate-400 block text-[11px]">College / University</span>
            <strong className="text-slate-800">{formData.college}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Degree & Branch</span>
            <strong className="text-slate-800">{formData.degree} in {formData.branch}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Academic Year</span>
            <strong className="text-slate-800">{formData.academicYear} (Class of {formData.graduationYear})</strong>
          </div>
        </div>
      </div>

      {/* Section 3: Skills & Career Goals */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-brand-indigo-600" />
            <span>Skills & Career Target</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-[11px] font-semibold text-brand-indigo-600 hover:text-brand-indigo-800 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
            <div>
              <span className="text-slate-400 block text-[11px]">Preferred Career Role</span>
              <strong className="text-brand-indigo-600">{roleName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Overall Self-Assessed Level</span>
              <strong className="text-slate-800">{formData.currentSkillLevel}</strong>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] mb-1">
              Technical Skills ({formData.technicalSkills.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {formData.technicalSkills.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] mb-1">
              Soft Skills ({formData.softSkills.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {formData.softSkills.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] mb-1">
              Interested Domains ({formData.interestedDomains.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {formData.interestedDomains.map((d) => (
                <span key={d} className="px-2 py-0.5 rounded bg-brand-indigo-50 text-brand-indigo-700 text-[11px] font-medium">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Additional Information (Links & Notes) */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
        <h4 className="font-bold text-slate-800 text-xs">
          Additional Profiles & Notes (Optional)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedIn}
              onChange={(e) => formData.onAdditionalChange('linkedIn', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-brand-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">GitHub Profile URL</label>
            <input
              type="url"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={(e) => formData.onAdditionalChange('github', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-brand-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Projects / Internships Summary</label>
            <textarea
              rows={2}
              placeholder="e.g. Campus Portal in React, Web Dev Intern at Tech Solutions..."
              value={formData.projectsNotes}
              onChange={(e) => formData.onAdditionalChange('projectsNotes', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-brand-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Certifications Summary</label>
            <textarea
              rows={2}
              placeholder="e.g. freeCodeCamp Web Design, Python Data Science..."
              value={formData.certificationsNotes}
              onChange={(e) => formData.onAdditionalChange('certificationsNotes', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-brand-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Terms & Conditions Acceptance Checkbox */}
      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-brand-indigo-600 focus:ring-brand-indigo-500 mt-0.5"
          />
          <span className="text-xs text-slate-600 leading-snug">
            I agree to the <span className="text-brand-indigo-600 font-semibold underline">Terms and Conditions</span> and acknowledge that this is a college academic prototype for skill-gap analysis.
          </span>
        </label>

        {termsError && (
          <p className="text-[11px] text-rose-600 font-medium pl-6">{termsError}</p>
        )}
      </div>

    </div>
  );
}
