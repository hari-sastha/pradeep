import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Phone, Lock, Calendar, Target, Award, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ACADEMY_CONFIG } from '../config/academyConfig';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    position: 'Central Midfielder',
    experienceLevel: 'Intermediate',
    emergencyContact: '',
  });

  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const positions = [
    'Goalkeeper',
    'Centre Back',
    'Full Back',
    'Defensive Midfielder',
    'Central Midfielder',
    'Attacking Midfielder',
    'Winger',
    'Striker',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email address is required.';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required.';
    if (!formData.emergencyContact.trim()) errs.emergencyContact = 'Emergency contact is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = register(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ form: result.error });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pitch-bg-pattern flex flex-col justify-center items-center p-4 py-12">
      {/* Brand Header */}
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
            Player Registration
          </span>
        </div>
      </Link>

      {/* Main Registration Form Container */}
      <div className="w-full max-w-2xl glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Join Elite XI Academy</h2>
          <p className="text-xs text-slate-400 mt-1">
            Create your official player account to receive your personalized training curriculum
          </p>
        </div>

        {errors.form && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Marcus Vance"
                className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors ${
                  errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="marcus@example.com"
                className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors ${
                  errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 7700 900123"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Date of Birth *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors ${
                  errors.dateOfBirth ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.dateOfBirth && <p className="text-[11px] text-rose-400 mt-1">{errors.dateOfBirth}</p>}
          </div>

          {/* Preferred Position */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Preferred Position *
            </label>
            <div className="relative">
              <Target className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition-colors appearance-none"
              >
                {positions.map((pos) => (
                  <option key={pos} value={pos} className="bg-slate-900 text-white">
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Experience Level *
            </label>
            <div className="relative">
              <Award className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition-colors appearance-none"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-slate-900 text-white">
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Emergency Contact Name & Phone *
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="e.g. Sarah Vance (+44 7700 900456)"
              className={`w-full bg-slate-900 border rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors ${
                errors.emergencyContact ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
              }`}
            />
            {errors.emergencyContact && <p className="text-[11px] text-rose-400 mt-1">{errors.emergencyContact}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password (min 6 chars) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors ${
                  errors.password ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors ${
                  errors.confirmPassword ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.confirmPassword && <p className="text-[11px] text-rose-400 mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Complete Registration & Access Dashboard
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-emerald-400 font-bold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};
