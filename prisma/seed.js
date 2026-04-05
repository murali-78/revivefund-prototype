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
  await prisma.session.deleteMany();
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
      name: "AquaNano Filters",
      slug: "aquanano-filters",
      category: "Water Tech",
      city: "Austin",
      country: "USA",
      latitude: 30.2672,
      longitude: -97.7431,
      shortDescription:
        "Microplastic water filter for homes and schools. Pilot orders exceeded capacity; scaling needs capital.",
      story:
        "AquaNano developed a low-cost ceramic filter that captures microplastics from tap water. Early pilots in schools and low-income housing showed strong adoption, but manufacturing bottlenecks and supply chain delays drained runway. The team has proven demand—they need capital to scale production and hit breakeven.",
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
          { label: "Production line expansion", percent: 35 },
          { label: "Raw material inventory", percent: 25 },
          { label: "Distribution partnerships", percent: 25 },
          { label: "Working capital", percent: 15 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Campaign launches; supplier terms locked." },
          { label: "Day 7", status: "planned", summary: "Manufacturing partner conversation." },
          { label: "Day 30", status: "planned", summary: "New line operational." },
          { label: "Day 60", status: "planned", summary: "Break-even on unit economics." },
        ],
      },
      gallery: JSON.stringify([
        "/demo/aquanano-1.png",
        "/demo/aquanano-2.png",
        "/demo/aquanano-3.png",
        "/demo/aquanano-4.png"
      ]),
      beforeImageUrl: "/demo/coffee-before.jpg",
      afterImageUrl: "/demo/coffee-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "FlowWise Water",
      slug: "flowwise-water",
      category: "Water Access",
      city: "Boston",
      country: "USA",
      latitude: 42.3601,
      longitude: -71.0589,
      shortDescription:
        "Clean water access for underserved communities. Two pilot programs delayed by permitting; cash stretched.",
      story:
        "FlowWise deploys decentralized water purification units in areas without reliable municipal supply. Two pilot programs in rural and urban settings hit permitting delays; revenue slipped while fixed costs remained. The model works and permits are near—they need a bridge to reach first paying deployments.",
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
          { label: "Pilot deployment costs", percent: 40 },
          { label: "Equipment and installation", percent: 30 },
          { label: "Community outreach", percent: 15 },
          { label: "Runway buffer", percent: 15 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "completed", summary: "First permit approved." },
          { label: "Day 7", status: "planned", summary: "Installation crews mobilized." },
          { label: "Day 30", status: "planned", summary: "Both pilots live." },
          { label: "Day 60", status: "planned", summary: "Subscription revenue flowing." },
        ],
      },
      beforeImageUrl: "/demo/diner-before.jpg",
      afterImageUrl: "/demo/diner-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "BreatheClear Labs",
      slug: "breatheclear-labs",
      category: "Air Quality",
      city: "New York",
      country: "USA",
      latitude: 40.7128,
      longitude: -74.006,
      shortDescription:
        "Air quality and asthma management tool for schools and clinics. Strong product, thin runway between rounds.",
      story:
        "BreatheClear helps schools and clinics monitor air quality and support asthma management. The product is sticky and churn is low, but their bridge round fell apart. They're cutting burn and focusing on high-margin segments—ReviveFund helps extend runway without a down round.",
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
          { label: "Core R&D and product", percent: 45 },
          { label: "Sales and customer success", percent: 30 },
          { label: "Runway buffer", percent: 25 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "completed", summary: "Burn-reduction plan live." },
          { label: "Day 7", status: "planned", summary: "Segment focus narrowed." },
          { label: "Day 30", status: "planned", summary: "First profitable cohort." },
          { label: "Day 60", status: "planned", summary: "Runway extended 18+ months." },
        ],
      },
      beforeImageUrl: "/demo/saas-before.jpg",
      afterImageUrl: "/demo/saas-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "HeatAlarm",
      slug: "heatalarm",
      category: "Climate Tech",
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
          { label: "Sensor deployment", percent: 40 },
          { label: "Outreach and partnerships", percent: 35 },
          { label: "Platform development", percent: 15 },
          { label: "Buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Grant disbursement timeline locked." },
          { label: "Day 7", status: "planned", summary: "Sensor rollout started." },
          { label: "Day 30", status: "planned", summary: "First city fully live." },
          { label: "Day 60", status: "planned", summary: "Positive cash flow from grants." },
        ],
      },
      beforeImageUrl: "/demo/gym-before.jpg",
      afterImageUrl: "/demo/gym-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "GardenMind",
      slug: "gardenmind",
      category: "Urban Farming",
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
          { label: "Site consolidation", percent: 45 },
          { label: "Program refinement", percent: 30 },
          { label: "Partnership development", percent: 15 },
          { label: "Buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Site rationalization announced." },
          { label: "Day 7", status: "planned", summary: "High-value sites prioritized." },
          { label: "Day 30", status: "planned", summary: "First break-even site." },
          { label: "Day 60", status: "planned", summary: "Network-level sustainability." },
        ],
      },
      beforeImageUrl: "/demo/logistics-before.jpg",
      afterImageUrl: "/demo/logistics-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "CarbonPlate",
      slug: "carbonplate",
      category: "Food Tech",
      city: "Los Angeles",
      country: "USA",
      latitude: 34.0522,
      longitude: -118.2437,
      shortDescription:
        "Food carbon & nutrition tracking for restaurants and cafeterias. Retainers evaporated in downturn.",
      story:
        "CarbonPlate helps restaurants and cafeterias track meal carbon footprint and nutrition. When budgets tightened, retainers disappeared. The founders cut salaries and pivoted to school district pilots. Pipeline is rebuilding—they need short-term capital to keep the core team and close anchor deals.",
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
          { label: "Sales and pilots", percent: 30 },
          { label: "Product", percent: 15 },
          { label: "Buffer", percent: 5 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "District pilot outreach." },
          { label: "Day 7", status: "planned", summary: "Pricing reset live." },
          { label: "Day 30", status: "planned", summary: "First district signed." },
          { label: "Day 60", status: "planned", summary: "Predictable MRR." },
        ],
      },
      beforeImageUrl: "/demo/agency-before.jpg",
      afterImageUrl: "/demo/agency-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "WasteSpark Energy",
      slug: "wastespark-energy",
      category: "Waste-to-Energy",
      city: "Denver",
      country: "USA",
      latitude: 39.7392,
      longitude: -104.99,
      shortDescription:
        "Waste-to-energy for small municipalities. Permitting and capex delays; cash squeezed.",
      story:
        "WasteSpark builds small-scale waste-to-energy plants for municipalities. Permitting took longer than modeled; capex drawdowns lagged. They're renegotiating vendor terms and shifting to phased deployments. ReviveFund bridges the gap until first plant is operational.",
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
          { label: "Plant completion", percent: 45 },
          { label: "Vendor negotiations", percent: 25 },
          { label: "Regulatory", percent: 20 },
          { label: "Buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Phased plan announced." },
          { label: "Day 7", status: "planned", summary: "Vendor terms locked." },
          { label: "Day 30", status: "planned", summary: "First plant online." },
          { label: "Day 60", status: "planned", summary: "Revenue flowing." },
        ],
      },
      beforeImageUrl: "/demo/media-before.jpg",
      afterImageUrl: "/demo/media-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "FootprintTrack",
      slug: "footprinttrack",
      category: "Climate SaaS",
      city: "Toronto",
      country: "Canada",
      latitude: 43.6532,
      longitude: -79.3832,
      shortDescription:
        "Carbon footprint tracker for SMBs. Strong usage, pricing lagged cloud costs.",
      story:
        "FootprintTrack helps SMBs measure and reduce their carbon footprint. The product is beloved; pricing didn't keep pace with data and infra costs. The team is rolling out new plans and using ReviveFund to absorb churn while moving to sustainable pricing.",
      fundingGoal: 65000,
      currentFunded: 24000,
      emergency: false,
      healthScore: 71,
      riskScore: 51,
      revivalScore: 80,
      recoveryProbability: 0.84,
      minRecommendedPledge: 1200,
      maxRecommendedPledge: 22000,
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
          { label: "Infra and data", percent: 40 },
          { label: "Customer success", percent: 30 },
          { label: "Sales", percent: 20 },
          { label: "Buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Pricing changes announced." },
          { label: "Day 7", status: "planned", summary: "Grandfathering finalized." },
          { label: "Day 30", status: "planned", summary: "MRR stabilizes." },
          { label: "Day 60", status: "planned", summary: "Growth resumes." },
        ],
      },
      beforeImageUrl: "/demo/retail-before.jpg",
      afterImageUrl: "/demo/retail-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "ClimateCalm",
      slug: "climatecalm",
      category: "Mental Health",
      city: "San Francisco",
      country: "USA",
      latitude: 37.7749,
      longitude: -122.4194,
      shortDescription:
        "Climate anxiety support network. Community + tools for eco-anxiety. Grant-dependent, delayed disbursements.",
      story:
        "ClimateCalm runs a support network and tools for people struggling with climate anxiety. Funding is largely grant-dependent; disbursements from two major grants were delayed. The team has cut costs and diversified toward B2B wellness programs. They need a bridge until grants land.",
      fundingGoal: 42000,
      currentFunded: 9500,
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
          { label: "Community and content", percent: 55 },
          { label: "B2B pilot development", percent: 25 },
          { label: "Operations", percent: 15 },
          { label: "Buffer", percent: 5 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Grant timeline confirmed." },
          { label: "Day 7", status: "planned", summary: "B2B pilot launched." },
          { label: "Day 30", status: "planned", summary: "First grant disbursement." },
          { label: "Day 60", status: "planned", summary: "Breakeven." },
        ],
      },
      beforeImageUrl: "/demo/bike-before.jpg",
      afterImageUrl: "/demo/bike-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "ToxicScan",
      slug: "toxicscan",
      category: "Environmental Tech",
      city: "Detroit",
      country: "USA",
      latitude: 42.3314,
      longitude: -83.0458,
      shortDescription:
        "Toxic hotspot detector for communities. Crowdsourced + sensor data. Pilot expansion stalled.",
      story:
        "ToxicScan combines crowdsourced reports and sensor data to map toxic hotspots in underserved neighborhoods. Pilot expansion stalled when a key municipal partner pulled funding. The team has secured alternative pilots and needs capital to deploy sensors and rebuild momentum.",
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
          { label: "Sensor deployment", percent: 40 },
          { label: "Community outreach", percent: 30 },
          { label: "Platform", percent: 20 },
          { label: "Buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "New pilot partners locked." },
          { label: "Day 7", status: "planned", summary: "Sensor rollout started." },
          { label: "Day 30", status: "planned", summary: "First new pilot live." },
          { label: "Day 60", status: "planned", summary: "Revenue stabilized." },
        ],
      },
      beforeImageUrl: "/demo/childcare-before.jpg",
      afterImageUrl: "/demo/childcare-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "ResilientHome",
      slug: "resilienthome",
      category: "Climate-Resilient Housing",
      city: "Miami",
      country: "USA",
      latitude: 25.7617,
      longitude: -80.1918,
      shortDescription:
        "Climate-resilient housing retrofits for at-risk communities. Subsidy delays; cash flow stressed.",
      story:
        "ResilientHome helps homeowners in flood and storm zones retrofit for climate resilience. Subsidy programs fund most of the work, but disbursements are slow. The team has a backlog of approved projects and needs working capital to complete jobs before the next storm season.",
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
          { label: "Job completion", percent: 40 },
          { label: "Materials", percent: 35 },
          { label: "Labor", percent: 15 },
          { label: "Buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Subsidy acceleration requested." },
          { label: "Day 7", status: "planned", summary: "Backlog jobs scheduled." },
          { label: "Day 30", status: "planned", summary: "First batch completed." },
          { label: "Day 60", status: "planned", summary: "Cash flow positive." },
        ],
      },
      beforeImageUrl: "/demo/farm-before.jpg",
      afterImageUrl: "/demo/farm-after.jpg",
      ownerId: owner.id,
    },
    {
      name: "GreenRx Network",
      slug: "greenrx-network",
      category: "Green Health",
      city: "Berlin",
      country: "Germany",
      latitude: 52.52,
      longitude: 13.405,
      shortDescription:
        "Green prescription provider network—nature-based health interventions. Pilot with insurers; payment terms long.",
      story:
        "GreenRx connects clinicians with nature-based health interventions (parks, gardens, outdoor programs). Pilot agreements with insurers are signed, but payment terms stretch to 90 days. The team needs working capital to deliver services and pay providers while waiting for reimbursement.",
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
          { label: "Provider payments", percent: 45 },
          { label: "Platform and ops", percent: 30 },
          { label: "Sales", percent: 15 },
          { label: "Buffer", percent: 10 },
        ],
      },
      timeline: {
        milestones: [
          { label: "Day 1", status: "planned", summary: "Payment terms renegotiation." },
          { label: "Day 7", status: "planned", summary: "Provider agreements updated." },
          { label: "Day 30", status: "planned", summary: "First reimbursements received." },
          { label: "Day 60", status: "planned", summary: "Sustainable cash cycle." },
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
        note: "Clean water matters.",
        userId: backer.id,
        businessId: primaryBusiness.id,
      },
      {
        amount: 2000,
        type: "INVESTMENT",
        note: "Backing the revival plan.",
        userId: backer.id,
        businessId: primaryBusiness.id,
      },
    ],
  });

  await prisma.updateLog.createMany({
    data: [
      {
        businessId: primaryBusiness.id,
        title: "Supplier terms locked",
        body: "We’ve aligned with our landlord on a 6‑month reset that gets rent back in line with current traffic.",
        type: "MILESTONE",
        tag: "SUPPLIER",
      },
      {
        businessId: primaryBusiness.id,
        title: "Production line upgrade",
        body: "First week on new line shows 6% efficiency lift.",
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
      title: "Impact sprint: 30 days to cash clarity",
      description:
        "Hands-on help to clean up vendor terms, simplify ops, and rebuild a weekly cash forecast the team can actually run.",
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
          { label: "Review revival plan", done: true, impact: "context" },
          { label: "Share campaign with 3 friends", done: false, impact: "reach" },
          { label: "Join monthly update call", done: false, impact: "accountability" },
        ],
      }),
      earnedRsol: 500,
    },
  });

  console.log("Database seeded with 12 green health & climate ventures.");
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

