import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { BusinessCard } from "@/components/BusinessCard";
import { analyzeBusiness } from "@/lib/health";
import Link from "next/link";
import { AdoptBusinessForm } from "./adopt-form";

export default async function AdoptPage() {
  const user = await getCurrentUser();

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
      };
    })
    .sort((a, b) => b.urgency - a.urgency);

  const adoptions = user
    ? await prisma.adoption.findMany({
        where: { userId: user.id, status: "ACTIVE" },
        include: { business: true },
      })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill mb-2 border-accent/40 bg-accent-soft/20 text-[11px] text-accent">
              Adopt a venture
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Pick a green health or climate venture to support actively
            </h1>
            <p className="max-w-xl text-xs text-slate-300">
              When you adopt a venture, you commit to completing tasks that help their
              recovery. You earn rSOL and boost their Revival Score as you complete
              milestones.
            </p>
          </div>
        </div>

        {!user && (
          <div className="mt-2 rounded-lg border border-border/60 bg-slate-950/60 p-3 text-xs text-slate-300">
            <Link href="/auth" className="text-accent hover:underline">
              Sign in
            </Link>{" "}
            to adopt a venture and start earning rSOL through completion tasks.
          </div>
        )}

        {adoptions.length > 0 && (
          <div className="mt-2">
            <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Your active adoptions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {adoptions.map((a) => (
                <div
                  key={a.id}
                  className="glass-panel flex flex-col gap-3 p-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/b/${a.business.slug}`}
                      className="font-semibold text-slate-50 hover:text-accent"
                    >
                      {a.business.name}
                    </Link>
                    <span className="pill border-accent/40 bg-accent-soft/20 text-[10px] text-accent">
                      {a.earnedRsol} rSOL earned
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Status: {a.status} · Started{" "}
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/b/${a.business.slug}`}
                    className="text-[11px] text-accent hover:underline"
                  >
                    View venture →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Available to adopt
          </h2>
          <p className="text-[11px] text-slate-500">
            Sorted by urgency — ventures that need help most appear first.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {enriched.map((b) => (
            <div key={b.id} className="relative">
              <BusinessCard business={b} />
              {user && (
                <div className="mt-2">
                  <AdoptBusinessForm businessId={b.id} businessSlug={b.slug} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
