import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ACADEMY_CONFIG } from '../config/academyConfig';
import {
  Trophy,
  Activity,
  Award,
  Users,
  Target,
  Zap,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Flame,
  LineChart
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pitch-bg-pattern flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse-glow">
            <Flame className="w-4 h-4 fill-emerald-400" />
            Official Elite Player Development Pathway
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Train Hard. Play Smart. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Become Elite.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {ACADEMY_CONFIG.subTagline}
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Join the Academy
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-sm tracking-wide border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              Player Login
            </Link>
          </div>

          {/* Highlight Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">94%</span>
              <span className="text-xs text-slate-400 block mt-1">Pro Pathway Rate</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">12+</span>
              <span className="text-xs text-slate-400 block mt-1">UEFA Certified Coaches</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</span>
              <span className="text-xs text-slate-400 block mt-1">GPS & Video Analysis</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">500+</span>
              <span className="text-xs text-slate-400 block mt-1">Academy Graduates</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-20 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Why Choose Us</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Built for High Performance Footballers</h3>
            <p className="mt-3 text-slate-400 text-sm">
              We combine European academy methodologies with state-of-the-art sports science to accelerate your football intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Technical Ball Mastery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Relentless focus on first touch under pressure, body shape, non-dominant foot accuracy, and rapid 1v1 execution.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Tactical Intelligence</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Understand modern pressing triggers, half-space rotations, counter-attack geometry, and positional discipline.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Performance Tracking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track your fitness load, technical score, task completion streak, and receive direct 1-on-1 mentor video feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY PROGRAMS */}
      <section id="programs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Development Pathways</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Structured Academy Training Plans</h3>
            <p className="mt-3 text-slate-400 text-sm">
              Tailored development curricula designed for every stage of a player's football journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACADEMY_CONFIG.plans.map((plan) => (
              <div
                key={plan.id}
                className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {plan.level}
                    </span>
                    <span className="text-xs text-slate-400">{plan.duration}</span>
                  </div>

                  <h4 className="text-xl font-extrabold text-white">{plan.name}</h4>
                  <p className="text-xs text-emerald-400 font-medium mt-1">{plan.tagline}</p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{plan.description}</p>

                  <div className="mt-6 space-y-2 pt-4 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-300 block mb-2">Core Modules Included:</span>
                    {plan.modules.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{m.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <Link
                    to="/register"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    Enroll in {plan.level}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Take Your Game to the Next Level?
          </h2>
          <p className="mt-4 text-slate-300 text-sm max-w-xl mx-auto">
            Join {ACADEMY_CONFIG.name} today and gain immediate access to your personalized player portal, assigned coach, and elite training tasks.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              Start Player Registration <Zap className="w-4 h-4 fill-slate-950" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
