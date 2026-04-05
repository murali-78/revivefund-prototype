import type { FC } from "react";

type ScoreBadgeProps = {
  label: string;
  value: number;
  tone?: "good" | "neutral" | "bad";
  suffix?: string;
};

export const ScoreBadge: FC<ScoreBadgeProps> = ({ label, value, tone = "neutral", suffix = "" }) => {
  const ring =
    tone === "good"
      ? "from-emerald-500 to-emerald-400"
      : tone === "bad"
        ? "from-red-500 to-orange-400"
        : "from-slate-500 to-slate-400";

  const textColor =
    tone === "good"
      ? "text-emerald-300"
      : tone === "bad"
        ? "text-red-400"
        : "text-slate-100";

  const bgGlow =
    tone === "good"
      ? "bg-emerald-500/5"
      : tone === "bad"
        ? "bg-red-500/5"
        : "bg-slate-500/5";

  // SVG donut ring
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value, 100);
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className={`flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] ${bgGlow} px-5 py-4 min-w-[120px]`}>
      <svg width="68" height="68" viewBox="0 0 68 68" className="drop-shadow-sm">
        {/* track */}
        <circle cx="34" cy="34" r={radius} fill="none" stroke="hsl(218 14% 18%)" strokeWidth="5" />
        {/* value arc */}
        <circle
          cx="34"
          cy="34"
          r={radius}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className={`stroke-current ${textColor}`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 34 34)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text
          x="34"
          y="36"
          textAnchor="middle"
          dominantBaseline="central"
          className={`fill-current ${textColor} text-sm font-bold`}
          style={{ fontSize: "15px", fontWeight: 700 }}
        >
          {value}{suffix}
        </text>
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 text-center leading-tight">
        {label}
      </span>
    </div>
  );
};
