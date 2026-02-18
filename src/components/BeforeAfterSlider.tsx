"use client";

import Image from "next/image";
import { useState, type FC } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
};

export const BeforeAfterSlider: FC<Props> = ({ beforeSrc, afterSrc, alt }) => {
  const [position, setPosition] = useState(52);

  return (
    <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-border/70 bg-slate-900/60">
      <div className="absolute inset-0">
        <Image src={afterSrc} alt={alt} fill className="object-cover opacity-75" />
      </div>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image src={beforeSrc} alt={alt} fill className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-[10px] font-semibold text-slate-100 shadow-soft-elevated">
          Drag
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute bottom-3 left-1/2 h-1 w-40 -translate-x-1/2 cursor-pointer accent-accent"
      />
      <div className="pointer-events-none absolute left-4 top-3 rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-slate-100">
        Before
      </div>
      <div className="pointer-events-none absolute right-4 top-3 rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-slate-100">
        After
      </div>
    </div>
  );
};

