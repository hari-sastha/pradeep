import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Target, Award, Shield, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAcademy } from '../context/AcademyContext';

export const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const { plans } = useAcademy();

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    position: currentUser?.position || 'Central Midfielder',
    experienceLevel: currentUser?.experienceLevel || 'Intermediate',
    emergencyContact: currentUser?.emergencyContact || '',
    bio: currentUser?.bio || '',
    avatarUrl: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  });

  const [isEditing, setIsEditing] = useState(false);

  const currentPlan = plans.find((p) => p.id === currentUser?.assignedPlanId) || plans[0];

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

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <User className="w-7 h-7 text-emerald-400" /> Official Player Profile
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal details, preferred position, emergency contacts, and avatar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN - PLAYER IDENTITY CARD */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center flex flex-col items-center justify-between bg-gradient-to-b from-slate-900 to-emerald-950/20">
          <div className="flex flex-col items-center">
            <img
              src={formData.avatarUrl}
              alt={formData.fullName}
              className="w-28 h-28 rounded-3xl object-cover border-4 border-emerald-500/40 shadow-2xl shadow-emerald-500/20 mb-4"
            />
            <h2 className="text-xl font-extrabold text-white">{currentUser?.fullName}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
              <span className="text-xs font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> {currentUser?.position}
              </span>
              <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-0.5 rounded-full">
                {currentUser?.experienceLevel}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-4 italic max-w-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              "{formData.bio || 'Dedicated player pursuing tactical & physical excellence.'}"
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 w-full text-xs text-slate-400 space-y-2">
            <div className="flex justify-between">
              <span>Academy Joining Date</span>
              <strong className="text-slate-200">{currentUser?.joinedDate || '2024-01-15'}</strong>
            </div>
            <div className="flex justify-between">
              <span>Enrolled Plan</span>
              <strong className="text-emerald-400">{currentPlan?.name}</strong>
            </div>
            <div className="flex justify-between">
              <span>Player ID</span>
              <strong className="text-slate-200 font-mono">{currentUser?.id}</strong>
            </div>
          </div>
        </div>

        {/* RIGHT TWO COLUMNS - EDITABLE FORM */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white">Player Information & Attributes</h3>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isEditing
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md'
              }`}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Avatar Selector if Editing */}
            {isEditing && (
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Select Avatar Preset</label>
                <div className="flex items-center gap-4">
                  {avatarPresets.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="Preset"
                      onClick={() => setFormData({ ...formData, avatarUrl: url })}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                        formData.avatarUrl === url ? 'border-emerald-400 scale-105 shadow-md' : 'border-slate-800 opacity-60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none disabled:opacity-70"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none disabled:opacity-70"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none disabled:opacity-70"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none disabled:opacity-70"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Preferred Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none disabled:opacity-70"
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos} className="bg-slate-900">
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none disabled:opacity-70"
                >
                  <option value="Beginner" className="bg-slate-900">Beginner</option>
                  <option value="Intermediate" className="bg-slate-900">Intermediate</option>
                  <option value="Advanced" className="bg-slate-900">Advanced</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Emergency Contact Details
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none disabled:opacity-70"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Personal Motto / Bio
                </label>
                <textarea
                  rows={3}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 outline-none resize-none disabled:opacity-70"
                />
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Profile Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
