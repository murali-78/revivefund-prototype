"use client";

import { useState } from "react";
import { registerAction } from "./actions";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const result = await registerAction(formData);
      if (result && "error" in result) {
        setError(result.error ?? "Registration failed");
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] text-slate-300">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-[11px] text-slate-300">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] text-slate-300">Role</label>
        <select
          name="role"
          className="w-full rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-accent"
        >
          <option value="BACKER">Backer</option>
          <option value="OWNER">Owner</option>
          <option value="EXPERT">Expert</option>
        </select>
      </div>
      {error && (
        <p className="text-[11px] text-red-400" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full border border-border bg-muted/70 px-4 py-2 text-xs font-medium text-slate-100 hover:border-accent hover:text-accent disabled:opacity-60"
      >
        {pending ? "Registering…" : "Register"}
      </button>
    </form>
  );
}
