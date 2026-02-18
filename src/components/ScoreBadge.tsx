import type { FC } from "react";

type ScoreBadgeProps = {
  label: string;
  value: number;
  tone?: "good" | "neutral" | "bad";
};

export const ScoreBadge: FC<ScoreBadgeProps> = ({ label, value, tone = "neutral" }) => {
  const toneClasses =
    tone === "good"
      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
      : tone === "bad"
        ? "border-danger/60 bg-danger/10 text-danger"
        : "border-slate-500/60 bg-slate-800/60 text-slate-200";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] ${toneClasses}`}
    >
      <span className="uppercase tracking-wide text-[9px] text-slate-400">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
};

