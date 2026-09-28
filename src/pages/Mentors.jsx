import React from 'react';
import { Users, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAcademy } from '../context/AcademyContext';
import { MentorCard } from '../components/common/MentorCard';

export const Mentors = () => {
  const { currentUser } = useAuth();
  const { mentors, assignMentor } = useAcademy();

  const assignedMentorId = currentUser?.assignedMentorId || 'coach-001';
  const assignedMentor = mentors.find((m) => m.id === assignedMentorId) || mentors[0];
  const otherCoaches = mentors.filter((m) => m.id !== assignedMentorId);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Users className="w-7 h-7 text-emerald-400" /> Academy Mentors & Coaching Staff
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Learn from UEFA certified professional coaches, physical trainers, and tactical masterminds
        </p>
      </div>

      {/* ASSIGNED MENTOR SPOTLIGHT */}
      {assignedMentor && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Your Assigned Primary Mentor
          </h2>
          <MentorCard
            mentor={assignedMentor}
            isAssigned={true}
          />
        </div>
      )}

      {/* OTHER COACHES DIRECTORY */}
      <div className="pt-6">
        <h2 className="text-xl font-bold text-white tracking-tight mb-2">Other Academy Specialist Coaches</h2>
        <p className="text-xs text-slate-400 mb-6">
          You can reassign your primary mentor at any time to focus on specific position needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCoaches.map((coach) => (
            <MentorCard
              key={coach.id}
              mentor={coach}
              isAssigned={false}
              onAssign={assignMentor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
