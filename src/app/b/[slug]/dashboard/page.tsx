import { prisma } from "@/lib/prisma";
import { analyzeBusiness } from "@/lib/health";
import { RevenueChart } from "./revenue-chart";
import { FundUsagePie } from "./usage-pie";
import { Timeline } from "./timeline";

type Props = {
  params: { slug: string };
};

export default async function BusinessDashboardPage({ params }: Props) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
    include: {
      contributions: {
        orderBy: { createdAt: "desc" },
        take: 6,
      },
      updates: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!business) {
    return (
      <div className="glass-panel p-6 text-sm text-slate-200">
        No dashboard for this venture. Try navigating from the home urgency board.
      </div>
    );
  }

  const analysis = analyzeBusiness(business);
  const monthly = safeParse(business.monthlyRevenue) as {
    history?: { month: string; revenue: number; expenses: number }[];
  };
  const usage = safeParse(business.fundUsagePlan) as {
    items?: { label: string; percent: number }[];
  };
  const timeline = safeParse(business.timeline) as {
    milestones?: { label: string; status: string; summary: string }[];
  };

  const fundedPct = Math.round(
    (business.currentFunded / Math.max(business.fundingGoal, 1)) * 100,
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill border-border/70 bg-muted-soft/70 text-[11px]">
              Impact & Recovery Dashboard
            </p>
            <h1 className="mt-2 text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              {business.name}
            </h1>
            <p className="max-w-xl text-xs text-slate-300">
              Follow how rSOL is allocated, how revenue is trending, and how close this
              venture is to a clean recovery.
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            <p>
              {fundedPct}% of{" "}
              <span className="font-semibold text-slate-100">
                {business.fundingGoal.toLocaleString()} rSOL
              </span>{" "}
              goal
            </p>
            <p className="mt-1">
              AI Health:{" "}
              <span className="font-semibold text-slate-100">
                {analysis.healthScore}/100
              </span>{" "}
              · AI Risk:{" "}
              <span className="font-semibold text-slate-100">
                {analysis.riskScore}/100 ({analysis.riskLabel})
              </span>
              <span className="block mt-0.5 text-[10px] text-slate-500">Computed from trend signals (runway, revenue/expense slope, urgency).</span>
            </p>
          </div>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${Math.min(100, fundedPct)}%` }}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.8fr)]">
        <div className="glass-panel flex flex-col gap-3 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Operational Stability Trend
          </h2>
          <p className="text-xs text-slate-300">
            Monthly revenue vs. expenses over the last six months, showing how close this
            venture is to break-even and what your rSOL is protecting.
          </p>
          <div className="h-56">
            <RevenueChart history={monthly.history ?? []} />
          </div>
          <p className="text-[10px] text-slate-500">
            AI uses these trend signals to estimate recovery probability.
          </p>
        </div>

        <div className="glass-panel flex flex-col gap-3 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Planned use of funds
          </h2>
          <p className="text-xs text-slate-300">
            How this round is intended to be deployed across debt, team, growth, and
            buffers. This is a living plan — not a legal promise.
          </p>
          <div className="h-56">
            <FundUsagePie items={usage.items ?? []} />
          </div>
          <p className="text-[10px] text-slate-500">
            AI uses these trend signals to estimate recovery probability.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.6fr)]">
        <div className="glass-panel flex flex-col gap-3 p-4 text-xs">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Live revival timeline
          </h2>
          <p className="text-slate-300">
            Day 1 / 7 / 30 / 60 milestones. See what&apos;s been hit, what slipped,
            and what your rSOL is buying time for.
          </p>
          <Timeline milestones={timeline.milestones ?? []} />
        </div>

        <div className="glass-panel flex flex-col gap-3 p-4 text-xs">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Activity log
          </h2>
          <p className="text-slate-300">
            Every pledge and key operational update lands here so backers can see the
            story unfold.
          </p>
          <div className="mt-2 space-y-2">
            {business.updates.map((u) => (
              <div
                key={u.id}
                className="rounded-lg border border-border/60 bg-slate-950/60 p-2.5"
              >
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-200">{u.title}</span>
                  <span>
                    {new Date(u.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">{u.body}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="pill border-border/70 bg-slate-900/80 text-[10px]">
                    {u.type}
                  </span>
                  {u.amount ? <span>+{u.amount.toLocaleString()} rSOL</span> : null}
                  {u.tag ? <span>· {u.tag}</span> : null}
                </div>
              </div>
            ))}
            {business.updates.length === 0 && (
              <p className="text-[11px] text-slate-500">
                No updates yet — in a real deployment, venture operators would post weekly notes
                here.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function safeParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

