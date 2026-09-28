import React from 'react';
import { TrendingUp, Award, Zap, CheckCircle2, Star, Shield, Activity, Dumbbell, Brain } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { RadarChart } from '../components/common/RadarChart';
import { calculateAveragePerformance, calculateOverallProgress } from '../utils/calculations';

export const Progress = () => {
  const { progress, tasks } = useAcademy();

  const attributes = progress.attributes || {
    technical: { ballControl: 88, passing: 84, dribbling: 86, finishing: 82 },
    physical: { speed: 85, stamina: 90, strength: 78, agility: 88 },
    mental: { decisionMaking: 86, discipline: 92, tacticalAwareness: 84, composure: 87 }
  };

  const averages = calculateAveragePerformance(attributes);
  const overallRating = calculateOverallProgress(progress, tasks);

  const radarData = {
    technical: averages.technical,
    physical: averages.physical,
    tactical: attributes.mental.tacticalAwareness || 84,
    mental: averages.mental,
    discipline: attributes.mental.discipline || 92
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-emerald-400" /> Player Performance Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Comprehensive physical, technical, and tactical index evaluated by Elite XI coaching staff
        </p>
      </div>

      {/* TOP RATING SUMMARY & RADAR CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Rating Card */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between items-center text-center bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/20">
          <div className="w-full">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Overall Player Index
            </span>
            <div className="text-6xl font-black text-white tracking-tight my-4">
              {overallRating}
              <span className="text-xl text-slate-500 font-semibold">/100</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
              Your overall rating places you in the top <strong className="text-emerald-400">12%</strong> of academy forwards in your age bracket.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 w-full grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Technical</span>
              <span className="font-extrabold text-white text-base">{averages.technical}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Physical</span>
              <span className="font-extrabold text-white text-base">{averages.physical}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Mental</span>
              <span className="font-extrabold text-white text-base">{averages.mental}</span>
            </div>
          </div>
        </div>

        {/* Radar Chart Center Spotlight */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Attribute Pentagon Analysis
            </span>
            <h3 className="text-xl font-extrabold text-white">5-Core Football Matrix</h3>
            <p className="text-xs text-slate-400 max-w-xs mt-2 leading-relaxed">
              Bi-weekly radar chart assessing technical precision, physical endurance, tactical positioning, composure under pressure, and athlete discipline.
            </p>

            <div className="mt-6 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Strongest Core: <strong>Discipline & Stamina</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Focus Growth: <strong>Strength & Finishing</strong></span>
              </div>
            </div>
          </div>

          <RadarChart data={radarData} size={280} />
        </div>
      </div>

      {/* DETAILED ATTRIBUTE CATEGORY BREAKDOWNS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* TECHNICAL BREAKDOWN */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-cyan-400" /> Technical Mastery
            </h3>
            <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
              Avg: {averages.technical}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>First Touch & Ball Control</span>
                <span className="font-bold text-white">{attributes.technical.ballControl}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${attributes.technical.ballControl}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Passing Range & Vision</span>
                <span className="font-bold text-white">{attributes.technical.passing}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${attributes.technical.passing}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Dribbling & 1v1 Evasion</span>
                <span className="font-bold text-white">{attributes.technical.dribbling}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${attributes.technical.dribbling}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Finishing & Shot Power</span>
                <span className="font-bold text-white">{attributes.technical.finishing}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${attributes.technical.finishing}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* PHYSICAL BREAKDOWN */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" /> Physical Athletics
            </h3>
            <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
              Avg: {averages.physical}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Sprint Speed & Acceleration</span>
                <span className="font-bold text-white">{attributes.physical.speed}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${attributes.physical.speed}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Stamina & Aerobic Engine</span>
                <span className="font-bold text-white">{attributes.physical.stamina}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${attributes.physical.stamina}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Upper & Lower Core Strength</span>
                <span className="font-bold text-white">{attributes.physical.strength}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${attributes.physical.strength}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Agility & Change of Direction</span>
                <span className="font-bold text-white">{attributes.physical.agility}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${attributes.physical.agility}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* MENTAL BREAKDOWN */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" /> Tactical & Mental
            </h3>
            <span className="text-xs font-extrabold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20">
              Avg: {averages.mental}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Pressure Decision Making</span>
                <span className="font-bold text-white">{attributes.mental.decisionMaking}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${attributes.mental.decisionMaking}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Academy Training Discipline</span>
                <span className="font-bold text-white">{attributes.mental.discipline}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${attributes.mental.discipline}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Tactical Position Awareness</span>
                <span className="font-bold text-white">{attributes.mental.tacticalAwareness}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${attributes.mental.tacticalAwareness}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Composure & Match Focus</span>
                <span className="font-bold text-white">{attributes.mental.composure}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${attributes.mental.composure}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEVELOPMENT JOURNEY TIMELINE */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800">
        <h2 className="text-xl font-extrabold text-white tracking-tight mb-2">Development Journey</h2>
        <p className="text-xs text-slate-400 mb-8">Milestones unlocked throughout your academy pathway</p>

        <div className="relative border-l-2 border-slate-800 pl-6 space-y-8 ml-2">
          {progress.journeyMilestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className={`absolute -left-[31px] top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                m.completed
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'bg-slate-900 border-slate-700 text-transparent'
              }`}>
                {m.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className={`text-base font-bold ${m.completed ? 'text-white' : 'text-slate-400'}`}>
                    {m.title}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {m.date}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {m.completed ? 'Milestone verified by head coaching staff.' : 'Upcoming benchmark objective.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
