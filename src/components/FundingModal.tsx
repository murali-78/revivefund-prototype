"use client";

import { useState, type FC } from "react";

type FundingModalProps = {
  businessName: string;
  defaultAmount: number;
  minRecommended: number;
  maxRecommended: number;
  onSubmit: (data: { amount: number; type: string; note: string }) => Promise<void>;
};

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
    } catch (e) {
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
        className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-elevated hover:bg-emerald-400"
      >
        Back this turnaround
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="glass-panel relative w-full max-w-md p-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-xs text-slate-500 hover:text-slate-200"
            >
              Close
            </button>

            <h2 className="mb-1 text-sm font-semibold text-slate-50">
              Support {businessName}
            </h2>
            <p className="mb-4 text-xs text-slate-300">
              Commit rSOL into this demo plan. We simulate impact instantly — no real money
              or wallets involved.
            </p>

            <div className="mb-3">
              <label className="mb-1 block text-[11px] text-slate-300">
                Amount (rSOL)
              </label>
              <input
                type="number"
                min={50}
                step={50}
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
                className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Suggested range for you: {minRecommended.toLocaleString()}–{" "}
                {maxRecommended.toLocaleString()} rSOL.
              </p>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-[11px] text-slate-300">
                Funding model
              </label>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {[
                  { id: "DONATION", label: "Donation" },
                  { id: "INVESTMENT", label: "Investment (profit share)" },
                  { id: "REVENUE_SHARE", label: "Revenue-based return" },
                  { id: "REWARD", label: "Rewards" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setType(option.id)}
                    className={`rounded-lg border px-2 py-1.5 text-left ${
                      type === option.id
                        ? "border-accent bg-accent-soft/40 text-accent"
                        : "border-border bg-slate-950/40 text-slate-200 hover:border-accent/60"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-[11px] text-slate-300">
                Optional note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
                placeholder="Why does this turnaround matter to you?"
              />
            </div>

            {error && <p className="mb-2 text-[11px] text-danger">{error}</p>}

            <button
              type="button"
              disabled={loading}
              onClick={handleConfirm}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-elevated hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? "Simulating pledge…" : "Confirm pledge in rSOL"}
            </button>

            <p className="mt-2 text-[10px] text-slate-500">
              Demo only. rSOL never leaves this browser tab.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

