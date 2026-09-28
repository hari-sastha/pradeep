import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Lock, Bell, Moon, Trash2, LogOut, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAcademy } from '../context/AcademyContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/common/Modal';

export const Settings = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const { resetAcademyData } = useAcademy();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.currentPassword !== currentUser?.password) {
      addToast({
        title: "Password Error",
        message: "Current password does not match your existing password.",
        type: "error"
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      addToast({
        title: "Password Error",
        message: "New password must be at least 6 characters long.",
        type: "error"
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      addToast({
        title: "Password Error",
        message: "New passwords do not match.",
        type: "error"
      });
      return;
    }

    updateProfile({ password: passwordForm.newPassword });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    addToast({
      title: "Password Changed",
      message: "Your login password has been updated in local storage.",
      type: "success"
    });
  };

  const handleClearAllData = () => {
    resetAcademyData();
    setShowClearModal(false);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-emerald-400" /> Portal Settings & Preferences
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your password, app notifications, display theme, and local data persistence
        </p>
      </div>

      {/* ACCOUNT & PASSWORD */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
          <Lock className="w-4 h-4 text-emerald-400" /> Security & Account Credentials
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4 text-xs max-w-lg">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Current Password</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmNewPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all shadow-md"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* PREFERENCES */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
          <Bell className="w-4 h-4 text-emerald-400" /> Portal Preferences
        </h2>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <h4 className="font-bold text-white">Push & In-App Notifications</h4>
              <p className="text-slate-400 mt-0.5">Receive alerts when new tasks, match notices, or coach notes arrive.</p>
            </div>
            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <h4 className="font-bold text-white">Dark Pitch Mode</h4>
              <p className="text-slate-400 mt-0.5">High-contrast dark aesthetic optimized for match preparation.</p>
            </div>
            <button
              type="button"
              onClick={() => setDarkModeEnabled(!darkModeEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                darkModeEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  darkModeEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* DANGER ZONE & CLEAR DATA */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-rose-500/20 bg-rose-950/10 space-y-6">
        <h2 className="text-base font-bold text-rose-300 flex items-center gap-2 pb-3 border-b border-rose-500/20">
          <ShieldAlert className="w-4 h-4 text-rose-400" /> Data Management & Session Controls
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <h4 className="font-bold text-white">Reset Local Storage Application Data</h4>
            <p className="text-slate-400 mt-0.5">Restores all tasks, progress metrics, and player data to demo defaults.</p>
          </div>
          <button
            onClick={() => setShowClearModal(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold transition-all border border-rose-500/30 flex items-center gap-1.5 shrink-0"
          >
            <Trash2 className="w-4 h-4" /> Reset Factory Data
          </button>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Session: Logged in as <strong className="text-slate-200">{currentUser?.email}</strong></span>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-rose-400 hover:underline font-bold flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout Session
          </button>
        </div>
      </div>

      {/* TECHNICAL DISCLAIMER FOOTER NOTE */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
        <strong className="text-slate-300 block mb-1">Prototype Technical Note:</strong>
        This application uses browser <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">localStorage</code> for demonstration purposes. Production deployment should use secure server-side authentication and a relational database.
      </div>

      {/* CONFIRMATION CLEAR DATA MODAL */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Confirm Data Reset"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p className="leading-relaxed">
            Are you sure you want to reset all application data? This action will overwrite your local storage with the default factory demo dataset (initial tasks, mentors, progress, and sessions).
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowClearModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleClearAllData}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all"
            >
              Confirm & Clear Data
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
