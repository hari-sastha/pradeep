import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  ClipboardCheck,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  User,
  Settings,
  LogOut,
  X,
  Shield
} from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academyConfig';
import { useAuth } from '../../context/AuthContext';
import { useAcademy } from '../../context/AcademyContext';

export const MobileNav = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const { announcements } = useAcademy();
  const navigate = useNavigate();

  const unreadCount = announcements.filter((a) => !a.read).length;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Training Plan', path: '/training-plan', icon: Award },
    { label: 'Tasks', path: '/tasks', icon: ClipboardCheck },
    { label: 'Progress', path: '/progress', icon: TrendingUp },
    { label: 'Mentors', path: '/mentors', icon: Users },
    { label: 'Sessions', path: '/training-sessions', icon: Calendar },
    { label: 'Announcements', path: '/announcements', icon: Bell, badge: unreadCount },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative flex-1 max-w-xs w-full bg-slate-950 border-r border-slate-800 flex flex-col z-10 shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-extrabold text-sm text-white tracking-wider">{ACADEMY_CONFIG.shortName}</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {Boolean(item.badge) && item.badge > 0 && (
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {currentUser && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={currentUser.fullName}
                className="w-9 h-9 rounded-xl object-cover border border-emerald-500/30"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{currentUser.fullName}</h4>
                <p className="text-[10px] text-emerald-400 truncate">{currentUser.position}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-rose-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
