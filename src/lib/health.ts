import type { Business } from "@prisma/client";

export type HealthAnalysis = {
  healthScore: number;
  riskScore: number;
  revivalScore: number;
  recoveryProbability: number;
  urgency: number;
  riskLabel: "Low" | "Moderate" | "Elevated" | "Critical";
  recommendedRange: { min: number; max: number };
  commentary: string[];
};

type ParsedRevenuePoint = { month: string; revenue: number; expenses: number };

function parseRevenueHistory(business: Business): ParsedRevenuePoint[] {
  try {
    const parsed = JSON.parse(business.monthlyRevenue) as {
      history?: ParsedRevenuePoint[];
    };
    return parsed.history ?? [];
  } catch {
    return [];
  }
}

export function analyzeBusiness(business: Business): HealthAnalysis {
  const history = parseRevenueHistory(business);
  const last = history[history.length - 1];
  const prev = history[history.length - 2];

  const marginNow =
    last && typeof last.revenue === "number" && typeof last.expenses === "number"
      ? (last.revenue - last.expenses) / Math.max(last.revenue, 1)
      : 0;
  const marginTrend =
    last && prev
      ? (last.revenue - last.expenses) / Math.max(last.revenue, 1) -
        (prev.revenue - prev.expenses) / Math.max(prev.revenue, 1)
      : 0;

  const fundedRatio = business.currentFunded / Math.max(business.fundingGoal, 1);
  const burnCoverageMonths =
    (business.currentFunded + (last?.revenue ?? 0) - business.expensesMonthly) /
    Math.max(business.expensesMonthly, 1);

  let baseHealth = 60 + marginNow * 25 + marginTrend * 20 + fundedRatio * 10;
  baseHealth -= business.emergency ? 8 : 0;
  baseHealth = Math.max(10, Math.min(95, Math.round(baseHealth)));

  let riskScore = 80 - baseHealth * 0.5;
  riskScore += business.emergency ? 10 : 0;
  riskScore -= burnCoverageMonths > 0 ? Math.min(10, burnCoverageMonths * 2) : 0;
  riskScore = Math.max(10, Math.min(90, Math.round(riskScore)));

  const revivalScore = Math.round(
    (baseHealth + (business.revivalScore || 70) + Math.max(0, marginTrend * 40)) / 2,
  );

  const recoveryProbability = Math.max(
    0.25,
    Math.min(0.95, baseHealth / 110 + fundedRatio * 0.25 + (marginTrend > 0 ? 0.08 : -0.02)),
  );

  const urgencyRaw =
    (business.emergency ? 25 : 0) +
    (1 - fundedRatio) * 30 +
    (marginNow < 0 ? 20 : 0) +
    (burnCoverageMonths < 0 ? 15 : 0);
  const urgency = Math.max(5, Math.min(100, Math.round(urgencyRaw)));

  let riskLabel: HealthAnalysis["riskLabel"];
  if (riskScore < 30) riskLabel = "Low";
  else if (riskScore < 50) riskLabel = "Moderate";
  else if (riskScore < 70) riskLabel = "Elevated";
  else riskLabel = "Critical";

  const typicalTicket = Math.round(business.fundingGoal / 40);
  const recommendedRange = {
    min: Math.max(50, Math.round(typicalTicket * 0.6)),
    max: Math.round(typicalTicket * 2.4),
  };

  const commentary: string[] = [];
  if (business.emergency) {
    commentary.push("Emergency flag is on — this business is in an active cash crunch window.");
  }
  if (marginNow < 0) {
    commentary.push("Latest month is loss-making; this is about bridging to a healthier mix.");
  } else if (marginNow > 0.08) {
    commentary.push("Latest month shows positive margin — the core model works.");
  }
  if (marginTrend > 0.03) {
    commentary.push("Margins are improving month-over-month after recent changes.");
  }
  if (fundedRatio > 0.6) {
    commentary.push("A meaningful share of the round is already covered; remaining capital is de-risked.");
  } else if (fundedRatio < 0.25) {
    commentary.push("Round is early; your backing is signal that helps unlock the rest.");
  }

  return {
    healthScore: baseHealth,
    riskScore,
    revivalScore,
    recoveryProbability,
    urgency,
    riskLabel,
    recommendedRange,
    commentary,
  };
}

