// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DEMO_PROFILE } from '../data/demoProfile';
import { CAREER_ROLES } from '../data/rolesData';
import {
  analyzeRoleGap,
  analyzeAllCareerMatches,
  generateRoadmapFromGaps,
  calculateRoadmapProgress
} from '../utils/analysisEngine';
import { authService } from '../services/authService';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  PROFILE: 'skillsync_student_profile_v1',
  ROADMAP: 'skillsync_roadmap_tasks_v1'
};

export function AppProvider({ children }) {
  // Authentication session state
  const [authSession, setAuthSession] = useState(() => {
    return authService.getCurrentSession();
  });

  // Load profile from localStorage or fallback to DEMO_PROFILE
  const [profile, setProfileState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Error loading saved profile:', err);
    }
    return DEMO_PROFILE;
  });

  // Target role shortcut
  const targetRoleId = profile?.targetRole || 'frontend-developer';

  // Roadmap tasks state
  const [roadmapTasks, setRoadmapTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Error loading saved roadmap:', err);
    }
    return [];
  });

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Synchronize profile changes to localStorage
  const updateProfile = (newProfile) => {
    setProfileState(newProfile);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    } catch (err) {
      console.error('Failed to save profile to localStorage:', err);
    }
    // Also refresh current session if user updated their own profile
    setAuthSession(authService.getCurrentSession());
  };

  // Change target role directly
  const setTargetRole = (roleId) => {
    const updated = {
      ...profile,
      targetRole: roleId
    };
    updateProfile(updated);
    showToast(`Target role changed to ${CAREER_ROLES.find(r => r.id === roleId)?.title || roleId}`, 'info');
  };

  // Load realistic demo data
  const loadDemoData = () => {
    updateProfile(DEMO_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEYS.ROADMAP);
    } catch (e) {}
    setRoadmapTasks([]);
    showToast('Loaded demo profile with 3rd-year CS student data!', 'success');
  };

  // Clear to an empty profile to test fresh assessment flow
  const clearProfileToBlank = () => {
    const blankProfile = {
      name: '',
      degree: 'B.Tech',
      branch: 'Computer Science',
      academicYear: 'First Year',
      targetRole: 'software-developer',
      skills: [],
      projects: [],
      internships: [],
      certifications: [],
      resumeFile: null
    };
    updateProfile(blankProfile);
    setRoadmapTasks([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.ROADMAP);
    } catch (e) {}
    showToast('Profile cleared. Ready for a new assessment!', 'info');
  };

  // User Sign Out
  const signOut = () => {
    authService.signOut();
    setAuthSession(null);
    showToast('Signed out of SkillSync AI demo session.', 'info');
  };

  // Compute live gap analysis for current student against current target role
  const analysis = useMemo(() => {
    return analyzeRoleGap(profile, targetRoleId);
  }, [profile, targetRoleId]);

  // Compute live rankings across all 8 roles
  const allRolesAnalysis = useMemo(() => {
    return analyzeAllCareerMatches(profile);
  }, [profile]);

  // Synchronize or generate roadmap tasks when analysis changes
  useEffect(() => {
    if (!analysis || !analysis.allGaps) return;

    setRoadmapTasks(prevTasks => {
      const generated = generateRoadmapFromGaps(analysis, prevTasks);
      try {
        localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(generated));
      } catch (err) {
        console.error('Error saving roadmap:', err);
      }
      return generated;
    });
  }, [analysis]);

  // Update a specific roadmap task's status ('Not Started', 'In Progress', 'Completed')
  const updateTaskStatus = (taskId, newStatus) => {
    setRoadmapTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === taskId) {
          return { ...t, status: newStatus };
        }
        return t;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast(`Task status updated to "${newStatus}"`, 'info');
  };

  // Reset all roadmap progress to 'Not Started'
  const resetRoadmapProgress = () => {
    setRoadmapTasks(prev => {
      const reset = prev.map(t => ({ ...t, status: 'Not Started' }));
      try {
        localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(reset));
      } catch (e) {}
      return reset;
    });
    showToast('Roadmap progress has been reset to 0%.', 'info');
  };

  // Compute roadmap completion percentage
  const roadmapProgress = useMemo(() => {
    return calculateRoadmapProgress(roadmapTasks);
  }, [roadmapTasks]);

  const value = {
    profile,
    updateProfile,
    targetRoleId,
    setTargetRole,
    loadDemoData,
    clearProfileToBlank,
    analysis,
    allRolesAnalysis,
    roadmapTasks,
    updateTaskStatus,
    resetRoadmapProgress,
    roadmapProgress,
    showToast,
    toast,
    authSession,
    signOut
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
