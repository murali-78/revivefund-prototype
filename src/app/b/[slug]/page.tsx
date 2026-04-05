import { prisma } from "@/lib/prisma";
import { analyzeBusiness } from "@/lib/health";
import { FundingModal } from "@/components/FundingModal";
import { ScoreBadge } from "@/components/ScoreBadge";
import { ImageGallery } from "@/components/ImageGallery";
import { contributeToBusiness } from "./actions";
import Link from "next/link";

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
        This venture doesn&apos;t exist in this demo. Try going back to the home board.
      </div>
    );
  }

  const analysis = analyzeBusiness(business);
  const monthly = parseMonthly(business.monthlyRevenue);
  const last = monthly.length > 0 ? monthly[monthly.length - 1] : undefined;
  const galleryImages: string[] = JSON.parse((business as any).gallery || "[]");
  const fundedPct = Math.round((business.currentFunded / business.fundingGoal) * 100);

  return (
    <div className="flex flex-col gap-8">

      {/* ─── HERO HEADER ─── */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 p-6 sm:p-8 shadow-soft-elevated">
        {/* subtle accent glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-500/[0.05] blur-[80px]" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* top row: category + emergency */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill">{business.category}</span>
            <span className="pill">{business.city}{business.country ? `, ${business.country}` : ""}</span>
            {business.emergency && (
              <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                Emergency
              </span>
            )}
          </div>

          {/* title */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {business.name}
              </h1>
              <p className="text-sm leading-relaxed text-slate-300/90">
                {business.shortDescription}
              </p>
            </div>
            <Link
              href={`/b/${business.slug}/dashboard`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 10.5V13h2.5L11 5.5 8.5 3 1 10.5zM13.3 2.7a.75.75 0 000-1.06l-1.44-1.44a.75.75 0 00-1.06 0L9.5 1.5 12 4l1.3-1.3z" fill="currentColor"/></svg>
              Open Dashboard
            </Link>
          </div>

          {/* funding progress bar */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">
                Funded: <span className="font-bold text-white">{business.currentFunded.toLocaleString()} rSOL</span>
              </span>
              <span className="text-slate-400">
                Goal: <span className="font-semibold text-slate-200">{business.fundingGoal.toLocaleString()} rSOL</span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800 border border-white/[0.04]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out shadow-sm shadow-emerald-500/30"
                style={{ width: `${Math.min(fundedPct, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {fundedPct}% funded · Community Backing, Outcome Share, Impact-Linked Return, Impact Perks — all simulated
            </p>
          </div>
        </div>
      </section>

      {/* ─── AI HEALTH ANALYSIS ─── */}
      <section className="rounded-3xl border border-white/[0.06] bg-slate-900/60 shadow-soft-elevated overflow-hidden">
        {/* section header */}
        <div className="border-b border-white/[0.06] px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="hsl(162 84% 56%)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">AI Venture Health Analysis</h2>
              <p className="text-[10px] text-slate-500">Signals: runway, revenue slope, expense slope, urgency flag, funding gap</p>
            </div>
          </div>
        </div>

        {/* scores row */}
        <div className="px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
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
              label="Recovery"
              value={Math.round(analysis.recoveryProbability * 100)}
              suffix="%"
              tone={analysis.recoveryProbability > 0.7 ? "good" : "neutral"}
            />
          </div>

          {/* commentary */}
          <div className="mt-5 space-y-2 border-t border-white/[0.04] pt-5">
            <ul className="space-y-1.5">
              {analysis.commentary.map((line) => (
                <li key={line} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500/60" />
                  {line}
                </li>
              ))}
            </ul>
            {last && (
              <p className="text-xs text-slate-500">
                Latest month:{" "}
                <span className="font-semibold text-slate-300">
                  {last.revenue.toLocaleString()} revenue / {last.expenses.toLocaleString()} expenses
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── IMAGE GALLERY ─── */}
      <ImageGallery images={galleryImages} />

      {/* ─── STORY + FUNDING SIDE BY SIDE ─── */}
      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Revival story */}
        <article className="rounded-3xl border border-white/[0.06] bg-slate-900/60 shadow-soft-elevated overflow-hidden">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="text-sm font-bold text-white">Revival Story</h2>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm leading-[1.8] text-slate-300/90 whitespace-pre-line">{business.story}</p>
          </div>
        </article>

        {/* Funding CTA */}
        <aside className="flex flex-col rounded-3xl border border-white/[0.06] bg-slate-900/60 shadow-soft-elevated overflow-hidden">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="text-sm font-bold text-white">Fund This Venture</h2>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-5 px-6 py-5">
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-400">
                Your rSOL pledge updates this venture&apos;s transparency dashboard instantly —
                the funding bar moves, runway projections tick up, and a public log entry is added.
              </p>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-[11px] text-slate-500">Recommended pledge</p>
                <p className="text-lg font-bold tracking-tight text-white">
                  {analysis.recommendedRange.min.toLocaleString()} – {analysis.recommendedRange.max.toLocaleString()}
                  <span className="ml-1 text-sm font-normal text-slate-400">rSOL</span>
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">Based on goal size and risk profile</p>
              </div>
            </div>

            <div className="space-y-3">
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
              <p className="text-[10px] text-slate-600">
                After pledging, open the{" "}
                <Link href={`/b/${business.slug}/dashboard`} className="font-semibold text-slate-400 underline decoration-slate-700 underline-offset-2 hover:text-white transition-colors">
                  dashboard
                </Link>{" "}
                for the full transparency story.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

type RevenueHistory = { history?: { month: string; revenue: number; expenses: number }[] };

function parseMonthly(raw: string): NonNullable<RevenueHistory["history"]> {
  try {
    const parsed = JSON.parse(raw) as RevenueHistory;
    return parsed.history ?? [];
  } catch {
    return [];
  }
}
