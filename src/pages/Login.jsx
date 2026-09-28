import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ACADEMY_CONFIG } from '../config/academyConfig';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  // Quick Demo Fill Handler
  const handleUseDemo = () => {
    setEmail('demo@elitexi.com');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pitch-bg-pattern flex flex-col justify-center items-center p-4">
      {/* Top Branding Link */}
      <Link to="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        <div>
          <span className="font-extrabold text-xl text-white tracking-wider block leading-none">
            {ACADEMY_CONFIG.shortName}
          </span>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mt-1">
            Player Portal
          </span>
        </div>
      </Link>

      {/* Main Login Card */}
      <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Player Portal Login</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to access your training plan & stats</p>
        </div>

        {/* Demo Account Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Demo Player Account Available
            </span>
            <span className="text-xs text-slate-300 font-mono block mt-0.5">
              demo@elitexi.com • demo123
            </span>
          </div>
          <button
            type="button"
            onClick={handleUseDemo}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 shrink-0"
          >
            <UserCheck className="w-3.5 h-3.5" /> Use Demo
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Academy Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="player@elitexi.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Portal Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            Sign In to Portal <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>

        {/* Footer link */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          New player?{' '}
          <Link to="/register" className="text-emerald-400 font-bold hover:underline">
            Register an Academy Account
          </Link>
        </div>
      </div>
    </div>
  );
};
