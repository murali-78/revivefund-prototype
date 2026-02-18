"use client";

type Milestone = {
  label: string;
  status: string;
  summary: string;
};

type Props = {
  milestones: Milestone[];
};

export function Timeline({ milestones }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative ml-2 flex flex-col gap-3 border-l border-border/70 pl-4">
        {milestones.map((m) => (
          <div key={m.label} className="relative">
            <span
              className={`absolute -left-[0.6rem] top-1 h-2 w-2 rounded-full ${
                m.status === "completed"
                  ? "bg-emerald-400"
                  : m.status === "planned"
                    ? "bg-slate-500"
                    : "bg-amber-400"
              }`}
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-100">{m.label}</span>
              <span className="uppercase tracking-[0.18em] text-[10px]">
                {m.status}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-300">{m.summary}</p>
          </div>
        ))}
        {milestones.length === 0 && (
          <p className="text-[11px] text-slate-500">
            In a live deployment, this would track operational milestones over the Day
            1/7/30/60 window.
          </p>
        )}
      </div>
    </div>
  );
}

