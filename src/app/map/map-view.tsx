"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Business } from "@prisma/client";
import L from "leaflet";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

type BusinessWithUrgency = Business & { urgency: number };

type Props = {
  businesses: BusinessWithUrgency[];
  categories: string[];
  initialFilter?: string;
  initialCategory?: string;
};

export function MapView({
  businesses,
  categories,
  initialFilter = "all",
  initialCategory = "all",
}: Props) {
  const [filter, setFilter] = useState<string>(initialFilter);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const filtered =
    selectedCategory === "all"
      ? businesses
      : businesses.filter((b) => b.category === selectedCategory);

  const emergencyOnly = filter === "emergency";
  const displayBusinesses = emergencyOnly
    ? filtered.filter((b) => b.emergency)
    : filtered;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-[11px] text-slate-400">Filter:</label>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`pill text-[11px] ${
              filter === "all"
                ? "border-accent bg-accent-soft/40 text-accent"
                : "border-border/70 bg-muted-soft/80"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter("emergency")}
            className={`pill text-[11px] ${
              filter === "emergency"
                ? "border-danger bg-danger/20 text-danger"
                : "border-border/70 bg-muted-soft/80"
            }`}
          >
            Emergency only
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[11px] text-slate-400">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-border bg-slate-900/60 px-2 py-1 text-[11px] text-slate-50 outline-none focus:border-accent"
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="glass-panel relative h-[600px] w-full overflow-hidden rounded-2xl border border-border/70">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {displayBusinesses.map((business) => (
            <Marker key={business.id} position={[business.latitude, business.longitude]}>
              <Popup>
                <div className="min-w-[200px] text-xs">
                  <Link
                    href={`/b/${business.slug}`}
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    {business.name}
                  </Link>
                  <p className="mt-1 text-slate-600">{business.city}</p>
                  <p className="mt-1 text-slate-500">{business.category}</p>
                  {business.emergency && (
                    <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[10px] text-red-800">
                      Emergency
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
