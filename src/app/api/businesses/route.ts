import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeBusiness } from "@/lib/health";

export async function GET() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "asc" },
  });

  const enriched = businesses.map((b) => {
    const analysis = analyzeBusiness(b);
    return {
      ...b,
      urgency: analysis.urgency,
    };
  });

  return NextResponse.json(enriched);
}
