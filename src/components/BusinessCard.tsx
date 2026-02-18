import Link from "next/link";
import type { Business } from "@prisma/client";
import { ScoreBadge } from "./ScoreBadge";

type BusinessWithDerived = Business & {
  urgency: number;
  recoveryProbability: number;
};

type Props = {
  business: BusinessWithDerived;
  highlightMode?: "featured" | "list";
};

export function BusinessCard({ business, highlightMode = "list" }: Props) {
  const fundedPct = Math.round(
    (business.currentFunded / Math.max(business.fundingGoal, 1)) * 100,
  );

  const isEmergency = business.emergency;

  return (
    <Link
      href={`/b/${business.slug}`}
      className={`glass-panel group flex flex-col gap-4 p-4 transition hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-soft-elevated ${
        highlightMode === "featured" ? "md:flex-row md:items-start md:gap-6" : ""
      }`}
    >
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="pill border-border/70 bg-muted-soft/80 text-[11px]">
              {business.category}
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              {business.city}
            </span>
            {isEmergency && (
              <span className="pill border-danger/50 bg-danger/10 text-[11px] text-danger">
                Emergency mode
              </span>
            )}
          </div>
          <ScoreBadge
            label="Urgency"
            value={business.urgency}
            tone={business.urgency > 72 ? "bad" : "neutral"}
          />
        </div>

        <h2 className="text-sm font-semibold tracking-tight text-slate-50">
          {business.name}
        </h2>
        <p className="text-xs leading-relaxed text-slate-300 line-clamp-3">
          {business.shortDescription}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative h-1.5 w-28 overflow-hidden rounded-full bg-slate-800">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                style={{ width: `${Math.min(100, fundedPct)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">
              {fundedPct}% funded · {formatCurrency(business.currentFunded)} rSOL
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            Goal {formatCurrency(business.fundingGoal)} rSOL
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 text-right">
        <ScoreBadge
          label="Recovery odds"
          value={Math.round(business.recoveryProbability * 100)}
          tone={business.recoveryProbability > 0.7 ? "good" : "neutral"}
        />
        <ScoreBadge
          label="Risk"
          value={business.riskScore}
          tone={business.riskScore > 65 ? "bad" : "neutral"}
        />
        <button
          type="button"
          className="mt-1 inline-flex items-center rounded-full bg-accent/90 px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-soft-elevated transition group-hover:bg-accent"
        >
          View turnaround plan
        </button>
      </div>
    </Link>
  );
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(v);
}

