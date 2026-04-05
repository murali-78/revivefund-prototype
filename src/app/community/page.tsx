import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { CreateOfferForm } from "./create-offer-form";
import { acceptOfferAction } from "./actions";

export default async function CommunityPage() {
  const user = await getCurrentUser();

  const offers = await prisma.expertOffer.findMany({
    include: {
      expert: true,
      business: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const openOffers = offers.filter((o) => o.status === "OPEN");
  const acceptedOffers = offers.filter((o) => o.status === "ACCEPTED");

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill mb-2 border-accent/40 bg-accent-soft/20 text-[11px] text-accent">
              Expert marketplace
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Community revival help
            </h1>
            <p className="max-w-xl text-xs text-slate-300">
              Experts offer specialized help to green health & climate ventures. Venture
              owners can accept offers, and contributors earn rSOL when they support expert-led
              revivals.
            </p>
          </div>
        </div>

        {user?.role === "EXPERT" && (
          <div className="mt-2">
            <CreateOfferForm />
          </div>
        )}

        {!user && (
          <div className="mt-2 rounded-lg border border-border/60 bg-slate-950/60 p-3 text-xs text-slate-300">
            <Link href="/auth" className="text-accent hover:underline">
              Sign in as an Expert
            </Link>{" "}
            to offer help, or as a Venture Owner to accept offers.
          </div>
        )}
      </section>

      {openOffers.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Open offers ({openOffers.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {openOffers.map((offer) => (
              <div
                key={offer.id}
                className="glass-panel flex flex-col gap-3 p-4 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-50">{offer.title}</h3>
                    <p className="mt-1 text-[11px] text-slate-300">
                      {offer.description}
                    </p>
                  </div>
                  <span className="pill border-accent/40 bg-accent-soft/20 text-[10px] text-accent">
                    {offer.rewardRsol} rSOL
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <div>
                    <p>
                      Expert: <span className="text-slate-200">{offer.expert.name}</span>
                    </p>
                    {offer.business && (
                      <p>
                        For:{" "}
                        <Link
                          href={`/b/${offer.business.slug}`}
                          className="text-accent hover:underline"
                        >
                          {offer.business.name}
                        </Link>
                      </p>
                    )}
                  </div>
                  {user?.role === "OWNER" && offer.business && (
                    <form action={acceptOfferAction}>
                      <input type="hidden" name="offerId" value={offer.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-accent/60 bg-accent-soft/20 px-3 py-1 text-[10px] font-medium text-accent hover:bg-accent-soft/30"
                      >
                        Accept offer
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {acceptedOffers.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Accepted offers ({acceptedOffers.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {acceptedOffers.map((offer) => (
              <div
                key={offer.id}
                className="glass-panel flex flex-col gap-3 p-4 text-xs opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-50">{offer.title}</h3>
                    <p className="mt-1 text-[11px] text-slate-300">
                      {offer.description}
                    </p>
                  </div>
                  <span className="pill border-emerald-500/40 bg-emerald-500/10 text-[10px] text-emerald-300">
                    Accepted
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <p>
                    Expert: <span className="text-slate-200">{offer.expert.name}</span>
                  </p>
                  {offer.business && (
                    <p>
                      For:{" "}
                      <Link
                        href={`/b/${offer.business.slug}`}
                        className="text-accent hover:underline"
                      >
                        {offer.business.name}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {openOffers.length === 0 && acceptedOffers.length === 0 && (
        <div className="glass-panel p-6 text-center text-xs text-slate-400">
          No expert offers yet.{" "}
          {user?.role === "EXPERT" ? (
            <span>Create one above to get started.</span>
          ) : (
            <span>
              <Link href="/auth" className="text-accent hover:underline">
                Sign in as an Expert
              </Link>{" "}
              to offer help.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
