import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFromStorage, saveToStorage, clearAllStorage, STORAGE_KEYS } from '../utils/storage';
import { seedDemoDataIfEmpty, INITIAL_TASKS, INITIAL_PROGRESS, INITIAL_MENTORS, INITIAL_SESSIONS, INITIAL_ANNOUNCEMENTS } from '../data/demoData';
import { ACADEMY_CONFIG } from '../config/academyConfig';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

const AcademyContext = createContext();

export const AcademyProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [plans, setPlans] = useState([]);
  const { addToast } = useToast();
  const { currentUser, updateProfile } = useAuth();

  // Load state from localStorage
  const refreshAcademyData = useCallback(() => {
    seedDemoDataIfEmpty();
    setTasks(getFromStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS));
    setProgress(getFromStorage(STORAGE_KEYS.PROGRESS, INITIAL_PROGRESS));
    setMentors(getFromStorage(STORAGE_KEYS.MENTORS, INITIAL_MENTORS));
    setSessions(getFromStorage(STORAGE_KEYS.SESSIONS, INITIAL_SESSIONS));
    setAnnouncements(getFromStorage(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS));
    setPlans(getFromStorage(STORAGE_KEYS.PLANS, ACADEMY_CONFIG.plans));
  }, []);

  useEffect(() => {
    refreshAcademyData();
  }, [refreshAcademyData]);

  // Task Completion Toggle
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    });

    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);

    const targetTask = tasks.find((t) => t.id === taskId);
    const isNowCompleted = targetTask?.status !== 'Completed';

    // Automatically recalculate progress & streak
    const completedCount = updatedTasks.filter((t) => t.status === 'Completed').length;
    const newStreak = Math.max(1, 12 + Math.floor(completedCount / 2));
    const newTechScore = Math.min(99, 80 + Math.floor(completedCount * 0.8));
    const newFitnessScore = Math.min(99, 82 + Math.floor(completedCount * 0.7));

    const updatedProgress = {
      ...progress,
      streakDays: newStreak,
      technicalScore: newTechScore,
      fitnessScore: newFitnessScore,
      overallRating: Math.round((newTechScore + newFitnessScore) / 2)
    };

    setProgress(updatedProgress);
    saveToStorage(STORAGE_KEYS.PROGRESS, updatedProgress);

    if (isNowCompleted) {
      addToast({
        title: "Task Completed! ⚽",
        message: `Nice work on "${targetTask?.title}". Progress & streak updated!`,
        type: "success"
      });
    } else {
      addToast({
        title: "Task Marked Pending",
        message: `Task "${targetTask?.title}" reverted to pending.`,
        type: "info"
      });
    }
  };

  // Add new task
  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      description: taskData.description,
      category: taskData.category || 'Technical',
      difficulty: taskData.difficulty || 'Medium',
      duration: taskData.duration || '30 mins',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      status: 'Pending',
      coachNote: taskData.coachNote || 'Self-assigned training task.'
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);

    addToast({
      title: "New Training Task Added",
      message: `"${newTask.title}" has been assigned to your schedule.`,
      type: "success"
    });
  };

  // Toggle Announcement Read Status
  const toggleAnnouncementRead = (announcementId) => {
    const updated = announcements.map((a) => {
      if (a.id === announcementId) {
        return { ...a, read: !a.read };
      }
      return a;
    });
    setAnnouncements(updated);
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, updated);
  };

  // Toggle Session Attendance
  const toggleSessionAttendance = (sessionId) => {
    const updated = sessions.map((s) => {
      if (s.id === sessionId) {
        const nextAttended = !s.attended;
        if (nextAttended) {
          addToast({
            title: "Session Marked Attended",
            message: `RSVP registered for "${s.title}". See you on the pitch!`,
            type: "success"
          });
        }
        return { ...s, attended: nextAttended };
      }
      return s;
    });
    setSessions(updated);
    saveToStorage(STORAGE_KEYS.SESSIONS, updated);
  };

  // Assign Mentor
  const assignMentor = (mentorId) => {
    const selectedMentor = mentors.find((m) => m.id === mentorId);
    if (!selectedMentor) return;

    if (currentUser) {
      updateProfile({ assignedMentorId: mentorId });
    }

    addToast({
      title: "Mentor Assigned! 🤝",
      message: `${selectedMentor.name} (${selectedMentor.specialization}) is now your primary coach.`,
      type: "success"
    });
  };

  // Switch Plan
  const switchPlan = (planId) => {
    const selectedPlan = plans.find((p) => p.id === planId);
    if (!selectedPlan) return;

    if (currentUser) {
      updateProfile({ assignedPlanId: planId });
    }

    addToast({
      title: "Academy Plan Updated",
      message: `You are now enrolled in the ${selectedPlan.name}!`,
      type: "success"
    });
  };

  // Clear application data
  const resetAcademyData = () => {
    clearAllStorage();
    seedDemoDataIfEmpty();
    refreshAcademyData();
    addToast({
      title: "Local Storage Reset",
      message: "Application restored to initial factory demo state.",
      type: "info"
    });
  };

  return (
    <AcademyContext.Provider
      value={{
        tasks,
        progress,
        mentors,
        sessions,
        announcements,
        plans,
        toggleTaskStatus,
        addTask,
        toggleAnnouncementRead,
        toggleSessionAttendance,
        assignMentor,
        switchPlan,
        resetAcademyData,
        refreshAcademyData,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
