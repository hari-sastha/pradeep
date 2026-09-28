import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2, Info, Shirt } from 'lucide-react';
import { Modal } from './Modal';

export const SessionCard = ({ session, onToggleAttendance }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const intensityColors = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    High: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Very High': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    'Match Speed': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <>
      <div className={`glass-card p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
        session.attended
          ? 'border-emerald-500/40 bg-slate-900/80 shadow-lg shadow-emerald-500/5'
          : 'border-slate-800 hover:border-emerald-500/30'
      }`}>
        <div>
          {/* Header & Badges */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
              {session.category}
            </span>
            <span className={`text-[11px] font-medium border px-2.5 py-0.5 rounded-md ${intensityColors[session.intensity] || intensityColors.Medium}`}>
              Intensity: {session.intensity}
            </span>
          </div>

          <h3 className="text-base font-bold text-white mt-1 leading-snug">{session.title}</h3>

          {/* Time & Venue */}
          <div className="mt-3 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-200">{session.day}</span> — <span>{session.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{session.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-300">{session.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-400">Lead Coach: <strong className="text-slate-200">{session.coach}</strong></span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => setShowDetailsModal(true)}
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-medium transition-colors"
          >
            <Info className="w-3.5 h-3.5" /> View Details
          </button>

          <button
            onClick={() => onToggleAttendance(session.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              session.attended
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {session.attended ? 'Attending ✓' : 'RSVP / Attend'}
          </button>
        </div>
      </div>

      {/* Session Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={session.title}
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>{session.day}, {session.date}</span>
              <span className="text-emerald-400 text-xs">{session.time}</span>
            </div>
            <p className="text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {session.location}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-1">
              Session Overview & Tactical Objectives
            </h4>
            <p className="leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              {session.description}
            </p>
          </div>

          {session.equipmentRequired && (
            <div>
              <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1">
                <Shirt className="w-3.5 h-3.5 text-amber-400" /> Required Kit & Gear
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {session.equipmentRequired.map((item, idx) => (
                  <li key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={() => {
                onToggleAttendance(session.id);
                setShowDetailsModal(false);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-slate-950 font-bold hover:bg-emerald-500 transition-all flex items-center gap-1.5 text-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              {session.attended ? 'Mark Not Attending' : 'Confirm Attendance'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
