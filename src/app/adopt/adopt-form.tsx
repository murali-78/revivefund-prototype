"use client";

import { useState } from "react";
import { adoptBusinessAction } from "./actions";

type Props = {
  businessId: string;
  businessSlug: string;
};

export function AdoptBusinessForm({ businessId, businessSlug }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleAdopt() {
    setLoading(true);
    try {
      await adoptBusinessAction(businessId);
      window.location.href = `/b/${businessSlug}`;
    } catch (error) {
      alert("Failed to adopt venture. Make sure you're signed in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAdopt}
      disabled={loading}
      className="w-full rounded-full border border-accent/60 bg-accent-soft/20 px-3 py-1.5 text-[11px] font-medium text-accent hover:bg-accent-soft/30 disabled:opacity-60"
    >
      {loading ? "Adopting..." : "Adopt this venture"}
    </button>
  );
}
