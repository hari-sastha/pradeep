import React from 'react';

export const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "emerald" }) => {
  const colorMap = {
    emerald: {
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      glow: "hover:border-emerald-500/40",
    },
    blue: {
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/10 text-blue-400",
      glow: "hover:border-blue-500/40",
    },
    amber: {
      border: "border-amber-500/20",
      iconBg: "bg-amber-500/10 text-amber-400",
      glow: "hover:border-amber-500/40",
    },
    purple: {
      border: "border-purple-500/20",
      iconBg: "bg-purple-500/10 text-purple-400",
      glow: "hover:border-purple-500/40",
    },
  };

  const style = colorMap[color] || colorMap.emerald;

  return (
    <div className={`glass-card p-5 rounded-2xl border ${style.border} ${style.glow} transition-all duration-300 flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${style.iconBg} shadow-inner`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-3xl font-extrabold text-white tracking-tight">{value}</div>
        {(subtitle || trend) && (
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
            {trend && <span className="text-emerald-400 font-semibold">{trend}</span>}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
