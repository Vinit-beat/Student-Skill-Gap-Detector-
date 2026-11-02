// src/utils/analysisEngine.js
// Transparent, rule-based algorithmic analysis engine for SkillSync AI

import { CAREER_ROLES, PROFICIENCY_LABELS } from '../data/rolesData';

/**
 * Normalizes skill string for robust matching across variants
 * e.g., "React" matches "React.js", "HTML" matches "HTML5 & Modern CSS", etc.
 */
export function normalizeSkillName(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[()&/+,.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Finds student's skill proficiency for a given target role skill.
 * Checks exact match, normalized match, and token containment.
 */
export function findStudentSkillMatch(studentSkills = [], targetSkill) {
  if (!Array.isArray(studentSkills) || studentSkills.length === 0) {
    return null;
  }

  const targetNorm = normalizeSkillName(targetSkill.name);
  const targetId = targetSkill.id.toLowerCase();

  // 1. Exact match on name
  let matched = studentSkills.find(
    s => s.name.trim().toLowerCase() === targetSkill.name.trim().toLowerCase()
  );
  if (matched) return matched;

  // 2. Normalized match
  matched = studentSkills.find(s => normalizeSkillName(s.name) === targetNorm);
  if (matched) return matched;

  // 3. Substring / Token matching
  matched = studentSkills.find(s => {
    const sNorm = normalizeSkillName(s.name);
    if (!sNorm) return false;
    // Check if one contains the other or matches key tokens
    if (targetNorm.includes(sNorm) || sNorm.includes(targetNorm)) return true;
    
    // Check specific known mappings
    if (sNorm.includes('react') && targetNorm.includes('react')) return true;
    if (sNorm.includes('javascript') && targetNorm.includes('javascript')) return true;
    if (sNorm.includes('python') && targetNorm.includes('python')) return true;
    if (sNorm.includes('sql') && targetNorm.includes('sql')) return true;
    if (sNorm.includes('git') && targetNorm.includes('git')) return true;
    if (sNorm.includes('docker') && targetNorm.includes('docker')) return true;
    if (sNorm.includes('aws') && targetNorm.includes('aws')) return true;
    if (sNorm.includes('typescript') && targetNorm.includes('typescript')) return true;
    if (sNorm.includes('html') && targetNorm.includes('html')) return true;
    if (sNorm.includes('css') && targetNorm.includes('css')) return true;
    if (sNorm.includes('communication') && targetNorm.includes('communication')) return true;
    
    return false;
  });

  return matched || null;
}

/**
 * Calculates priority based on skill gap and role importance weight
 * Priority thresholds:
 * - High: gap >= 2 & weight >= 2, OR gap >= 1 & weight === 3, OR gap >= 3
 * - Medium: gap === 1 & weight === 2, OR gap >= 2 & weight === 1
 * - Low: gap === 1 & weight === 1
 * - None: gap === 0
 */
export function calculatePriority(gap, weight) {
  if (gap <= 0) return 'None';
  if (gap >= 3) return 'High';
  if (gap >= 2 && weight >= 2) return 'High';
  if (gap >= 1 && weight === 3) return 'High';
  if (gap === 1 && weight === 2) return 'Medium';
  if (gap >= 2 && weight === 1) return 'Medium';
  return 'Low';
}

/**
 * Analyzes a student profile against a specific career role
 */
export function analyzeRoleGap(studentProfile, roleId) {
  const role = CAREER_ROLES.find(r => r.id === roleId) || CAREER_ROLES[0];
  const studentSkills = studentProfile?.skills || [];

  let sumNumerator = 0;
  let sumDenominator = 0;

  const analyzedSkills = role.skills.map(roleSkill => {
    const studentMatch = findStudentSkillMatch(studentSkills, roleSkill);
    const currentLevel = studentMatch ? Number(studentMatch.level) : 0;
    const requiredLevel = Number(roleSkill.requiredLevel);
    const weight = Number(roleSkill.weight) || 1;

    const skillGap = Math.max(0, requiredLevel - currentLevel);

    // Weighted readiness formula: sum(weight * min(currentLevel, requiredLevel)) / sum(weight * requiredLevel) * 100
    sumNumerator += weight * Math.min(currentLevel, requiredLevel);
    sumDenominator += weight * requiredLevel;

    let status = 'Missing';
    if (currentLevel >= requiredLevel) {
      status = 'Matched';
    } else if (currentLevel > 0) {
      status = 'Needs Improvement';
    } else {
      status = 'Missing';
    }

    const priority = calculatePriority(skillGap, weight);

    return {
      ...roleSkill,
      currentLevel,
      requiredLevel,
      currentLabel: PROFICIENCY_LABELS[currentLevel] || 'Missing',
      requiredLabel: PROFICIENCY_LABELS[requiredLevel] || 'Intermediate',
      skillGap,
      weight,
      status, // 'Matched' | 'Needs Improvement' | 'Missing'
      priority, // 'High' | 'Medium' | 'Low' | 'None'
      studentSkillName: studentMatch ? studentMatch.name : null
    };
  });

  const rawScore = sumDenominator > 0 ? (sumNumerator / sumDenominator) * 100 : 0;
  const readinessScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  const matchedSkills = analyzedSkills.filter(s => s.status === 'Matched');
  const needsImprovementSkills = analyzedSkills.filter(s => s.status === 'Needs Improvement');
  const missingSkills = analyzedSkills.filter(s => s.status === 'Missing');

  // Gaps sorted by priority: High first, then Medium, then Low
  const priorityOrder = { High: 0, Medium: 1, Low: 2, None: 3 };
  const allGaps = [...needsImprovementSkills, ...missingSkills].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.weight - a.weight;
  });

  // Top 3 skills to improve
  const topRecommendations = allGaps.slice(0, 3);

  // Distribution for charts
  const priorityDistribution = [
    { name: 'High Priority', count: allGaps.filter(s => s.priority === 'High').length, color: '#ef4444' },
    { name: 'Medium Priority', count: allGaps.filter(s => s.priority === 'Medium').length, color: '#f59e0b' },
    { name: 'Low Priority', count: allGaps.filter(s => s.priority === 'Low').length, color: '#3b82f6' },
  ];

  const statusDistribution = [
    { name: 'Matched', count: matchedSkills.length, color: '#10b981' },
    { name: 'Needs Improvement', count: needsImprovementSkills.length, color: '#f59e0b' },
    { name: 'Missing', count: missingSkills.length, color: '#ef4444' },
  ];

  return {
    role,
    readinessScore,
    analyzedSkills,
    matchedCount: matchedSkills.length,
    needsImprovementCount: needsImprovementSkills.length,
    missingCount: missingSkills.length,
    totalRequired: role.skills.length,
    matchedSkills,
    needsImprovementSkills,
    missingSkills,
    allGaps,
    topRecommendations,
    priorityDistribution,
    statusDistribution,
    formulaExplanation: `Score = (${sumNumerator.toFixed(1)} / ${sumDenominator.toFixed(1)}) × 100 = ${readinessScore}%`
  };
}

