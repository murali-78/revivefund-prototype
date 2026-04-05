import { prisma } from "@/lib/prisma";
import { analyzeBusiness } from "@/lib/health";
import { BusinessCard } from "@/components/BusinessCard";
import { Zap, Activity, Globe, Users } from "lucide-react";

export default async function Home() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "asc" },
  });

  const enriched = businesses
    .map((b) => {
      const analysis = analyzeBusiness(b);
      return {
        ...b,
        urgency: analysis.urgency,
        recoveryProbability: analysis.recoveryProbability,
        _health: analysis,
      };
    })
    .sort((a, b) => b.urgency - a.urgency);

  const featured = enriched[0];
  const rest = enriched.slice(1);

  // Stats for the ticker
  const totalFunded = businesses.reduce((acc, b) => acc + b.currentFunded, 0);
  const totalVentures = businesses.length;

  return (
    <div className="flex flex-col gap-12 animate-fade-in relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 px-8 overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-accent animate-pulse">
              <Zap className="w-4 h-4" /> AI-Driven Impact Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                Climate Recovery
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Identify at-risk climate and green health ventures, predict recovery potential, and enable transparent community backing.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               <button className="px-8 py-4 bg-accent text-background rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg shadow-accent/20">
                 Explore Ventures
               </button>
               <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                 How it works
               </button>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[2rem] border-white/10 bg-white/[0.02] flex flex-col gap-8 group">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent/80 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Ecosystem Vitals
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total Committed</p>
                <p className="text-2xl font-black text-white tabular-nums">{new Intl.NumberFormat().format(totalFunded)} <span className="text-xs text-accent">rSOL</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Ventures</p>
                <p className="text-2xl font-black text-white tabular-nums">{totalVentures}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Live Nodes</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
                  <p className="text-sm font-black text-white uppercase italic tracking-tighter">Connected</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Global Reach</p>
                <p className="text-sm font-black text-white uppercase italic tracking-tighter">14 Countries</p>
              </div>
            </div>
            
            <div className="mt-4 pt-6 border-t border-white/5">
               <div className="flex items-center gap-4 text-xs text-muted-foreground">
                 <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                       {String.fromCharCode(64 + i)}
                     </div>
                   ))}
                 </div>
                 <p className="font-bold underline decoration-accent/30 underline-offset-4 cursor-help hover:text-white transition-colors">
                   +1,284 contributors active now
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insight Section */}
      {featured && (
        <section className="space-y-6">
          <div className="flex items-end justify-between px-4">
            <div className="space-y-1">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Top Priority</h2>
              <p className="text-xl font-black text-white">Emergency Intervention Required</p>
            </div>
            <p className="text-xs text-muted-foreground hidden md:block">Real-time AI urgency detection enabled</p>
          </div>
          <div className="animate-slide-up">
            <BusinessCard business={featured} highlightMode="featured" />
          </div>
        </section>
      )}

      {/* Main Grid */}
      <section className="space-y-8 mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 border-l-2 border-accent/20 pl-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-white">Venture Directory</h2>
            <p className="text-sm text-muted-foreground max-w-md italic">
              AI-ranked by urgency, financial health, and community momentum.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:bg-white/10 transition-all">
                All Regions
             </div>
             <div className="px-4 py-2 rounded-xl bg-accent text-background text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/10 cursor-pointer hover:scale-105 transition-all">
                High Impact
             </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {rest.map((b, i) => (
            <div key={b.id} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <BusinessCard business={b} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section className="mt-12 p-8 rounded-[2rem] bg-accent/[0.02] border border-accent/5 flex flex-col items-center text-center space-y-6">
         <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
            <Globe className="w-6 h-6" />
         </div>
         <div className="space-y-2">
           <h3 className="text-xl font-black text-white tracking-tight">The Neural Network of Change</h3>
           <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
             Our rules-based AI monitors hundreds of data points per venture, ensuring that your rSOL contribution goes where it will have the maximum environmental and health impact.
           </p>
         </div>
         <div className="flex gap-4">
            <div className="flex flex-col items-center">
               <span className="text-lg font-black text-white">4.8x</span>
               <span className="text-[10px] text-muted-foreground font-bold uppercase">Efficiency Lift</span>
            </div>
            <div className="w-px h-8 bg-white/10 mx-4" />
            <div className="flex flex-col items-center">
               <span className="text-lg font-black text-white">82%</span>
               <span className="text-[10px] text-muted-foreground font-bold uppercase">Recovery Rate</span>
            </div>
            <div className="w-px h-8 bg-white/10 mx-4" />
            <div className="flex flex-col items-center">
               <span className="text-lg font-black text-white">24/7</span>
               <span className="text-[10px] text-muted-foreground font-bold uppercase">Node Monitoring</span>
            </div>
         </div>
      </section>
    </div>
  );
}
