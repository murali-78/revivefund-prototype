"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const result = await loginAction(formData);
      if (result && "error" in result) {
        setError(result.error ?? "Sign in failed");
      }
    } catch (err) {
      // Rethrow redirects so Next.js can handle them
      if (err && typeof err === "object" && "digest" in err) {
        const d = (err as { digest?: string }).digest;
        if (typeof d === "string" && d.startsWith("NEXT_REDIRECT")) throw err;
      }
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-3 p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Sign in
      </h2>
      <div>
        <label className="mb-1 block text-[11px] text-slate-300">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
          placeholder="backer@revivefund.demo"
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] text-slate-300">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
          placeholder="demo1234"
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-400" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-elevated hover:bg-emerald-400 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
