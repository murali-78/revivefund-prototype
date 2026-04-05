import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/auth/actions";
import "./globals.css";
import { Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "ReviveFund — AI-Powered Revival Platform for Green Health & Climate Startups",
  description:
    "ReviveFund is an AI-powered demo platform for backing green health and climate startups: impact credits, community support, and expert help for ventures at the edge.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-foreground selection:bg-accent/30 selection:text-accent font-sans selection:font-medium">
        <div className="page-shell">
          {/* Top nav */}
          <header className="flex items-center justify-between gap-4 py-4 relative z-50">
            <Link href="/" className="flex items-center gap-4 group transition-all">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-blue-500 text-lg font-black text-slate-900 shadow-lg shadow-accent/20 group-hover:scale-110 group-active:scale-95 transition-all">
                rƒ
              </div>
              <div className="flex flex-col leading-tight pt-1">
                <span className="text-lg font-black tracking-tighter text-white group-hover:text-accent transition-colors">
                  Revive<span className="text-accent underline decoration-accent/30 underline-offset-4">Fund</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-white/50 transition-colors">
                  Green Health & Climate
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground sm:flex bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
              <Link href="/map" className="hover:text-accent transition-colors">
                Map
              </Link>
              <Link href="/adopt" className="hover:text-accent transition-colors">
                Adopt
              </Link>
              <Link href="/community" className="hover:text-accent transition-colors">
                Community
              </Link>
              <Link href="/success" className="hover:text-accent transition-colors">
                Success
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 bg-white/5 p-1 rounded-2xl border border-white/5">
                  <Link
                    href="/me"
                    className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Profile
                  </Link>
                  <form action={logoutAction} className="inline">
                    <button
                      type="submit"
                      className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-400 transition-all"
                    >
                      Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="rounded-2xl bg-white/5 border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 hover:border-accent shadow-sm transition-all active:scale-95 flex items-center gap-2 group"
                >
                  <Zap className="w-4 h-4 text-accent group-hover:animate-pulse" /> Sign In
                </Link>
              )}
            </div>
          </header>

          {/* Demo banner */}
          <div className="glass-panel flex items-center justify-between gap-4 px-6 py-4 border-l-4 border-l-accent/50 group">
            <div className="flex items-center gap-4 text-xs text-slate-200">
              <div className="bg-accent/10 p-2 rounded-xl text-accent border border-accent/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-black tracking-widest text-accent/80 block">Sandboxed Environment</p>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed group-hover:text-white transition-colors cursor-default">
                  rSOL is a demo impact credit for simulating community backing. No real assets are required.
                </p>
              </div>
            </div>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:inline group-hover:text-accent transition-colors">
              Node Active
            </span>
          </div>

          <main className="flex-1 min-h-[70vh] py-8">{children}</main>

          <footer className="mt-12 py-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col items-center md:items-start gap-2">
                <p className="text-sm font-black text-white">ReviveFund</p>
                <p className="text-[11px] text-muted-foreground max-w-sm text-center md:text-left leading-relaxed">
                  The world&apos;s first AI-powered neural infrastructure for green health & climate venture restoration.
                </p>
              </div>
              <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
                <p>© 2026 REVIVEFUND RESEARCH LABS</p>
                <p className="hidden sm:inline italic">BUILT FOR DIALOGUE</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
