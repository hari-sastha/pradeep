import React from 'react';
import { CheckCircle2, Clock, Calendar, AlertCircle, Dumbbell, ShieldAlert, Brain, Sparkles, Activity } from 'lucide-react';

export const TaskCard = ({ task, onToggleStatus }) => {
  const isCompleted = task.status === 'Completed';

  const categoryIcons = {
    Technical: Dumbbell,
    Tactical: ShieldAlert,
    Fitness: Activity,
    Mental: Brain,
    Recovery: Sparkles,
  };

  const CategoryIcon = categoryIcons[task.category] || Dumbbell;

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  const categoryColors = {
    Technical: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    Tactical: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    Fitness: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Mental: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Recovery: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <div
      className={`glass-card p-5 rounded-2xl border transition-all duration-300 ${
        isCompleted
          ? 'border-emerald-500/30 bg-slate-900/40 opacity-85'
          : 'border-slate-800 hover:border-emerald-500/30'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left icon & Details */}
        <div className="flex gap-3.5 items-start">
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'border-slate-600 hover:border-emerald-400 bg-slate-800/50 text-transparent'
            }`}
            title={isCompleted ? "Mark Pending" : "Mark Completed"}
          >
            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
          </button>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-md font-semibold border flex items-center gap-1 ${categoryColors[task.category] || categoryColors.Technical}`}>
                <CategoryIcon className="w-3 h-3" />
                {task.category}
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${difficultyColors[task.difficulty] || difficultyColors.Medium}`}>
                {task.difficulty}
              </span>
            </div>

            <h4 className={`text-base font-bold text-slate-100 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
              {task.title}
            </h4>

            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{task.description}</p>

            {task.coachNote && (
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2 text-xs text-emerald-300/90">
                <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-emerald-400 font-semibold">Coach Note:</strong> {task.coachNote}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {task.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Due: {task.dueDate}
          </span>
        </div>

        <button
          onClick={() => onToggleStatus(task.id)}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            isCompleted
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white'
          }`}
        >
          {isCompleted ? 'Completed ✓' : 'Mark Done'}
        </button>
      </div>
    </div>
  );
};
