import React from 'react';

export const CircularProgress = ({ percentage = 75, size = 120, strokeWidth = 10, label = "Progress", color = "#10b981" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress bar */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Inner Content */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-extrabold text-white tracking-tight">{percentage}%</span>
        {label && <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
};
