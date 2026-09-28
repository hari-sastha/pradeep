// Business Logic & Calculation Utilities

/**
 * Calculate task completion metrics
 * @param {Array} tasks 
 */
export const calculateTaskCompletion = (tasks = []) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return { completedCount: 0, totalCount: 0, percentage: 0 };
  }
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const totalCount = tasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return { completedCount, totalCount, percentage };
};

/**
 * Calculate overall development rating based on attribute scores and task completion ratio
 * @param {Object} progress 
 * @param {Array} tasks 
 */
export const calculateOverallProgress = (progress = {}, tasks = []) => {
  const { percentage: taskPct } = calculateTaskCompletion(tasks);

  if (!progress.attributes) {
    return taskPct || 80;
  }

  const tech = Object.values(progress.attributes.technical || {}).reduce((a, b) => a + b, 0) / 4 || 80;
  const phys = Object.values(progress.attributes.physical || {}).reduce((a, b) => a + b, 0) / 4 || 80;
  const ment = Object.values(progress.attributes.mental || {}).reduce((a, b) => a + b, 0) / 4 || 80;

  const attrAvg = (tech + phys + ment) / 3;

  // Weighted score: 70% attributes + 30% active task completion
  const overall = Math.round(attrAvg * 0.7 + taskPct * 0.3);
  return Math.min(100, Math.max(0, overall));
};

/**
 * Calculate current training streak
 * @param {Array} tasks 
 * @param {number} fallbackStreak 
 */
export const calculateTrainingStreak = (tasks = [], fallbackStreak = 12) => {
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  // Dynamic adjustment based on completed tasks
  return Math.max(1, fallbackStreak + Math.floor(completedCount / 2));
};

/**
 * Calculate category averages for progress attributes
 * @param {Object} attributes 
 */
export const calculateAveragePerformance = (attributes = {}) => {
  const getGroupAvg = (group = {}) => {
    const vals = Object.values(group);
    if (!vals.length) return 80;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const technical = getGroupAvg(attributes.technical);
  const physical = getGroupAvg(attributes.physical);
  const mental = getGroupAvg(attributes.mental);
  const overall = Math.round((technical + physical + mental) / 3);

  return { technical, physical, mental, overall };
};

/**
 * Calculate current academy plan completion percentage
 * @param {Object} plan 
 * @param {Array} tasks 
 */
export const calculatePlanProgress = (plan, tasks = []) => {
  if (!plan || !plan.modules) return 75;
  const taskCompletion = calculateTaskCompletion(tasks).percentage;
  const moduleAvg = Math.round(
    plan.modules.reduce((acc, m) => acc + (m.progress || 0), 0) / plan.modules.length
  );
  return Math.round(moduleAvg * 0.6 + taskCompletion * 0.4);
};
