import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BusinessCard } from "@/components/BusinessCard";
import { analyzeBusiness } from "@/lib/health";

export default async function SuccessPage() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "asc" },
  });

  // In a real app, we'd filter by actual success metrics. For demo, we'll show
  // businesses with high revival scores and good funding progress.
  const successStories = businesses
    .map((b) => {
      const analysis = analyzeBusiness(b);
      return {
        ...b,
        urgency: analysis.urgency,
        recoveryProbability: analysis.recoveryProbability,
        _health: analysis,
      };
    })
    .filter((b) => {
      const fundedPct = b.currentFunded / Math.max(b.fundingGoal, 1);
      return (
        b.revivalScore > 75 ||
        fundedPct > 0.6 ||
        b.recoveryProbability > 0.8 ||
        b.healthScore > 70
      );
    })
    .sort((a, b) => b.revivalScore - a.revivalScore)
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill mb-2 border-emerald-500/40 bg-emerald-500/10 text-[11px] text-emerald-300">
              Success stories
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Revived Climate & Green Health Ventures
            </h1>
            <p className="max-w-xl text-xs text-slate-300">
              These ventures hit their milestones, stabilized operations, and are on
              track for recovery. See how rSOL backing and community support made the
              difference.
            </p>
          </div>
        </div>
      </section>

      {successStories.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {successStories.map((business) => (
            <div key={business.id} className="relative">
              <BusinessCard business={business} />
              <div className="mt-2 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-[11px] text-emerald-200">
                <span>AI Recovery: {Math.round(business.recoveryProbability * 100)}%</span>
                <span className="font-semibold">
                  Revival Score: {business.revivalScore}
                </span>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="glass-panel p-6 text-center text-xs text-slate-400">
          No success stories yet. As ventures hit milestones and stabilize, they&apos;ll
          appear here.
        </div>
      )}

      <section className="glass-panel flex flex-col gap-3 p-4 text-xs text-slate-300">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          What makes a success story?
        </h2>
        <ul className="space-y-2 text-[11px]">
          <li>
            • <span className="font-medium text-slate-100">High Revival Score:</span>{" "}
            Community engagement and milestone completion boost this metric.
          </li>
          <li>
            • <span className="font-medium text-slate-100">Strong funding progress:</span>{" "}
            Ventures that reach 60%+ of their goal show momentum.
          </li>
          <li>
            • <span className="font-medium text-slate-100">AI Recovery Probability:</span>{" "}
            Our AI scorer flags ventures with 80%+ probability of recovery.
          </li>
          <li>
            • <span className="font-medium text-slate-100">AI Health Score improvement:</span>{" "}
            Ventures that stabilize revenue and reduce burn appear here.
          </li>
        </ul>
      </section>
    </div>
  );
}
