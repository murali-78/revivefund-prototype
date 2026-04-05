import Image from "next/image";

const captions = [
  "Production Facility",
  "Core Technology",
  "The Team",
  "Community Impact",
];

export function ImageGallery({ images }: { images: string[] }) {
  if (!images || images.length < 2) return null;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          On the Ground
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.slice(0, 4).map((src, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-950 shadow-soft-elevated"
          >
            <Image
              src={src}
              alt={captions[i] ?? `Photo ${i + 1}`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* caption chip */}
            <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-sm border border-white/[0.08]">
              {captions[i] ?? `Photo ${i + 1}`}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
