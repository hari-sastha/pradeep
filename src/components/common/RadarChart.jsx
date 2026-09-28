import React from 'react';

export const RadarChart = ({ data = {}, size = 300 }) => {
  const metrics = [
    { key: 'technical', label: 'Technical', val: data.technical || 85 },
    { key: 'physical', label: 'Physical', val: data.physical || 88 },
    { key: 'tactical', label: 'Tactical', val: data.tactical || 82 },
    { key: 'mental', label: 'Mental', val: data.mental || 86 },
    { key: 'discipline', label: 'Discipline', val: data.discipline || 91 },
  ];

  const center = size / 2;
  const radius = size * 0.35;
  const total = metrics.length;
  const angleSlice = (Math.PI * 2) / total;

  // Compute point coordinates
  const getCoordinates = (value, index) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Compute grid polygon points
  const getGridPoints = (levelPct) => {
    return metrics
      .map((_, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const r = (levelPct / 100) * radius;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
      })
      .join(' ');
  };

  // Compute player polygon points
  const playerPoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(m.val, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {[20, 40, 60, 80, 100].map((level) => (
          <polygon
            key={level}
            points={getGridPoints(level)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray={level === 100 ? "none" : "2,2"}
          />
        ))}

        {/* Axes lines */}
        {metrics.map((_, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Area */}
        <polygon
          points={playerPoints}
          fill="rgba(16, 185, 129, 0.25)"
          stroke="#10b981"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Attribute Data Points & Labels */}
        {metrics.map((m, i) => {
          const { x, y } = getCoordinates(m.val, i);
          const angle = i * angleSlice - Math.PI / 2;
          const labelDist = radius + 25;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          return (
            <g key={m.key}>
              <circle cx={x} cy={y} r="4.5" fill="#10b981" stroke="#064e3b" strokeWidth="2" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[11px] font-semibold fill-slate-300"
              >
                {m.label} ({m.val})
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
