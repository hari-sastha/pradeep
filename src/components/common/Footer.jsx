import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academyConfig';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-extrabold text-white text-base tracking-wider">{ACADEMY_CONFIG.name}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {ACADEMY_CONFIG.subTagline}
            </p>
            <p className="text-[11px] text-emerald-400 font-medium">
              Established {ACADEMY_CONFIG.establishedYear} • Accredited Training Academy
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Academy Portal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Player Login</Link></li>
              <li><Link to="/register" className="hover:text-emerald-400 transition-colors">Player Registration</Link></li>
              <li><a href="#programs" className="hover:text-emerald-400 transition-colors">Academy Programs</a></li>
              <li><a href="#philosophy" className="hover:text-emerald-400 transition-colors">Training Philosophy</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Academy Headquarters</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ACADEMY_CONFIG.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ACADEMY_CONFIG.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ACADEMY_CONFIG.contactEmail}</span>
              </li>
            </ul>
          </div>

          {/* Developer Prototype Disclaimer */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> Technical Notice
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This application is a frontend prototype powered by browser localStorage. All player profiles, tasks, and progress persist locally on your device.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} {ACADEMY_CONFIG.name}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Academy Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
