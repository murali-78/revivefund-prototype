"use client";

import { useState } from "react";
import { createOfferAction } from "./actions";

export function CreateOfferForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createOfferAction(formData);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      alert("Failed to create offer");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-elevated hover:bg-emerald-400"
      >
        Create expert offer
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel flex flex-col gap-3 p-4 text-xs"
    >
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        New expert offer
      </h3>
      <div>
        <label className="mb-1 block text-[11px] text-slate-300">Title</label>
        <input
          type="text"
          name="title"
          required
          className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
          placeholder="e.g., 30-day impact sprint"
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] text-slate-300">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          className="w-full resize-none rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
          placeholder="What help can you provide?"
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] text-slate-300">
          Reward (rSOL)
        </label>
        <input
          type="number"
          name="rewardRsol"
          required
          min={100}
          step={100}
          defaultValue={1000}
          className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-elevated hover:bg-emerald-400 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create offer"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-border bg-muted/70 px-4 py-2 text-xs font-medium text-slate-100 hover:border-accent hover:text-accent"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
