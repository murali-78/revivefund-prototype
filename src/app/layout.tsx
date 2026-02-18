import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviveFund — Turnarounds in public",
  description:
    "ReviveFund is a presentation-level demo for backing real-world turnarounds: donations, revenue-based support, and expert help for struggling businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <div className="page-shell">
          {/* Top nav */}
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-slate-900 shadow-soft-elevated">
                rƒ
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-wide text-slate-100">
                  ReviveFund
                </span>
                <span className="text-xs text-slate-400">
                  Turnarounds in public
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-4 text-xs font-medium text-slate-300 sm:flex">
              <Link href="/map" className="hover:text-accent">
                Map
              </Link>
              <Link href="/adopt" className="hover:text-accent">
                Adopt a business
              </Link>
              <Link href="/community" className="hover:text-accent">
                Community
              </Link>
              <Link href="/success" className="hover:text-accent">
                Success stories
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/auth"
                className="rounded-full border border-border bg-muted/70 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-accent hover:text-accent"
              >
                Sign in
              </Link>
              <Link
                href="/me"
                className="hidden rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-elevated hover:bg-emerald-400 sm:inline-flex"
              >
                Demo profile
              </Link>
            </div>
          </header>

          {/* Demo banner */}
          <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <span className="pill border-danger/40 bg-danger/10 text-danger">
                Demo Mode
              </span>
              <p className="max-w-3xl text-xs text-slate-300">
                ReviveFund runs entirely in demo mode.{" "}
                <span className="font-semibold text-slate-100">
                  rSOL is a fake in-app token — not real Solana, no real money,
                  no wallets, no crypto.
                </span>
              </p>
            </div>
            <span className="hidden text-[10px] text-slate-400 sm:inline">
              Safe to explore. Nothing you do here touches real businesses.
            </span>
          </div>

          <main className="flex-1">{children}</main>

          <footer className="mt-4 flex items-center justify-between border-t border-border/60 pt-4 text-[11px] text-slate-500">
            <p>ReviveFund · Demo prototype for turnarounds and funding models.</p>
            <p className="hidden sm:inline">
              Built for product conversations — not for real capital allocation.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
