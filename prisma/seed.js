const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient({});

async function main() {
  // Reset data for repeatable demos
  await prisma.contribution.deleteMany();
  await prisma.updateLog.deleteMany();
  await prisma.adoption.deleteMany();
  await prisma.expertOffer.deleteMany();
  await prisma.business.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("demo1234", 10);

  const backer = await prisma.user.create({
    data: {
      email: "backer@revivefund.demo",
      name: "Jordan Vega",
      role: "BACKER",
      passwordHash,
    },
  });

  const owner = await prisma.user.create({
    data: {
      email: "owner@revivefund.demo",
      name: "Morgan Lee",
      role: "OWNER",
      passwordHash,
    },
  });

  const expert = await prisma.user.create({
    data: {
      email: "expert@revivefund.demo",
      name: "Riley Chen",
      role: "EXPERT",
      passwordHash,
    },
  });

  const businessesData = [
    {
      name: "Third Wave Coffee Lab",
      slug: "third-wave-coffee-lab",
      category: "Cafe",
      city: "Austin",
      country: "USA",
      latitude: 30.2672,
      longitude: -97.7431,
      shortDescription:
        "Neighborhood espresso bar that overbuilt during the 2022 boom. Now fighting to keep the doors open.",
      story:
        "Third Wave Coffee Lab built a beautiful bar and roasting program right before foot traffic dipped. Rent escalations and equipment leases pushed the business into a tight cash position. The team has loyal regulars, a strong brand, and realistic plans to right-size operations—if they can bridge the next 6 months.",
      fundingGoal: 28000,
      currentFunded: 9200,
      emergency: true,
      healthScore: 63,
      riskScore: 58,
      revivalScore: 68,
      recoveryProbability: 0.72,
      minRecommendedPledge: 250,
      maxRecommendedPledge: 5000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 31000, expenses: 29500 },
          { month: "2025-10", revenue: 29800, expenses: 30200 },
          { month: "2025-11", revenue: 28700, expenses: 30100 },
          { month: "2025-12", revenue: 33200, expenses: 31800 },
          { month: "2026-01", revenue: 27400, expenses: 30500 },
          { month: "2026-02", revenue: 26100, expenses: 29800 },
        ],
      },
      expensesMonthly: 30000,
      fundUsagePlan: {
        items: [
          { label: "Back rent + landlord reset", percent: 35 },
          { label: "Equipment leases renegotiation buffer", percent: 20 },
          { label: "Working capital for beans & milk", percent: 25 },
          { label: "Local campaigns + events", percent: 20 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Campaign launches; rent plan locked." },
          { label: "Day 7", status: "planned", summary: "Landlord conversation + lease reset." },
          { label: "Day 30", status: "planned", summary: "Menu simplification and cost controls live." },
          { label: "Day 60", status: "planned", summary: "Break-even weeks tracked and reported." },
        ],
      },
      beforeImageUrl: "/demo/coffee-before.jpg",
      afterImageUrl: "/demo/coffee-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Harborline Diner",
      slug: "harborline-diner",
      category: "Restaurant",
      city: "Boston",
      country: "USA",
      latitude: 42.3601,
      longitude: -71.0589,
      shortDescription:
        "Waterfront diner hit by two consecutive storm closures. Insurance delays left cash flow exposed.",
      story:
        "Harborline Diner is a family-run spot serving dockworkers and office crowds. Two severe storms forced multi-week closures while insurance payouts crawled. The kitchen is rebuilt, staff is ready, and they have a clear path back—if they can bridge payroll and inventory for the next quarter.",
      fundingGoal: 45000,
      currentFunded: 18000,
      emergency: true,
      healthScore: 57,
      riskScore: 64,
      revivalScore: 71,
      recoveryProbability: 0.69,
      minRecommendedPledge: 500,
      maxRecommendedPledge: 8000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 54000, expenses: 50500 },
          { month: "2025-10", revenue: 52800, expenses: 51200 },
          { month: "2025-11", revenue: 15000, expenses: 41000 },
          { month: "2025-12", revenue: 8000, expenses: 36000 },
          { month: "2026-01", revenue: 39000, expenses: 45500 },
          { month: "2026-02", revenue: 40200, expenses: 44700 },
        ],
      },
      expensesMonthly: 44000,
      fundUsagePlan: {
        items: [
          { label: "Payroll catch-up", percent: 40 },
          { label: "Inventory restock", percent: 30 },
          { label: "Emergency cash buffer", percent: 20 },
          { label: "Marketing to relaunch", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "completed", summary: "Kitchen re-opened for limited hours." },
          { label: "Day 7", status: "planned", summary: "Full menu back online." },
          { label: "Day 30", status: "planned", summary: "Weekend brunch relaunch." },
          { label: "Day 60", status: "planned", summary: "Back to pre-storm revenue run-rate." },
        ],
      },
      beforeImageUrl: "/demo/diner-before.jpg",
      afterImageUrl: "/demo/diner-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Lumen Analytics",
      slug: "lumen-analytics",
      category: "B2B SaaS",
      city: "New York",
      country: "USA",
      latitude: 40.7128,
      longitude: -74.006,
      shortDescription:
        "Product-market fit with mid-market ops teams, but stuck between funding rounds with a shrinking runway.",
      story:
        "Lumen Analytics helps operations teams see live margin erosion in their supply chains. The product is sticky and churn is low, but their bridge round fell apart in a tough market. They are cutting burn, focusing on profitable segments, and using ReviveFund to extend runway without a down round.",
      fundingGoal: 120000,
      currentFunded: 36000,
      emergency: false,
      healthScore: 71,
      riskScore: 52,
      revivalScore: 79,
      recoveryProbability: 0.81,
      minRecommendedPledge: 1000,
      maxRecommendedPledge: 20000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 68000, expenses: 132000 },
          { month: "2025-10", revenue: 71000, expenses: 129000 },
          { month: "2025-11", revenue: 74200, expenses: 128000 },
          { month: "2025-12", revenue: 78000, expenses: 126000 },
          { month: "2026-01", revenue: 80200, expenses: 119000 },
          { month: "2026-02", revenue: 82100, expenses: 112000 },
        ],
      },
      expensesMonthly: 118000,
      fundUsagePlan: {
        items: [
          { label: "Engineering payroll during pivot", percent: 45 },
          { label: "Contract reductions & buyouts", percent: 25 },
          { label: "Customer success & retention", percent: 20 },
          { label: "Runway buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "completed", summary: "Burn-reduction plan announced to team." },
          { label: "Day 7", status: "planned", summary: "Legacy features sunset plan live." },
          { label: "Day 30", status: "planned", summary: "First profitable cohort identified." },
          { label: "Day 60", status: "planned", summary: "Runway extended to 18+ months." },
        ],
      },
      beforeImageUrl: "/demo/saas-before.jpg",
      afterImageUrl: "/demo/saas-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "North Loop Climbing",
      slug: "north-loop-climbing",
      category: "Fitness",
      city: "Minneapolis",
      country: "USA",
      latitude: 44.9867,
      longitude: -93.2581,
      shortDescription:
        "Indie climbing gym squeezed by overspending on buildout and a slower-than-modeled ramp.",
      story:
        "North Loop Climbing opened into a crowded field with beautiful walls and a passionate community. Early ramp lagged the model, debt service kicked in, and now they’re racing to stabilize before lenders get nervous. The plan is crisp: restructure debt, grow membership, and add revenue from coaching and comps.",
      fundingGoal: 90000,
      currentFunded: 21500,
      emergency: false,
      healthScore: 69,
      riskScore: 61,
      revivalScore: 77,
      recoveryProbability: 0.76,
      minRecommendedPledge: 750,
      maxRecommendedPledge: 15000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 42000, expenses: 61000 },
          { month: "2025-10", revenue: 43700, expenses: 61500 },
          { month: "2025-11", revenue: 45600, expenses: 61200 },
          { month: "2025-12", revenue: 49800, expenses: 62400 },
          { month: "2026-01", revenue: 51200, expenses: 61900 },
          { month: "2026-02", revenue: 52700, expenses: 61600 },
        ],
      },
      expensesMonthly: 62000,
      fundUsagePlan: {
        items: [
          { label: "Debt service stabilization", percent: 40 },
          { label: "Route-setting + coaching talent", percent: 35 },
          { label: "Competition and events", percent: 15 },
          { label: "Emergency buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Membership pricing reset." },
          { label: "Day 7", status: "planned", summary: "Debt restructure proposal sent." },
          { label: "Day 30", status: "planned", summary: "First competition hosted." },
          { label: "Day 60", status: "planned", summary: "Positive cash flow month." },
        ],
      },
      beforeImageUrl: "/demo/gym-before.jpg",
      afterImageUrl: "/demo/gym-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "ParcelPeak Local Delivery",
      slug: "parcel-peak-local-delivery",
      category: "Logistics",
      city: "Denver",
      country: "USA",
      latitude: 39.7392,
      longitude: -104.9903,
      shortDescription:
        "Last-mile delivery cooperative squeezed by fleet costs and enterprise clients stretching payment terms.",
      story:
        "ParcelPeak runs an owner-operator delivery network for regional retailers. Fuel spikes and delayed payouts from two anchors created a cash crunch. They’re renegotiating contracts, shifting to higher-margin routes, and using ReviveFund to avoid laying off drivers during the transition.",
      fundingGoal: 60000,
      currentFunded: 14000,
      emergency: true,
      healthScore: 55,
      riskScore: 67,
      revivalScore: 70,
      recoveryProbability: 0.66,
      minRecommendedPledge: 500,
      maxRecommendedPledge: 10000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 88000, expenses: 91500 },
          { month: "2025-10", revenue: 90200, expenses: 92800 },
          { month: "2025-11", revenue: 93400, expenses: 95200 },
          { month: "2025-12", revenue: 97200, expenses: 98000 },
          { month: "2026-01", revenue: 94500, expenses: 97100 },
          { month: "2026-02", revenue: 95800, expenses: 96200 },
        ],
      },
      expensesMonthly: 96000,
      fundUsagePlan: {
        items: [
          { label: "Fuel hedge + fleet maintenance", percent: 45 },
          { label: "Driver guarantees during slow weeks", percent: 30 },
          { label: "Contract renegotiation runway", percent: 15 },
          { label: "Ops tooling", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "New route structure drafted." },
          { label: "Day 7", status: "planned", summary: "Client contract reviews complete." },
          { label: "Day 30", status: "planned", summary: "High-margin route mix live." },
          { label: "Day 60", status: "planned", summary: "On-time payouts and stable cash buffer." },
        ],
      },
      beforeImageUrl: "/demo/logistics-before.jpg",
      afterImageUrl: "/demo/logistics-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Signal Studio Creative",
      slug: "signal-studio-creative",
      category: "Agency",
      city: "Los Angeles",
      country: "USA",
      latitude: 34.0522,
      longitude: -118.2437,
      shortDescription:
        "Boutique brand studio that rode the DTC wave, then saw retainers evaporate. Lean team, strong book, thin cash.",
      story:
        "Signal Studio used to have a waitlist of DTC brands. When the market tightened, retainers disappeared. The founders cut their own salaries first and pivoted to B2B brand systems. The pipeline is rebuilding but they need short-term oxygen to keep their core team intact.",
      fundingGoal: 35000,
      currentFunded: 11000,
      emergency: false,
      healthScore: 62,
      riskScore: 59,
      revivalScore: 74,
      recoveryProbability: 0.74,
      minRecommendedPledge: 250,
      maxRecommendedPledge: 6000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 52000, expenses: 54500 },
          { month: "2025-10", revenue: 49800, expenses: 53200 },
          { month: "2025-11", revenue: 47400, expenses: 52500 },
          { month: "2025-12", revenue: 46200, expenses: 51400 },
          { month: "2026-01", revenue: 48900, expenses: 50600 },
          { month: "2026-02", revenue: 50100, expenses: 49700 },
        ],
      },
      expensesMonthly: 50000,
      fundUsagePlan: {
        items: [
          { label: "Core team retention", percent: 50 },
          { label: "Pipeline-building outbound", percent: 25 },
          { label: "Specialist collaborators", percent: 15 },
          { label: "Cash buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Retainer restructuring calls." },
          { label: "Day 7", status: "planned", summary: "New B2B positioning live." },
          { label: "Day 30", status: "planned", summary: "Three anchor retainers signed." },
          { label: "Day 60", status: "planned", summary: "Back to predictable monthly revenue." },
        ],
      },
      beforeImageUrl: "/demo/agency-before.jpg",
      afterImageUrl: "/demo/agency-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Quiet Hours Podcast Network",
      slug: "quiet-hours-podcast-network",
      category: "Media",
      city: "Portland",
      country: "USA",
      latitude: 45.5152,
      longitude: -122.6784,
      shortDescription:
        "Highly rated niche podcasts with loyal listeners, but a brutal ad market and delayed sponsor payments.",
      story:
        "Quiet Hours produces slow, thoughtful shows in a world that optimizes for hot takes. Their downloads are steady, their listeners are engaged, but ad budgets vanished. They’re shifting to memberships and small brand partnerships, and using ReviveFund to avoid breaking shows mid-season.",
      fundingGoal: 42000,
      currentFunded: 9500,
      emergency: false,
      healthScore: 59,
      riskScore: 63,
      revivalScore: 72,
      recoveryProbability: 0.7,
      minRecommendedPledge: 300,
      maxRecommendedPledge: 7000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 26000, expenses: 32500 },
          { month: "2025-10", revenue: 24500, expenses: 31800 },
          { month: "2025-11", revenue: 23100, expenses: 30900 },
          { month: "2025-12", revenue: 24800, expenses: 30500 },
          { month: "2026-01", revenue: 25500, expenses: 29800 },
          { month: "2026-02", revenue: 26200, expenses: 29200 },
        ],
      },
      expensesMonthly: 30000,
      fundUsagePlan: {
        items: [
          { label: "Host + producer retainers", percent: 55 },
          { label: "Listener membership tooling", percent: 25 },
          { label: "Season launch campaigns", percent: 15 },
          { label: "Emergency buffer", percent: 5 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Membership tier launch." },
          { label: "Day 7", status: "planned", summary: "Sponsor pipeline rebuild." },
          { label: "Day 30", status: "planned", summary: "First profitable show season." },
          { label: "Day 60", status: "planned", summary: "Network-level breakeven." },
        ],
      },
      beforeImageUrl: "/demo/media-before.jpg",
      afterImageUrl: "/demo/media-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "MakerStreet Hardware",
      slug: "maker-street-hardware",
      category: "Retail",
      city: "Chicago",
      country: "USA",
      latitude: 41.8781,
      longitude: -87.6298,
      shortDescription:
        "Legacy neighborhood hardware store mid-transition to modern POS and e‑commerce. Inventory is real, cash is tight.",
      story:
        "MakerStreet Hardware has been on the same corner for 27 years. The new generation is taking over, upgrading systems, and learning how to compete with big-box stores. The bet is hyper-local service and workshops; ReviveFund backers are helping them modernize without losing the soul of the shop.",
      fundingGoal: 50000,
      currentFunded: 21000,
      emergency: false,
      healthScore: 66,
      riskScore: 54,
      revivalScore: 80,
      recoveryProbability: 0.83,
      minRecommendedPledge: 400,
      maxRecommendedPledge: 9000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 73000, expenses: 76200 },
          { month: "2025-10", revenue: 74800, expenses: 75900 },
          { month: "2025-11", revenue: 71500, expenses: 75100 },
          { month: "2025-12", revenue: 78200, expenses: 77600 },
          { month: "2026-01", revenue: 69900, expenses: 74200 },
          { month: "2026-02", revenue: 70700, expenses: 73400 },
        ],
      },
      expensesMonthly: 74000,
      fundUsagePlan: {
        items: [
          { label: "Inventory restack", percent: 35 },
          { label: "POS + e‑commerce rollout", percent: 35 },
          { label: "Workshops and community events", percent: 20 },
          { label: "Cash buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "POS migration scheduled." },
          { label: "Day 7", status: "planned", summary: "E‑commerce catalog live." },
          { label: "Day 30", status: "planned", summary: "First DIY workshop series." },
          { label: "Day 60", status: "planned", summary: "Inventory turns improve by 20%." },
        ],
      },
      beforeImageUrl: "/demo/retail-before.jpg",
      afterImageUrl: "/demo/retail-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Greenline Bikes",
      slug: "greenline-bikes",
      category: "Retail / Services",
      city: "Seattle",
      country: "USA",
      latitude: 47.6062,
      longitude: -122.3321,
      shortDescription:
        "Urban bike shop that overbuilt inventory going into a rainy year. Service demand is strong, cash cycle is not.",
      story:
        "Greenline Bikes bet big on commuter bikes right before a long, wet winter. Floor inventory is heavy, and cash is trapped on the wall. Service revenue is healthy, and demand will bounce back—if they can hold the team, lean into repairs, and run smarter seasonal buys.",
      fundingGoal: 32000,
      currentFunded: 8000,
      emergency: true,
      healthScore: 58,
      riskScore: 66,
      revivalScore: 69,
      recoveryProbability: 0.68,
      minRecommendedPledge: 250,
      maxRecommendedPledge: 6000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 38000, expenses: 41200 },
          { month: "2025-10", revenue: 36100, expenses: 40100 },
          { month: "2025-11", revenue: 34400, expenses: 39500 },
          { month: "2025-12", revenue: 35200, expenses: 39200 },
          { month: "2026-01", revenue: 33100, expenses: 38400 },
          { month: "2026-02", revenue: 33900, expenses: 37900 },
        ],
      },
      expensesMonthly: 39000,
      fundUsagePlan: {
        items: [
          { label: "Inventory markdown + clearance", percent: 30 },
          { label: "Service bay expansion", percent: 30 },
          { label: "Seasonal marketing", percent: 20 },
          { label: "Emergency buffer", percent: 20 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Inventory audit + markdown plan." },
          { label: "Day 7", status: "planned", summary: "Repair subscription pilot." },
          { label: "Day 30", status: "planned", summary: "Inventory-to-cash conversion tracked." },
          { label: "Day 60", status: "planned", summary: "Repair revenue up 25%." },
        ],
      },
      beforeImageUrl: "/demo/bike-before.jpg",
      afterImageUrl: "/demo/bike-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Sunrise Childcare Cooperative",
      slug: "sunrise-childcare-cooperative",
      category: "Services",
      city: "Atlanta",
      country: "USA",
      latitude: 33.749,
      longitude: -84.388,
      shortDescription:
        "Worker-owned childcare center navigating regulatory changes and delayed subsidy payments.",
      story:
        "Sunrise is a cooperative childcare center serving shift workers. New regulations forced them to upgrade facilities and staffing ratios, right as subsidy payments slowed. The model works; the timing doesn’t. ReviveFund backers are helping cover the regulatory step-up so Sunrise can keep serving families that don’t have many options.",
      fundingGoal: 38000,
      currentFunded: 12500,
      emergency: true,
      healthScore: 61,
      riskScore: 62,
      revivalScore: 75,
      recoveryProbability: 0.78,
      minRecommendedPledge: 300,
      maxRecommendedPledge: 7000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 41000, expenses: 43500 },
          { month: "2025-10", revenue: 42200, expenses: 44100 },
          { month: "2025-11", revenue: 41800, expenses: 45200 },
          { month: "2025-12", revenue: 43200, expenses: 45800 },
          { month: "2026-01", revenue: 44500, expenses: 46600 },
          { month: "2026-02", revenue: 45200, expenses: 46100 },
        ],
      },
      expensesMonthly: 46000,
      fundUsagePlan: {
        items: [
          { label: "Facility upgrades", percent: 40 },
          { label: "Staff training + compliance", percent: 30 },
          { label: "Bridge for subsidy delays", percent: 20 },
          { label: "Community scholarships", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Upgrade plan approved by regulators." },
          { label: "Day 7", status: "planned", summary: "Work scheduled off-hours." },
          { label: "Day 30", status: "planned", summary: "Facility inspection passed." },
          { label: "Day 60", status: "planned", summary: "Enrollment stabilized at new capacity." },
        ],
      },
      beforeImageUrl: "/demo/childcare-before.jpg",
      afterImageUrl: "/demo/childcare-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Rooftop Grove Urban Farm",
      slug: "rooftop-grove-urban-farm",
      category: "Ag / CPG",
      city: "Berlin",
      country: "Germany",
      latitude: 52.52,
      longitude: 13.405,
      shortDescription:
        "Rooftop farm supplying local restaurants, hit by input cost spikes and a broken irrigation system.",
      story:
        "Rooftop Grove turned an empty rooftop into a dense greens farm. They sell to neighborhood restaurants and a small subscription base. A failed irrigation system wiped out a season’s margin. The team has secured supplier discounts and restaurant commitments; they just need capital to rebuild and harden the system.",
      fundingGoal: 27000,
      currentFunded: 9300,
      emergency: false,
      healthScore: 64,
      riskScore: 57,
      revivalScore: 78,
      recoveryProbability: 0.8,
      minRecommendedPledge: 250,
      maxRecommendedPledge: 5000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 22000, expenses: 23600 },
          { month: "2025-10", revenue: 23100, expenses: 23800 },
          { month: "2025-11", revenue: 21900, expenses: 23100 },
          { month: "2025-12", revenue: 22800, expenses: 23300 },
          { month: "2026-01", revenue: 21400, expenses: 22800 },
          { month: "2026-02", revenue: 22200, expenses: 22600 },
        ],
      },
      expensesMonthly: 23000,
      fundUsagePlan: {
        items: [
          { label: "Irrigation rebuild", percent: 45 },
          { label: "Backup water storage", percent: 20 },
          { label: "Restaurant partnership pilots", percent: 20 },
          { label: "Emergency buffer", percent: 15 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Engineering specs locked." },
          { label: "Day 7", status: "planned", summary: "New system installed." },
          { label: "Day 30", status: "planned", summary: "Full harvest cycle online." },
          { label: "Day 60", status: "planned", summary: "Subscription waitlist reopened." },
        ],
      },
      beforeImageUrl: "/demo/farm-before.jpg",
      afterImageUrl: "/demo/farm-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "Baseline Tools",
      slug: "baseline-tools",
      category: "Developer SaaS",
      city: "Toronto",
      country: "Canada",
      latitude: 43.6532,
      longitude: -79.3832,
      shortDescription:
        "Developer productivity SaaS with strong usage but pricing that lagged cloud costs. Now mid-pricing reset.",
      story:
        "Baseline Tools helps engineering teams track deployment quality without heavyweight dashboards. The product is beloved; pricing was not. Costs crept up faster than revenue, and free tiers overstayed their welcome. The team is rolling out new plans and using ReviveFund to absorb churn while moving to sustainable pricing.",
      fundingGoal: 75000,
      currentFunded: 26000,
      emergency: false,
      healthScore: 73,
      riskScore: 49,
      revivalScore: 82,
      recoveryProbability: 0.86,
      minRecommendedPledge: 1500,
      maxRecommendedPledge: 25000,
      monthlyRevenue: {
        history: [
          { month: "2025-09", revenue: 52000, expenses: 81000 },
          { month: "2025-10", revenue: 54500, expenses: 80200 },
          { month: "2025-11", revenue: 56300, expenses: 78900 },
          { month: "2025-12", revenue: 58500, expenses: 77600 },
          { month: "2026-01", revenue: 60400, expenses: 75800 },
          { month: "2026-02", revenue: 62100, expenses: 74100 },
        ],
      },
      expensesMonthly: 75000,
      fundUsagePlan: {
        items: [
          { label: "Cloud and infra costs", percent: 40 },
          { label: "Customer success during pricing reset", percent: 30 },
          { label: "Self-serve onboarding", percent: 20 },
          { label: "Runway buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Pricing changes announced." },
          { label: "Day 7", status: "planned", summary: "Grandfathering plans finalized." },
          { label: "Day 30", status: "planned", summary: "MRR stabilizes post-change." },
          { label: "Day 60", status: "planned", summary: "Back to growth with healthy margins." },
        ],
      },
      beforeImageUrl: "/demo/devtools-before.jpg",
      afterImageUrl: "/demo/devtools-after.jpg",
      ownerId: owner.id,
    },
  ];

  const normalizedBusinessesData = businessesData.map((b) => ({
    ...b,
    monthlyRevenue: JSON.stringify(b.monthlyRevenue),
    fundUsagePlan: JSON.stringify(b.fundUsagePlan),
    timeline: JSON.stringify(b.timeline),
  }));

  const businesses = [];
  for (const data of normalizedBusinessesData) {
    const business = await prisma.business.create({ data });
    businesses.push(business);
  }

  // Seed a few example contributions and updates on the first business
  const primaryBusiness = businesses[0];

  await prisma.contribution.createMany({
    data: [
      {
        amount: 750,
        type: "DONATION",
        note: "For the baristas who remember every regular.",
        userId: backer.id,
        businessId: primaryBusiness.id,
      },
      {
        amount: 2000,
        type: "INVESTMENT",
        note: "Backing the turnaround plan, not just the vibes.",
        userId: backer.id,
        businessId: primaryBusiness.id,
      },
    ],
  });

  await prisma.updateLog.createMany({
    data: [
      {
        businessId: primaryBusiness.id,
        title: "Lease reset in motion",
        body: "We’ve aligned with our landlord on a 6‑month reset that gets rent back in line with current traffic.",
        type: "MILESTONE",
        tag: "LEASE",
      },
      {
        businessId: primaryBusiness.id,
        title: "Menu shrink, margin up",
        body: "We cut the low-margin drinks and simplified the bar flow. First week of data shows a 6% margin lift.",
        type: "FUNDING",
        tag: "OPERATIONS",
      },
    ],
  });

  // Expert offers and an adoption for the primary business
  const opsOffer = await prisma.expertOffer.create({
    data: {
      businessId: primaryBusiness.id,
      expertId: expert.id,
      title: "Ops sprint: 30 days to cash clarity",
      description:
        "Hands-on help to clean up vendor terms, simplify SKUs, and rebuild a weekly cash forecast the team can actually run.",
      rewardRsol: 2500,
      status: "OPEN",
    },
  });

  await prisma.adoption.create({
    data: {
      userId: backer.id,
      businessId: primaryBusiness.id,
      offerId: opsOffer.id,
      status: "ACTIVE",
      tasks: JSON.stringify({
        items: [
          { label: "Review turnaround plan", done: true, impact: "context" },
          { label: "Share campaign with 3 friends", done: false, impact: "reach" },
          { label: "Join monthly update call", done: false, impact: "accountability" },
        ],
      }),
      earnedRsol: 500,
    },
  });

  console.log("Database seeded with demo users and 12 businesses.");
  console.log("Demo login: backer@revivefund.demo / owner@revivefund.demo / expert@revivefund.demo with password 'demo1234'.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

