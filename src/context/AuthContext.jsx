import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import { seedDemoDataIfEmpty, INITIAL_DEMO_USER } from '../data/demoData';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    // Seed data on first launch
    seedDemoDataIfEmpty();

    const storedUser = getFromStorage(STORAGE_KEYS.CURRENT_USER);
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = (email, password) => {
    const users = getFromStorage(STORAGE_KEYS.USERS, [INITIAL_DEMO_USER]);
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!foundUser) {
      addToast({
        title: "Login Failed",
        message: "No academy account found with this email address.",
        type: "error"
      });
      return { success: false, error: "Invalid email or password." };
    }

    if (foundUser.password !== password) {
      addToast({
        title: "Login Failed",
        message: "Incorrect password provided.",
        type: "error"
      });
      return { success: false, error: "Invalid email or password." };
    }

    // Save session
    saveToStorage(STORAGE_KEYS.CURRENT_USER, foundUser);
    setCurrentUser(foundUser);

    addToast({
      title: "Welcome Back, Player!",
      message: `Signed in as ${foundUser.fullName}. Ready to train?`,
      type: "success"
    });

    return { success: true, user: foundUser };
  };

  // Registration handler
  const register = (registerData) => {
    const users = getFromStorage(STORAGE_KEYS.USERS, []);
    
    // Check duplicate email
    const existing = users.find(
      (u) => u.email.toLowerCase() === registerData.email.trim().toLowerCase()
    );

    if (existing) {
      addToast({
        title: "Registration Failed",
        message: "An academy account already exists with this email.",
        type: "error"
      });
      return { success: false, error: "Email already registered." };
    }

    const newUser = {
      id: `player-${Date.now()}`,
      fullName: registerData.fullName,
      email: registerData.email.trim(),
      password: registerData.password,
      phone: registerData.phone || '',
      dateOfBirth: registerData.dateOfBirth || '',
      position: registerData.position || 'Central Midfielder',
      experienceLevel: registerData.experienceLevel || 'Intermediate',
      emergencyContact: registerData.emergencyContact || 'Not specified',
      joinedDate: new Date().toISOString().split('T')[0],
      assignedPlanId: 'plan-foundation',
      assignedMentorId: 'coach-001',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
      bio: 'Newly registered Elite XI Academy player preparing for elite performance.',
    };

    const updatedUsers = [...users, newUser];
    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, newUser);
    setCurrentUser(newUser);

    addToast({
      title: "Academy Registration Successful!",
      message: `Welcome to Elite XI, ${newUser.fullName}! Default plan & mentor assigned.`,
      type: "success"
    });

    return { success: true, user: newUser };
  };

  // Logout handler
  const logout = () => {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, null);
    setCurrentUser(null);
    addToast({
      title: "Logged Out",
      message: "You have been logged out of the academy portal.",
      type: "info"
    });
  };

  // Update profile handler
  const updateProfile = (updatedFields) => {
    if (!currentUser) return { success: false, error: "No user logged in." };

    const updatedUser = { ...currentUser, ...updatedFields };

    // Update in users array
    const users = getFromStorage(STORAGE_KEYS.USERS, []);
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));

    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, updatedUser);
    setCurrentUser(updatedUser);

    addToast({
      title: "Profile Updated",
      message: "Your player details have been successfully saved.",
      type: "success"
    });

    return { success: true, user: updatedUser };
  };

  const isAuthenticated = Boolean(currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
