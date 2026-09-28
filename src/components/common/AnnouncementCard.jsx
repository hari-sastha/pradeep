import React, { useState } from 'react';
import { Bell, Calendar, User, ChevronDown, ChevronUp, CheckCircle, MailOpen } from 'lucide-react';

export const AnnouncementCard = ({ announcement, onToggleRead }) => {
  const [expanded, setExpanded] = useState(false);

  const priorityColors = {
    High: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    Normal: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  return (
    <div
      className={`glass-card p-5 rounded-2xl border transition-all duration-300 ${
        announcement.read
          ? 'border-slate-800/80 bg-slate-950/40 opacity-90'
          : 'border-emerald-500/30 bg-slate-900/90 shadow-lg shadow-emerald-500/5'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
            announcement.read ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            <Bell className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                {announcement.category}
              </span>
              {announcement.priority && (
                <span className={`text-[11px] font-semibold border px-2 py-0.5 rounded-md ${priorityColors[announcement.priority] || priorityColors.Normal}`}>
                  {announcement.priority} Priority
                </span>
              )}
              {!announcement.read && (
                <span className="text-[10px] font-extrabold uppercase bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full animate-pulse">
                  NEW
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-100">{announcement.title}</h3>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {announcement.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {announcement.author}
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              {announcement.summary}
            </p>
          </div>
        </div>

        <button
          onClick={() => onToggleRead(announcement.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all shrink-0"
          title={announcement.read ? "Mark Unread" : "Mark Read"}
        >
          {announcement.read ? <CheckCircle className="w-4 h-4 text-slate-500" /> : <MailOpen className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60 animate-fade-in">
          {announcement.content}
        </div>
      )}

      <div className="mt-3 pt-2 flex items-center justify-between text-xs">
        <button
          onClick={() => {
            if (!announcement.read) onToggleRead(announcement.id);
            setExpanded(!expanded);
          }}
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
        >
          {expanded ? <>Hide Announcement <ChevronUp className="w-3.5 h-3.5" /></> : <>Read Full Notice <ChevronDown className="w-3.5 h-3.5" /></>}
        </button>
      </div>
    </div>
  );
};
