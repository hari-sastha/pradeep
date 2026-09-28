import React, { useState } from 'react';
import { Bell, Filter, CheckCircle2 } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AnnouncementCard } from '../components/common/AnnouncementCard';

export const Announcements = () => {
  const { announcements, toggleAnnouncementRead } = useAcademy();
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);

  const filteredAnnouncements = announcements.filter(
    (a) => !filterUnreadOnly || !a.read
  );

  const unreadCount = announcements.filter((a) => !a.read).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-7 h-7 text-emerald-400" /> Academy Announcements & Bulletins
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Stay updated on upcoming friendly matches, video evaluations, equipment issues & holiday schedules
          </p>
        </div>

        {/* Filter Unread Toggle */}
        <button
          onClick={() => setFilterUnreadOnly(!filterUnreadOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
            filterUnreadOnly
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          {filterUnreadOnly ? `Showing Unread (${unreadCount})` : `Show All Notices (${announcements.length})`}
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((ann) => (
            <AnnouncementCard
              key={ann.id}
              announcement={ann}
              onToggleRead={toggleAnnouncementRead}
            />
          ))
        ) : (
          <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center text-slate-400">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">All caught up!</h3>
            <p className="text-xs text-slate-400 mt-1">No unread announcements at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};