/**
 * Analyzes student profile against all 8 career roles to generate comparison rankings
 */
export function analyzeAllCareerMatches(studentProfile) {
  return CAREER_ROLES.map(role => {
    const analysis = analyzeRoleGap(studentProfile, role.id);
    return {
      roleId: role.id,
      title: role.title,
      category: role.category,
      badge: role.badge,
      iconName: role.iconName,
      marketDemand: role.marketDemand,
      salaryRange: role.salaryRange,
      readinessScore: analysis.readinessScore,
      matchedCount: analysis.matchedCount,
      needsImprovementCount: analysis.needsImprovementCount,
      missingCount: analysis.missingCount,
      totalCount: role.skills.length,
      topStrengths: analysis.matchedSkills.map(s => s.name).slice(0, 3),
      criticalGaps: analysis.allGaps.filter(g => g.priority === 'High').map(g => g.name).slice(0, 3),
      analysis
    };
  }).sort((a, b) => b.readinessScore - a.readinessScore);
}

/**
 * Generates a structured 4-Week Learning Roadmap from identified skill gaps
 */
export function generateRoadmapFromGaps(analysisResult, existingTasks = []) {
  if (!analysisResult || !analysisResult.allGaps || analysisResult.allGaps.length === 0) {
    return [];
  }

  // Preserve existing statuses if tasks were already tracked in localStorage
  const statusMap = new Map();
  if (Array.isArray(existingTasks)) {
    existingTasks.forEach(task => {
      statusMap.set(task.id, task.status);
    });
  }

  const gaps = [...analysisResult.allGaps];

  // Distribute tasks across 4 weeks:
  // Week 1: High Priority foundational skills
  // Week 2: High Priority advanced & Core framework gaps
  // Week 3: Medium Priority architecture & tool integrations
  // Week 4: Polish, Low Priority gaps, & Portfolio Capstone Mini-Project
  const highGaps = gaps.filter(g => g.priority === 'High');
  const medGaps = gaps.filter(g => g.priority === 'Medium');
  const lowGaps = gaps.filter(g => g.priority === 'Low');

  const tasks = [];

  // Week 1: Top 2-3 High Priority gaps
  const week1Skills = highGaps.slice(0, 2);
  // Week 2: Next High Priority gaps + any remaining
  const week2Skills = highGaps.slice(2, 4);
  if (week2Skills.length < 2 && medGaps.length > 0) {
    week2Skills.push(medGaps[0]);
  }
  // Week 3: Medium Priority gaps
  const week3Skills = medGaps.slice(medGaps.includes(week2Skills[week2Skills.length - 1]) ? 1 : 0, 3);
  // Week 4: Remaining Medium + Low Priority gaps
  const assigned = new Set([...week1Skills, ...week2Skills, ...week3Skills].map(s => s.id));
  const week4Skills = gaps.filter(g => !assigned.has(g.id)).slice(0, 3);

  // Helper to construct a task object
  const buildTask = (skill, weekNum) => {
    const taskId = `task-${skill.id}-w${weekNum}`;
    const previousStatus = statusMap.get(taskId) || 'Not Started';

    return {
      id: taskId,
      skillId: skill.id,
      skillName: skill.name,
      category: skill.category,
      priority: skill.priority,
      status: previousStatus, // 'Not Started' | 'In Progress' | 'Completed'
      currentLevel: skill.currentLevel,
      currentLabel: skill.currentLabel,
      requiredLevel: skill.requiredLevel,
      requiredLabel: skill.requiredLabel,
      week: weekNum,
      title: `Master ${skill.name} (${skill.currentLabel} → ${skill.requiredLabel})`,
      importanceReason: skill.importanceReason,
      topics: skill.topics || ['Core concepts', 'Practical implementation'],
      practiceExercises: skill.practiceExercises || ['Build practical demo'],
      miniProject: skill.miniProject || `Develop a functional project showcasing ${skill.name}`,
      estimatedHours: skill.estimatedHours || '6-8 hrs',
      resources: skill.resources || []
    };
  };

  week1Skills.forEach(s => tasks.push(buildTask(s, 1)));
  week2Skills.forEach(s => tasks.push(buildTask(s, 2)));
  week3Skills.forEach(s => tasks.push(buildTask(s, 3)));
  week4Skills.forEach(s => tasks.push(buildTask(s, 4)));

  // If a student had very few gaps (e.g. only 1 or 2 gaps), ensure all gaps are represented
  if (tasks.length === 0 && gaps.length > 0) {
    gaps.forEach((s, idx) => {
      tasks.push(buildTask(s, (idx % 4) + 1));
    });
  }

  return tasks;
}

/**
 * Calculates overall roadmap completion percentage from tasks array
 */
export function calculateRoadmapProgress(tasks = []) {
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  // Weighted: Completed = 100%, In Progress = 50%
  const score = ((completed * 1.0 + inProgress * 0.5) / tasks.length) * 100;
  return Math.round(score);
}
