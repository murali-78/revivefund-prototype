"use client";

import { useState, type FC } from "react";

type FundingModalProps = {
  businessName: string;
  defaultAmount: number;
  minRecommended: number;
  maxRecommended: number;
  onSubmit: (data: { amount: number; type: string; note: string }) => Promise<void>;
};

const fundingOptions = [
  { id: "DONATION", label: "Community Backing", desc: "Pure support, no return expected" },
  { id: "INVESTMENT", label: "Outcome Share", desc: "Share in recovery profits" },
  { id: "REVENUE_SHARE", label: "Impact-Linked Return", desc: "% of future revenue" },
  { id: "REWARD", label: "Impact Perks", desc: "Exclusive perks & recognition" },
];

export const FundingModal: FC<FundingModalProps> = ({
  businessName,
  defaultAmount,
  minRecommended,
  maxRecommended,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);
  const [type, setType] = useState("DONATION");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ amount, type, note });
      setOpen(false);
    } catch {
      setError("Something went sideways. This is a demo, but still — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
          <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Back this venture
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/95 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="border-b border-white/[0.06] px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">
                    Back {businessName}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Simulate an rSOL pledge — no real money involved.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-5 px-6 py-5">
              {/* Amount */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Pledge amount (rSOL)
                </label>
                <input
                  type="number"
                  min={50}
                  step={50}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold tabular-nums text-white outline-none transition-colors focus:border-emerald-500/60 focus:bg-white/[0.05] placeholder:text-slate-600"
                />
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Suggested: {minRecommended.toLocaleString()} – {maxRecommended.toLocaleString()} rSOL
                </p>
              </div>

              {/* Funding model */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Funding model
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fundingOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setType(option.id)}
                      className={`group flex flex-col rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                        type === option.id
                          ? "border-emerald-500/50 bg-emerald-500/[0.08] shadow-sm shadow-emerald-500/10"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className={`text-xs font-semibold ${type === option.id ? "text-emerald-300" : "text-slate-200"}`}>
                        {option.label}
                      </span>
                      <span className="mt-0.5 text-[10px] text-slate-500 leading-tight">
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs text-white outline-none transition-colors focus:border-emerald-500/60 focus:bg-white/[0.05] placeholder:text-slate-600"
                  placeholder="Why does this venture matter to you?"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-[11px] text-red-400">
                  {error}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] px-6 py-4">
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirm}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Simulating pledge…" : `Confirm ${amount.toLocaleString()} rSOL pledge`}
              </button>
              <p className="mt-2 text-center text-[10px] text-slate-600">
                Demo only · rSOL never leaves this browser tab
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
