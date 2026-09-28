import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AcademyProvider } from './context/AcademyContext';

// Guards & Layouts
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { PublicRoute } from './components/common/PublicRoute';
import { MainLayout } from './components/layout/MainLayout';

// Public Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Authenticated Pages
import { Dashboard } from './pages/Dashboard';
import { TrainingPlan } from './pages/TrainingPlan';
import { Tasks } from './pages/Tasks';
import { Progress } from './pages/Progress';
import { Mentors } from './pages/Mentors';
import { TrainingSessions } from './pages/TrainingSessions';
import { Announcements } from './pages/Announcements';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AcademyProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              {/* Authenticated Dashboard Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/training-plan" element={<TrainingPlan />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/mentors" element={<Mentors />} />
                <Route path="/training-sessions" element={<TrainingSessions />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AcademyProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
