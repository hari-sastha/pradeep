import React, { useState } from 'react';
import { Calendar, Filter, MapPin, CheckCircle2 } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SessionCard } from '../components/common/SessionCard';

export const TrainingSessions = () => {
  const { sessions, toggleSessionAttendance } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technical', 'Fitness', 'Tactical', 'Match', 'Recovery'];

  const filteredSessions = sessions.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Calendar className="w-7 h-7 text-emerald-400" /> Training Schedule & Pitch Sessions
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review upcoming pitch drills, gym sessions, match simulations, and confirm your attendance
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onToggleAttendance={toggleSessionAttendance}
            />
          ))
        ) : (
          <div className="col-span-full glass-card p-12 rounded-3xl border border-slate-800 text-center text-slate-400">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No sessions scheduled for this category</h3>
            <p className="text-xs text-slate-400 mt-1">Select another filter to view sessions.</p>
          </div>
        )}
      </div>
    </div>
  );
};
