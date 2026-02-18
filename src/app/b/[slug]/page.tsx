import { prisma } from "@/lib/prisma";
import { analyzeBusiness } from "@/lib/health";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { FundingModal } from "@/components/FundingModal";
import { ScoreBadge } from "@/components/ScoreBadge";
import { contributeToBusiness } from "./actions";

type Props = {
  params: { slug: string };
};

export default async function BusinessProfilePage({ params }: Props) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
  });

  if (!business) {
    return (
      <div className="glass-panel p-6 text-sm text-slate-200">
        This turnaround doesn&apos;t exist in this demo. Try going back to the home board.
      </div>
    );
  }

  const analysis = analyzeBusiness(business);

  const monthly = parseMonthly(business.monthlyRevenue);
  const last = monthly[monthly.length - 1];

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="pill border-border/70 bg-muted-soft/70 text-[11px]">
              {business.category}
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              {business.city}
            </p>
            <h1 className="max-w-xl text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              {business.name}
            </h1>
            <p className="max-w-2xl text-xs leading-relaxed text-slate-300">
              {business.shortDescription}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right text-[11px] text-slate-400">
            <p>
              Target round:{" "}
              <span className="font-semibold text-slate-100">
                {business.fundingGoal.toLocaleString()} rSOL
              </span>
            </p>
            <p>
              Already committed:{" "}
              <span className="font-semibold text-slate-100">
                {business.currentFunded.toLocaleString()} rSOL
              </span>
            </p>
            <p>
              Model: donation, investment, revenue-share, and rewards — all simulated.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <BeforeAfterSlider
            beforeSrc={business.beforeImageUrl}
            afterSrc={business.afterImageUrl}
            alt={business.name}
          />

          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-slate-950/50 p-4 text-xs text-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ScoreBadge
                label="Health"
                value={analysis.healthScore}
                tone={analysis.healthScore > 70 ? "good" : "neutral"}
              />
              <ScoreBadge
                label="Risk"
                value={analysis.riskScore}
                tone={analysis.riskScore > 65 ? "bad" : "neutral"}
              />
              <ScoreBadge
                label="Recovery odds"
                value={Math.round(analysis.recoveryProbability * 100)}
                tone={analysis.recoveryProbability > 0.7 ? "good" : "neutral"}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Our offline scorer looks at recent revenue vs. expenses, how much of the round
              is already filled, and whether the business is in emergency mode. The weights
              are hand-tuned, and the code is structured so you can drop in an LLM later.
            </p>
            <ul className="space-y-1 text-[11px] text-slate-300">
              {analysis.commentary.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
            {last && (
              <p className="mt-1 text-[11px] text-slate-400">
                Latest month:{" "}
                <span className="font-medium text-slate-100">
                  {last.revenue.toLocaleString()} revenue /{" "}
                  {last.expenses.toLocaleString()} expenses
                </span>
                . This is the base we&apos;re trying to protect.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)]">
        <article className="glass-panel flex flex-col gap-3 p-5 text-xs text-slate-200">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Turnaround plan
          </h2>
          <p className="whitespace-pre-line text-slate-300">{business.story}</p>
        </article>

        <aside className="glass-panel flex flex-col gap-3 p-5 text-xs">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Fund this turnaround
          </h2>
          <p className="text-slate-300">
            Your rSOL pledge updates this business&apos;s transparency dashboard immediately:
            funding bar moves, runway projections tick up, and a public log entry is added.
          </p>
          <div className="mt-1 text-[11px] text-slate-400">
            Recommended band for you:{" "}
            <span className="font-medium text-slate-100">
              {analysis.recommendedRange.min.toLocaleString()}–{" "}
              {analysis.recommendedRange.max.toLocaleString()} rSOL
            </span>{" "}
            based on goal size and risk.
          </div>

          <div className="mt-3">
            <FundingModal
              businessName={business.name}
              defaultAmount={analysis.recommendedRange.min}
              minRecommended={analysis.recommendedRange.min}
              maxRecommended={analysis.recommendedRange.max}
              onSubmit={async (payload) => {
                "use server";
                await contributeToBusiness({
                  slug: business.slug,
                  amount: payload.amount,
                  type: payload.type,
                  note: payload.note,
                });
              }}
            />
          </div>

          <p className="mt-2 text-[10px] text-slate-500">
            To see the full transparency story, open the{" "}
            <span className="font-medium text-slate-300">dashboard</span> for this
            business after pledging.
          </p>
        </aside>
      </section>
    </div>
  );
}

type RevenueHistory = { history?: { month: string; revenue: number; expenses: number }[] };

function parseMonthly(raw: string): RevenueHistory["history"] {
  try {
    const parsed = JSON.parse(raw) as RevenueHistory;
    return parsed.history ?? [];
  } catch {
    return [];
  }
}

