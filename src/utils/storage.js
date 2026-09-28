// Centralized LocalStorage Management Utility
// Ensures safe JSON parsing, exception handling, and consistent keys across the app

export const STORAGE_KEYS = {
  USERS: 'footballAcademyUsers',
  CURRENT_USER: 'footballAcademyCurrentUser',
  TASKS: 'footballAcademyTasks',
  PROGRESS: 'footballAcademyProgress',
  MENTORS: 'footballAcademyMentors',
  SESSIONS: 'footballAcademySessions',
  ANNOUNCEMENTS: 'footballAcademyAnnouncements',
  PLANS: 'footballAcademyPlans',
};

/**
 * Safely retrieve data from localStorage
 * @param {string} key 
 * @param {any} fallbackValue 
 */
export const getFromStorage = (key, fallbackValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) {
      return fallbackValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`[LocalStorage Error] Failed to read key "${key}":`, error);
    return fallbackValue;
  }
};

/**
 * Safely save data to localStorage
 * @param {string} key 
 * @param {any} value 
 */
export const saveToStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[LocalStorage Error] Failed to write key "${key}":`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 * @param {string} key 
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[LocalStorage Error] Failed to remove key "${key}":`, error);
    return false;
  }
};

/**
 * Update a specific key using a callback or object merge
 * @param {string} key 
 * @param {Function|Object} updateFn 
 */
export const updateStorage = (key, updateFn) => {
  const currentData = getFromStorage(key);
  const updatedData = typeof updateFn === 'function' ? updateFn(currentData) : { ...currentData, ...updateFn };
  saveToStorage(key, updatedData);
  return updatedData;
};

/**
 * Clear all Football Academy data from localStorage
 */
export const clearAllStorage = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
