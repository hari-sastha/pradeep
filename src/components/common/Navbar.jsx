import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, LogIn, UserPlus } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academyConfig';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-wider block leading-none">
              {ACADEMY_CONFIG.shortName}
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest block mt-0.5">
              Football Academy
            </span>
          </div>
        </Link>

        {/* Public Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <a href="#why-us" className="hover:text-emerald-400 transition-colors">Why Us</a>
          <a href="#philosophy" className="hover:text-emerald-400 transition-colors">Philosophy</a>
          <a href="#programs" className="hover:text-emerald-400 transition-colors">Programs</a>
          <a href="#mentors" className="hover:text-emerald-400 transition-colors">Mentorship</a>
        </div>

        {/* Auth Action Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all"
            >
              Player Portal
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-800 hover:border-slate-700 bg-slate-900/60"
              >
                <LogIn className="w-4 h-4 text-emerald-400" />
                Player Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                Join Academy
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
