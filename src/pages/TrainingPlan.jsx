import React from 'react';
import { Award, CheckCircle2, Clock, Calendar, Shield, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAcademy } from '../context/AcademyContext';
import { calculatePlanProgress } from '../utils/calculations';

export const TrainingPlan = () => {
  const { currentUser } = useAuth();
  const { plans, tasks, switchPlan } = useAcademy();

  const currentPlan = plans.find((p) => p.id === currentUser?.assignedPlanId) || plans[1];
  const overallPlanProgress = calculatePlanProgress(currentPlan, tasks);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                Active Enrolled Plan
              </span>
              <span className="text-xs text-slate-400 font-semibold">{currentPlan.level} Level</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{currentPlan.name}</h1>
            <p className="text-xs text-emerald-400 font-medium mt-1">{currentPlan.tagline}</p>
            <p className="text-xs text-slate-300 mt-3 max-w-2xl leading-relaxed">{currentPlan.description}</p>
          </div>

          <div className="w-full md:w-64 glass-card p-5 rounded-2xl border border-slate-800 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Curriculum Completion
            </span>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-extrabold text-white">{overallPlanProgress}%</span>
              <span className="text-xs text-emerald-400 font-semibold">On Track ✓</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${overallPlanProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Duration</span>
              <span className="font-bold text-white">{currentPlan.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Frequency</span>
              <span className="font-bold text-white">{currentPlan.frequency}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Required Position</span>
              <span className="font-bold text-white">{currentUser?.position}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Certification</span>
              <span className="font-bold text-white">Elite XI Badge</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE BREAKDOWN */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">Plan Modules & Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentPlan.modules.map((mod, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {mod.name}
                </h3>
                <span className="text-xs font-semibold text-slate-400">{mod.totalHours} Hours</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span>Mastery Progress</span>
                <span className="font-bold text-emerald-400">{mod.progress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${mod.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALL ACADEMY PLANS SELECTION */}
      <div className="pt-6">
        <h2 className="text-xl font-bold text-white tracking-tight mb-2">All Academy Programs</h2>
        <p className="text-xs text-slate-400 mb-6">Switch your active plan at any time to align with your player objectives</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = plan.id === currentPlan.id;
            return (
              <div
                key={plan.id}
                className={`glass-card p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500/50 bg-slate-900/90 ring-1 ring-emerald-500/30 shadow-xl'
                    : 'border-slate-800 opacity-80 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400">
                      {plan.level}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        Active Plan
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{plan.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => switchPlan(plan.id)}
                    disabled={isSelected}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md'
                    }`}
                  >
                    {isSelected ? 'Currently Enrolled ✓' : <>Enroll in {plan.level} <ArrowUpRight className="w-3.5 h-3.5" /></>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
