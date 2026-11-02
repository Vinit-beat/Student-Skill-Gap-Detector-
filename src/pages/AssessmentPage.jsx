// src/pages/AssessmentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  FileText, 
  UploadCloud, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Award, 
  Search,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES, ALL_AVAILABLE_SKILLS } from '../data/rolesData';
import { DEMO_PROFILE } from '../data/demoProfile';

const COMMON_SKILLS = [
  { name: 'HTML5 & Modern CSS', category: 'Technical' },
  { name: 'JavaScript (ES6+)', category: 'Technical' },
  { name: 'React.js', category: 'Technical' },
  { name: 'TypeScript', category: 'Technical' },
  { name: 'Node.js or Python Backend', category: 'Technical' },
  { name: 'SQL & Relational Databases (PostgreSQL)', category: 'Technical' },
  { name: 'Git & Version Control', category: 'Tools' },
  { name: 'Docker & Containerization', category: 'Tools' },
  { name: 'Team Collaboration & Communication', category: 'Soft' },
  { name: 'Analytical Problem Solving', category: 'Soft' },
  { name: 'Python for Data Analysis (Pandas, NumPy)', category: 'Technical' },
  { name: 'Deep Learning & PyTorch', category: 'Technical' },
  { name: 'Computer Networks & Protocols', category: 'Technical' },
  { name: 'Cloud Platform Services (AWS / Azure / GCP)', category: 'Technical' },
  { name: 'UI/UX Design Fundamentals', category: 'Technical' },
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const { profile, updateProfile, loadDemoData, showToast } = useApp();

  // Form State initialized from AppContext
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    degree: profile?.degree || 'B.Tech',
    branch: profile?.branch || 'Computer Science',
    academicYear: profile?.academicYear || 'Third Year',
    targetRole: profile?.targetRole || 'frontend-developer',
    skills: profile?.skills || [],
    projects: profile?.projects || [],
    internships: profile?.internships || [],
    certifications: profile?.certifications || [],
    resumeFile: profile?.resumeFile || null
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Skill search & add state
  const [skillSearch, setSkillSearch] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Technical');
  const [newSkillLevel, setNewSkillLevel] = useState(2); // Intermediate default

  // New Project Form state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', link: '' });

  // New Internship Form state
  const [showInternshipModal, setShowInternshipModal] = useState(false);
  const [newInternship, setNewInternship] = useState({ role: '', organization: '', duration: '', highlights: '' });

  // New Certification Form state
  const [showCertModal, setShowCertModal] = useState(false);
  const [newCert, setNewCert] = useState({ title: '', issuer: '', issueDate: '', credentialUrl: '' });

  // Handle Input Changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Add a skill
  const handleAddSkill = (skillName, category = newSkillCategory, level = newSkillLevel) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;

    // Check if skill already exists
    const exists = formData.skills.some(
      s => s.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      showToast(`"${trimmed}" is already in your skills list.`, 'info');
      return;
    }

    const updatedSkills = [
      ...formData.skills,
      { name: trimmed, category: category || 'Technical', level: Number(level) }
    ];

    setFormData(prev => ({ ...prev, skills: updatedSkills }));
    setSkillSearch('');
    if (errors.skills) {
      setErrors(prev => ({ ...prev, skills: null }));
    }
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    const updated = formData.skills.filter((_, idx) => idx !== index);
    setFormData(prev => ({ ...prev, skills: updated }));
  };

  // Change proficiency level for existing skill
  const handleProficiencyChange = (index, newLevel) => {
    const updated = formData.skills.map((skill, idx) => {
      if (idx === index) {
        return { ...skill, level: Number(newLevel) };
      }
      return skill;
    });
    setFormData(prev => ({ ...prev, skills: updated }));
  };

  // Add Project
  const handleAddProject = () => {
    if (!newProject.title.trim()) return;
    const projectItem = {
      id: `p-${Date.now()}`,
      ...newProject
    };
    setFormData(prev => ({ ...prev, projects: [...prev.projects, projectItem] }));
    setNewProject({ title: '', description: '', technologies: '', link: '' });
    setShowProjectModal(false);
    showToast('Project added!', 'success');
  };

  const handleRemoveProject = (id) => {
    setFormData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  // Add Internship
  const handleAddInternship = () => {
    if (!newInternship.role.trim()) return;
    const item = {
      id: `i-${Date.now()}`,
      ...newInternship
    };
    setFormData(prev => ({ ...prev, internships: [...prev.internships, item] }));
    setNewInternship({ role: '', organization: '', duration: '', highlights: '' });
    setShowInternshipModal(false);
    showToast('Internship added!', 'success');
  };

  const handleRemoveInternship = (id) => {
    setFormData(prev => ({ ...prev, internships: prev.internships.filter(i => i.id !== id) }));
  };

  // Add Certification
  const handleAddCert = () => {
    if (!newCert.title.trim()) return;
    const item = {
      id: `c-${Date.now()}`,
      ...newCert
    };
    setFormData(prev => ({ ...prev, certifications: [...prev.certifications, item] }));
    setNewCert({ title: '', issuer: '', issueDate: '', credentialUrl: '' });
    setShowCertModal(false);
    showToast('Certification added!', 'success');
  };

  const handleRemoveCert = (id) => {
    setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  // Handle Resume Upload
  const handleResumeSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const resumeInfo = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      setFormData(prev => ({ ...prev, resumeFile: resumeInfo }));
      showToast(`Selected: ${file.name}. You can enter your skills below.`, 'info');
    }
  };

  // Populate Demo Data
  const handleLoadDemo = () => {
    loadDemoData();
    setFormData({ ...DEMO_PROFILE });
  };

  // Validate and Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter student name';
    }
    if (!formData.skills || formData.skills.length === 0) {
      newErrors.skills = 'Please add at least 1 technical or soft skill for analysis';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    // Save profile to context and localStorage
    updateProfile(formData);
    showToast('Profile and skills saved successfully! Running gap analysis...', 'success');
    navigate('/gap-analysis');
  };

  // Filter suggested skills based on search
  const filteredSuggestions = COMMON_SKILLS.filter(s => 
    s.name.toLowerCase().includes(skillSearch.toLowerCase()) &&
    !formData.skills.some(existing => existing.name.toLowerCase() === s.name.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded">
              Profile & Assessment
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Student Skill Assessment Form
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enter your current competencies, target career, and academic credentials for algorithmic gap analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadDemo}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 hover:from-brand-indigo-700 hover:to-brand-purple-700 text-white text-xs font-semibold shadow-soft-sm transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Load Demo Profile</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Academic & Target Profile */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-brand-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              1. Student Academic Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-rose-300 focus:ring-rose-500 text-rose-900'
                    : 'border-slate-200 focus:ring-brand-indigo-500 text-slate-800'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Degree */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Degree
              </label>
              <select
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo-500 text-slate-800"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="B.E.">B.E.</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Sc CS/IT">B.Sc CS / IT</option>
                <option value="M.Tech">M.Tech</option>
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Academic Year
              </label>
              <select
                value={formData.academicYear}
                onChange={(e) => handleInputChange('academicYear', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo-500 text-slate-800"
              >
                <option value="First Year">First Year (1st)</option>
                <option value="Second Year">Second Year (2nd)</option>
                <option value="Third Year">Third Year (3rd)</option>
                <option value="Final Year">Final Year (4th)</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>

            {/* Branch */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Department / Branch
              </label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
                placeholder="e.g. Computer Science and Engineering"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo-500 text-slate-800"
              >
              </input>
            </div>

            {/* Target Role Selector */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Career Role <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.targetRole}
                onChange={(e) => handleInputChange('targetRole', e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-semibold rounded-xl border border-brand-indigo-200 bg-brand-indigo-50/40 text-brand-indigo-900 focus:outline-none focus:ring-2 focus:ring-brand-indigo-500"
              >
                {CAREER_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.skills.length} Required Skills Benchmark)
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Optional Resume Upload */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resume Upload (Optional PDF / DOCX)
            </label>
            <p className="text-[11px] text-slate-400 mb-2">
              Frontend prototype note: Resumes are held locally in browser memory. Please confirm or enter your skills below.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors">
                <UploadCloud className="w-4 h-4 text-brand-indigo-600" />
                <span>Choose Resume File (.pdf, .docx)</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleResumeSelect}
                  className="hidden"
                />
              </label>

              {formData.resumeFile && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">{formData.resumeFile.name}</span>
                  <span className="text-[11px] text-emerald-600">({formData.resumeFile.size})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Technical & Soft Skills Assessment */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-indigo-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  2. Student Skills & Self-Assessed Proficiencies
                </h2>
                <p className="text-xs text-slate-500">
                  Select your skills and specify your proficiency level: Beginner (1), Intermediate (2), or Advanced (3).
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-brand-indigo-600 bg-brand-indigo-50 px-2.5 py-1 rounded-full self-start sm:self-auto">
              {formData.skills.length} Skills Added
            </span>
          </div>

          {errors.skills && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errors.skills}</span>
            </div>
          )}

          {/* Search and Quick Add Bar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Add Skills to Your Inventory
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(skillSearch);
                    }
                  }}
                  placeholder="Type a skill (e.g. React, SQL, Python, Git, Docker, Communication)..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo-500 text-slate-800"
                />
              </div>

              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-brand-indigo-500"
              >
                <option value="Technical">Technical</option>
                <option value="Tools">Tools / DevOps</option>
                <option value="Soft">Soft Skill</option>
              </select>

              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-brand-indigo-500"
              >
                <option value={1}>Level 1: Beginner</option>
                <option value={2}>Level 2: Intermediate</option>
                <option value={3}>Level 3: Advanced</option>
              </select>

              <button
                type="button"
                onClick={() => handleAddSkill(skillSearch)}
                disabled={!skillSearch.trim()}
                className="px-4 py-2 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1 shrink-0 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            {filteredSuggestions.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 font-medium mr-2">Suggestions:</span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1">
                  {filteredSuggestions.slice(0, 8).map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddSkill(s.name, s.category, 2)}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-brand-indigo-300 hover:bg-brand-indigo-50 text-[11px] font-medium text-slate-600 hover:text-brand-indigo-700 transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-2.5 h-2.5 text-brand-indigo-500" />
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Skills Table / List */}
          {formData.skills.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-200">
              <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No skills added yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Add your technical and soft skills above, or click "Load Demo Profile" to populate realistic data.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="hidden sm:grid grid-cols-12 gap-3 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <div className="col-span-5">Skill Name</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-4">Proficiency Level</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:grid sm:grid-cols-12 gap-3 items-start sm:items-center p-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="sm:col-span-5 font-semibold text-sm text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-indigo-500 shrink-0" />
                    <span>{skill.name}</span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {skill.category || 'Technical'}
                    </span>
                  </div>

                  {/* Segmented Level Selector */}
                  <div className="sm:col-span-4 w-full">
                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                      {[
                        { level: 1, label: 'Beginner' },
                        { level: 2, label: 'Intermediate' },
                        { level: 3, label: 'Advanced' }
                      ].map((lvl) => {
                        const isSelected = skill.level === lvl.level;
                        return (
                          <button
                            key={lvl.level}
                            type="button"
                            onClick={() => handleProficiencyChange(index, lvl.level)}
                            className={`py-1 text-center text-xs font-semibold rounded-md transition-all ${
                              isSelected
                                ? 'bg-white text-brand-indigo-700 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {lvl.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-1 flex justify-end w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove Skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Academic Projects */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-brand-indigo-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  3. Academic Projects ({formData.projects.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Highlight course capstones and portfolio works demonstrating practical application.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowProjectModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-brand-indigo-600" />
              <span>Add Project</span>
            </button>
          </div>

          {/* Modal / Inline Add Project Form */}
          {showProjectModal && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                New Project Entry
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Project Title (e.g. Student Portal)"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-brand-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Tech Stack (e.g. React, Tailwind, SQL)"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-brand-indigo-500"
                />
              </div>
              <textarea
                placeholder="Brief description of features, problem solved, and architecture..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-brand-indigo-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-4 py-1.5 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-xs font-semibold"
                >
                  Save Project
                </button>
              </div>
            </div>
          )}

          {formData.projects.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">
              No projects added yet. Click "+ Add Project" or load demo profile.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(proj.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-brand-indigo-600 font-semibold truncate">
                    Tech: {proj.technologies}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Internships & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Internships */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Internships ({formData.internships.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInternshipModal(true)}
                className="text-xs font-semibold text-brand-indigo-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>

            {showInternshipModal && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Role (e.g. Web Dev Intern)"
                  value={newInternship.role}
                  onChange={(e) => setNewInternship({ ...newInternship, role: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md bg-white"
                />
                <input
                  type="text"
                  placeholder="Organization (e.g. Tech Solutions Inc)"
                  value={newInternship.organization}
                  onChange={(e) => setNewInternship({ ...newInternship, organization: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md bg-white"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g. June 2024 - Aug 2024)"
                  value={newInternship.duration}
                  onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md bg-white"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => setShowInternshipModal(false)} className="text-slate-500">Cancel</button>
                  <button type="button" onClick={handleAddInternship} className="px-3 py-1 bg-brand-indigo-600 text-white rounded font-medium">Save</button>
                </div>
              </div>
            )}

            {formData.internships.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No internships added.</p>
            ) : (
              <div className="space-y-2">
                {formData.internships.map(i => (
                  <div key={i.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">{i.role}</h5>
                      <p className="text-[11px] text-slate-500">{i.organization} • {i.duration}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveInternship(i.id)} className="text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Certifications ({formData.certifications.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCertModal(true)}
                className="text-xs font-semibold text-brand-indigo-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>

            {showCertModal && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Certification Title (e.g. Responsive Web Design)"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md bg-white"
                />
                <input
                  type="text"
                  placeholder="Issuer (e.g. freeCodeCamp / Coursera)"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md bg-white"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => setShowCertModal(false)} className="text-slate-500">Cancel</button>
                  <button type="button" onClick={handleAddCert} className="px-3 py-1 bg-brand-indigo-600 text-white rounded font-medium">Save</button>
                </div>
              </div>
            )}

            {formData.certifications.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No certifications added.</p>
            ) : (
              <div className="space-y-2">
                {formData.certifications.map(c => (
                  <div key={c.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">{c.title}</h5>
                      <p className="text-[11px] text-slate-500">{c.issuer} {c.issueDate && `• ${c.issueDate}`}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveCert(c.id)} className="text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Submission Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-md">
          <div className="text-xs text-slate-500">
            Clicking Analyze will run the weighted rule-based gap comparison for <strong>{CAREER_ROLES.find(r => r.id === formData.targetRole)?.title}</strong>.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 hover:from-brand-indigo-700 hover:to-brand-purple-700 text-white font-bold text-sm shadow-soft-lg hover:shadow-soft-xl transition-all"
            >
              <span>Save & Analyze My Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
