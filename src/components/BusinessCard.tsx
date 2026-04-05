import Link from "next/link";
import type { Business } from "@prisma/client";
import { ScoreBadge } from "./ScoreBadge";
import { ArrowUpRight, Zap, AlertTriangle, TrendingUp } from "lucide-react";

type BusinessWithDerived = Business & {
  urgency: number;
  recoveryProbability: number;
};

type Props = {
  business: BusinessWithDerived;
  highlightMode?: "featured" | "list";
};

function impactSnippet(story: string, maxLen = 90): string {
  const first = story.split(/[.!?]/)[0]?.trim() ?? story;
  if (first.length <= maxLen) return first;
  return first.slice(0, maxLen).trim().replace(/\s+\S*$/, "") + "…";
}

export function BusinessCard({ business, highlightMode = "list" }: Props) {
  const fundedPct = Math.round(
    (business.currentFunded / Math.max(business.fundingGoal, 1)) * 100,
  );

  const isEmergency = business.emergency;
  const isHighUrgency = business.urgency > 70;
  const impact = impactSnippet(business.story);

  return (
    <Link
      href={`/b/${business.slug}`}
      className={`glass-panel group relative flex flex-col gap-6 p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] overflow-hidden ${
        isHighUrgency ? "neural-pulse border-accent/20" : ""
      } ${
        highlightMode === "featured" ? "md:flex-row md:items-stretch md:gap-8 border-accent/30 bg-accent/[0.03]" : ""
      }`}
    >
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full blur-3xl group-hover:bg-accent/10 transition-colors pointer-events-none" />
      
      <div className="flex flex-1 flex-col gap-4 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill text-[10px] bg-white/10 uppercase tracking-widest font-black ring-1 ring-white/10">
                {business.category}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                {business.city}
              </span>
              {isEmergency && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[10px] text-red-500 font-black uppercase tracking-widest animate-pulse rounded-full">
                  <AlertTriangle className="w-3 h-3" />
                  CRITICAL
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
             <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
               <Zap className="w-3 h-3 text-accent" /> Urgency
             </div>
             <div className={`text-2xl font-black ${isHighUrgency ? 'text-accent' : 'text-white'}`}>
               {business.urgency}<span className="text-xs opacity-50 ml-1">/100</span>
             </div>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-white group-hover:text-accent transition-colors flex items-center gap-2">
            {business.name}
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 italic font-medium">
            &ldquo;{business.shortDescription}&rdquo;
          </p>
        </div>

        {/* Progress System */}
        <div className="space-y-3 mt-2">
          <div className="flex items-end justify-between text-[11px] font-bold">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground uppercase tracking-widest">Growth Committed</span>
              <span className="text-lg text-white tabular-nums">{formatCurrency(business.currentFunded)} <span className="text-xs text-accent">rSOL</span></span>
            </div>
            <div className="flex flex-col items-end gap-1">
               <span className="text-muted-foreground uppercase tracking-widest">Goal</span>
               <span className="text-xs text-white/70 tabular-nums">{formatCurrency(business.fundingGoal)} rSOL</span>
            </div>
          </div>
          
          <div className="relative h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <div 
               className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(162,84,56,0.5)] ${fundedPct >= 100 ? 'bg-gradient-to-r from-accent to-blue-400' : 'bg-accent'}`}
               style={{ width: `${Math.min(100, fundedPct)}%` }}
            />
          </div>
          <div className="flex justify-between items-baseline">
            <p className="text-[10px] text-muted-foreground/80 font-medium">
              Impact Momentum: <span className="text-white font-bold">{fundedPct}%</span>
            </p>
            <div className="flex items-center gap-1 text-[10px] text-accent font-black uppercase tracking-widest">
              <TrendingUp className="w-3 h-3 text-accent" /> Live Tracking
            </div>
          </div>
        </div>
      </div>

      {/* Side Metrics for Desktop Featured */}
      <div className={`flex flex-col justify-between gap-4 border-l border-white/5 pl-6 ${highlightMode === 'featured' ? 'hidden md:flex' : 'hidden md:grid md:grid-cols-2 lg:grid-cols-1'}`}>
        <div className="space-y-4">
           <div className="space-y-1">
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Recovery Prob.</p>
             <p className="text-2xl font-black text-white">{Math.round(business.recoveryProbability * 100)}%</p>
           </div>
           <div className="space-y-1">
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Risk Assessment</p>
             <p className={`text-lg font-black ${business.riskScore > 65 ? 'text-red-500' : 'text-white/80'}`}>{business.riskScore}/100</p>
           </div>
        </div>
        
        <button className="w-full py-3 bg-white/5 border border-white/10 hover:bg-accent hover:border-accent hover:text-background rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
          Explore Strategy
        </button>
      </div>

      {/* Mobile / List Metrics */}
      {highlightMode === 'list' && (
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 md:hidden lg:grid">
           <div className="flex flex-col gap-1">
             <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Recovery</span>
             <span className="text-sm font-black text-white">{Math.round(business.recoveryProbability * 100)}%</span>
           </div>
           <div className="flex flex-col items-end gap-1">
             <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Risk Score</span>
             <span className="text-sm font-black text-white">{business.riskScore}</span>
           </div>
        </div>
      )}
    </Link>
  );
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(v);
}

