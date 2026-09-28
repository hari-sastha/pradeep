import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Flame, Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAcademy } from '../../context/AcademyContext';

export const Header = ({ onOpenMobileMenu }) => {
  const { currentUser } = useAuth();
  const { announcements, progress } = useAcademy();
  const location = useLocation();

  const unreadCount = announcements.filter((a) => !a.read).length;

  const pageTitles = {
    '/dashboard': 'Player Dashboard',
    '/training-plan': 'Academy Training Plan',
    '/tasks': 'Training Tasks & Assignments',
    '/progress': 'Performance Analytics & Ratings',
    '/mentors': 'Academy Mentors & Coaching Staff',
    '/training-sessions': 'Training Sessions & Schedule',
    '/announcements': 'Academy Announcements & News',
    '/profile': 'Player Profile Management',
    '/settings': 'Academy Portal Settings',
  };

  const title = pageTitles[location.pathname] || 'Elite XI Portal';

  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-4 flex items-center justify-between">
      {/* Mobile Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          aria-label="Open navigation menu"
        >
          <Shield className="w-5 h-5 text-emerald-400" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            {currentUser?.position} • {currentUser?.experienceLevel} Level
          </p>
        </div>
      </div>

      {/* Right Header Status Controls */}
      <div className="flex items-center gap-4">
        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-md shadow-amber-500/5">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
          <span>{progress?.streakDays || 12} Day Streak</span>
        </div>

        {/* Notifications Icon */}
        <Link
          to="/announcements"
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
          title="Academy Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Avatar link */}
        <Link to="/profile" className="flex items-center gap-2 group">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt={currentUser?.fullName || 'Player Avatar'}
            className="w-9 h-9 rounded-xl object-cover border-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all"
          />
        </Link>
      </div>
    </header>
  );
};
