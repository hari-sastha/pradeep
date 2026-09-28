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
  Shield
} from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academyConfig';
import { useAuth } from '../../context/AuthContext';
import { useAcademy } from '../../context/AcademyContext';

export const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const { announcements } = useAcademy();
  const navigate = useNavigate();

  const unreadAnnouncements = announcements.filter((a) => !a.read).length;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Training Plan', path: '/training-plan', icon: Award },
    { label: 'Tasks', path: '/tasks', icon: ClipboardCheck },
    { label: 'Progress', path: '/progress', icon: TrendingUp },
    { label: 'Mentors', path: '/mentors', icon: Users },
    { label: 'Sessions', path: '/training-sessions', icon: Calendar },
    { label: 'Announcements', path: '/announcements', icon: Bell, badge: unreadAnnouncements },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 bottom-0 z-30 bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-wider leading-none">
              {ACADEMY_CONFIG.shortName}
            </h1>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest block mt-0.5">
              Player Portal
            </span>
          </div>
        </NavLink>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/5 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>
              {Boolean(item.badge) && item.badge > 0 && (
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      {currentUser && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
              alt={currentUser.fullName}
              className="w-9 h-9 rounded-xl object-cover border border-emerald-500/30 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.fullName}</h4>
              <p className="text-[10px] text-emerald-400 truncate">{currentUser.position}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Logout of Player Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
