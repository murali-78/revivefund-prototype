import { prisma } from "@/lib/prisma";
import { analyzeBusiness } from "@/lib/health";
import { MapView } from "./map-view";

export default async function MapPage() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "asc" },
  });

  const enriched = businesses.map((b) => {
    const analysis = analyzeBusiness(b);
    return {
      ...b,
      urgency: analysis.urgency,
    };
  });

  const categories = Array.from(new Set(enriched.map((b) => b.category)));

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill mb-2 border-accent/40 bg-accent-soft/20 text-[11px] text-accent">
              Geographic view
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Green health & climate ventures on the map
            </h1>
            <p className="max-w-xl text-xs text-slate-300">
              See where ventures are located and filter by category or emergency status.
            </p>
          </div>
        </div>
      </section>

      <MapView businesses={enriched} categories={categories} />
    </div>
  );
}
