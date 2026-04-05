import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

function formatFundingType(type: string) {
  const labels: Record<string, string> = {
    DONATION: "Community Backing",
    INVESTMENT: "Outcome Share",
    REVENUE_SHARE: "Impact-Linked Return",
    REWARD: "Impact Perks",
  };
  return labels[type] ?? type;
}
import { prisma } from "@/lib/prisma";
import { logoutAction } from "../auth/actions";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const contributions = await prisma.contribution.findMany({
    where: { userId: user.id },
    include: { business: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const adoptions = await prisma.adoption.findMany({
    where: { userId: user.id },
    include: { business: true },
    orderBy: { createdAt: "desc" },
  });

  const expertOffers =
    user.role === "EXPERT"
      ? await prisma.expertOffer.findMany({
          where: { expertId: user.id },
          include: { business: true },
          orderBy: { createdAt: "desc" },
        })
      : [];

  const businesses =
    user.role === "OWNER"
      ? await prisma.business.findMany({
          where: { ownerId: user.id },
          orderBy: { createdAt: "desc" },
        })
      : [];

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill mb-2 border-accent/40 bg-accent-soft/20 text-[11px] text-accent">
              Your profile
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              {user.name}
            </h1>
            <p className="text-xs text-slate-300">{user.email}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="pill border-border/70 bg-muted-soft/70 text-[11px]">
              {user.role}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-border bg-muted/70 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-danger hover:text-danger"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mt-2 grid gap-4 md:grid-cols-3">
          <div className="glass-panel flex flex-col gap-2 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Contributions
            </p>
            <p className="text-2xl font-semibold text-slate-50">
              {contributions.length}
            </p>
            <p className="text-xs text-slate-400">
              {contributions.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}{" "}
              rSOL total
            </p>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Adoptions
            </p>
            <p className="text-2xl font-semibold text-slate-50">{adoptions.length}</p>
            <p className="text-xs text-slate-400">
              {adoptions.reduce((sum, a) => sum + a.earnedRsol, 0).toLocaleString()}{" "}
              rSOL earned
            </p>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Role
            </p>
            <p className="text-lg font-semibold text-slate-50">{user.role}</p>
            <p className="text-xs text-slate-400">
              Switch accounts in demo mode to see different views
            </p>
          </div>
        </div>
      </section>

      {contributions.length > 0 && (
        <section className="glass-panel flex flex-col gap-3 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Recent contributions
          </h2>
          <div className="space-y-2">
            {contributions.map((c) => (
              <Link
                key={c.id}
                href={`/b/${c.business.slug}`}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-slate-950/60 p-2.5 text-xs text-slate-200 hover:border-accent/60"
              >
                <div>
                  <p className="font-medium text-slate-100">{c.business.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {formatFundingType(c.type)} · {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-semibold text-accent">
                  +{c.amount.toLocaleString()} rSOL
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {adoptions.length > 0 && (
        <section className="glass-panel flex flex-col gap-3 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Active adoptions
          </h2>
          <div className="space-y-2">
            {adoptions.map((a) => (
              <Link
                key={a.id}
                href={`/b/${a.business.slug}`}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-slate-950/60 p-2.5 text-xs text-slate-200 hover:border-accent/60"
              >
                <div>
                  <p className="font-medium text-slate-100">{a.business.name}</p>
                  <p className="text-[11px] text-slate-400">
                    Status: {a.status} · Earned: {a.earnedRsol} rSOL
                  </p>
                </div>
                <span className="pill border-border/70 bg-slate-900/80 text-[10px]">
                  {a.status}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {user.role === "OWNER" && businesses.length > 0 && (
        <section className="glass-panel flex flex-col gap-3 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Your ventures
          </h2>
          <div className="space-y-2">
            {businesses.map((b) => (
              <Link
                key={b.id}
                href={`/b/${b.slug}`}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-slate-950/60 p-2.5 text-xs text-slate-200 hover:border-accent/60"
              >
                <div>
                  <p className="font-medium text-slate-100">{b.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {b.currentFunded.toLocaleString()} / {b.fundingGoal.toLocaleString()}{" "}
                    rSOL
                  </p>
                </div>
                <Link
                  href={`/b/${b.slug}/dashboard`}
                  className="text-[11px] text-accent hover:underline"
                >
                  Dashboard →
                </Link>
              </Link>
            ))}
          </div>
        </section>
      )}

      {user.role === "EXPERT" && expertOffers.length > 0 && (
        <section className="glass-panel flex flex-col gap-3 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Your expert offers
          </h2>
          <div className="space-y-2">
            {expertOffers.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-slate-950/60 p-2.5 text-xs text-slate-200"
              >
                <div>
                  <p className="font-medium text-slate-100">{o.title}</p>
                  <p className="text-[11px] text-slate-400">
                    {o.business?.name ?? "General offer"} · {o.rewardRsol} rSOL reward
                  </p>
                </div>
                <span className="pill border-border/70 bg-slate-900/80 text-[10px]">
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
