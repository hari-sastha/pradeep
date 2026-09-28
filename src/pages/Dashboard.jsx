import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Activity,
  Bell,
  ArrowRight,
  Shield,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAcademy } from '../context/AcademyContext';
import { StatCard } from '../components/common/StatCard';
import { CircularProgress } from '../components/common/CircularProgress';
import { TaskCard } from '../components/common/TaskCard';
import { SessionCard } from '../components/common/SessionCard';
import { AnnouncementCard } from '../components/common/AnnouncementCard';
import { calculateTaskCompletion, calculateOverallProgress } from '../utils/calculations';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { tasks, progress, mentors, sessions, announcements, plans, toggleTaskStatus, toggleSessionAttendance, toggleAnnouncementRead } = useAcademy();

  // Active plan & mentor details
  const currentPlan = plans.find((p) => p.id === currentUser?.assignedPlanId) || plans[0];
  const assignedMentor = mentors.find((m) => m.id === currentUser?.assignedMentorId) || mentors[0];

  // Dynamic calculations
  const taskStats = calculateTaskCompletion(tasks);
  const overallRating = calculateOverallProgress(progress, tasks);

  // Filter today's tasks (or pending/in-progress)
  const todaysTasks = tasks.slice(0, 4);
  const nextSession = sessions.find((s) => !s.attended) || sessions[0];
  const recentAnnouncements = announcements.slice(0, 2);

  return (
    <div className="space-y-8 pb-12">
      {/* TOP WELCOME BANNER */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5 z-10">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt={currentUser?.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/10 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> {currentUser?.position}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
                {currentUser?.experienceLevel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser?.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Ready for today's training session? You have{' '}
              <strong className="text-emerald-400">{tasks.filter((t) => t.status !== 'Completed').length} active tasks</strong> pending.
            </p>
          </div>
        </div>

        {/* Plan Pill */}
        <div className="z-10 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shrink-0 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Current Plan</span>
            <span className="text-sm font-bold text-white block">{currentPlan?.name}</span>
            <Link to="/training-plan" className="text-[11px] text-emerald-400 hover:underline font-semibold">
              View Plan Details →
            </Link>
          </div>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          icon={CheckCircle2}
          title="Task Completion"
          value={`${taskStats.percentage}%`}
          subtitle={`${taskStats.completedCount} of ${taskStats.totalCount} completed`}
          color="emerald"
        />
        <StatCard
          icon={Flame}
          title="Current Streak"
          value={`${progress.streakDays || 12} Days`}
          subtitle="Consistency on pitch"
          color="amber"
        />
        <StatCard
          icon={Activity}
          title="Fitness Score"
          value={`${progress.fitnessScore || 87}/100`}
          subtitle="Stamina & Conditioning"
          color="blue"
        />
        <StatCard
          icon={Award}
          title="Technical Score"
          value={`${progress.technicalScore || 85}/100`}
          subtitle="Ball Control & Passing"
          color="purple"
        />
        <StatCard
          icon={TrendingUp}
          title="Overall Rating"
          value={`${overallRating}%`}
          subtitle="Academy Benchmark"
          color="emerald"
        />
      </div>

      {/* MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT TWO COLUMNS */}
        <div className="lg:col-span-2 space-y-8">
          {/* TODAY'S TRAINING TASKS */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Today's Assigned Tasks</h3>
                <p className="text-xs text-slate-400 mt-0.5">Focus areas selected by your mentor</p>
              </div>
              <Link
                to="/tasks"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                View All Tasks <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {todaysTasks.length > 0 ? (
                todaysTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggleStatus={toggleTaskStatus} />
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No training tasks assigned for today. Great job resting!
                </div>
              )}
            </div>
          </div>

          {/* UPCOMING TRAINING SESSION */}
          {nextSession && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" /> Next Academy Session
                </h3>
                <Link to="/training-sessions" className="text-xs text-emerald-400 hover:underline font-semibold">
                  Full Calendar →
                </Link>
              </div>
              <SessionCard session={nextSession} onToggleAttendance={toggleSessionAttendance} />
            </div>
          )}
        </div>

        {/* RIGHT SINGLE COLUMN */}
        <div className="space-y-8">
          {/* PROGRESS OVERVIEW CIRCLE */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Overall Performance</h3>
            <CircularProgress percentage={overallRating} size={150} strokeWidth={12} label="Academy Index" />
            <p className="text-xs text-slate-300 mt-4 leading-relaxed">
              Based on completed tasks, fitness metrics, and technical coaching reviews.
            </p>
            <Link
              to="/progress"
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all block"
            >
              Detailed Analytics & Radar →
            </Link>
          </div>

          {/* ASSIGNED MENTOR SPOTLIGHT */}
          {assignedMentor && (
            <div className="glass-card p-6 rounded-3xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-3">
                Assigned Mentor / Head Coach
              </span>
              <div className="flex items-center gap-4">
                <img
                  src={assignedMentor.avatar}
                  alt={assignedMentor.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40"
                />
                <div>
                  <h4 className="font-bold text-white text-base">{assignedMentor.name}</h4>
                  <p className="text-xs text-emerald-400 font-medium">{assignedMentor.specialization}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{assignedMentor.experience} Academy Exp</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic mt-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                "{assignedMentor.philosophy}"
              </p>
              <Link
                to="/mentors"
                className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" /> Message Coach {assignedMentor.name.split(' ')[0]}
              </Link>
            </div>
          )}

          {/* RECENT ANNOUNCEMENTS */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" /> Academy News
              </h3>
              <Link to="/announcements" className="text-xs text-emerald-400 hover:underline font-semibold">
                All Notices
              </Link>
            </div>

            <div className="space-y-3">
              {recentAnnouncements.map((ann) => (
                <AnnouncementCard key={ann.id} announcement={ann} onToggleRead={toggleAnnouncementRead} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
