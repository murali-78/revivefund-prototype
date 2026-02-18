import { prisma } from "@/lib/prisma";
import { analyzeBusiness } from "@/lib/health";
import { BusinessCard } from "@/components/BusinessCard";

export default async function Home() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "asc" },
  });

  const enriched = businesses
    .map((b) => {
      const analysis = analyzeBusiness(b);
      return {
        ...b,
        urgency: analysis.urgency,
        recoveryProbability: analysis.recoveryProbability,
        _health: analysis,
      };
    })
    .sort((a, b) => b.urgency - a.urgency);

  const featured = enriched[0];
  const rest = enriched.slice(1);

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill mb-2 border-accent/40 bg-accent-soft/20 text-[11px] text-accent">
              AI-backed turnaround radar
            </p>
            <h1 className="max-w-xl text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              See which businesses are closest to the edge — and how your rSOL moves the line.
            </h1>
          </div>
          <div className="text-xs text-slate-400">
            <p>Signals blend revenue trends, runway, and emergency flags.</p>
            <p>Logic is rules-based today and ready for a drop-in LLM tomorrow.</p>
          </div>
        </div>

        {featured && (
          <div className="mt-2">
            <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Top urgency pick
            </h2>
            <BusinessCard business={featured} highlightMode="featured" />
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Live urgency board
          </h2>
          <p className="text-[11px] text-slate-500">
            Sorted by a rules-based “who actually needs the bridge” score.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      </section>

      <section className="mt-2 flex flex-col gap-2 text-xs text-slate-500">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          How to demo this
        </h3>
        <ol className="list-decimal space-y-1 pl-4">
          <li>Pick a business from the urgency board.</li>
          <li>Open its profile, review the turnaround plan, and pledge rSOL.</li>
          <li>Watch the transparency dashboard update funding, charts, and log entries.</li>
        </ol>
      </section>
    </div>
  );
}
