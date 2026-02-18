"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function contributeToBusiness(input: {
  slug: string;
  amount: number;
  type: string;
  note: string;
}) {
  const business = await prisma.business.findUnique({
    where: { slug: input.slug },
  });

  if (!business) {
    throw new Error("Business not found");
  }

  // In demo mode we always attribute funding to the seeded backer user.
  const backer = await prisma.user.findFirst({
    where: { email: "backer@revivefund.demo" },
  });

  if (!backer) {
    throw new Error("Demo backer user missing from seed");
  }

  const amount = Math.max(50, Math.round(input.amount || 0));

  await prisma.$transaction(async (tx) => {
    await tx.contribution.create({
      data: {
        amount,
        type: input.type,
        note: input.note || null,
        userId: backer.id,
        businessId: business.id,
      },
    });

    await tx.business.update({
      where: { id: business.id },
      data: {
        currentFunded: business.currentFunded + amount,
      },
    });

    await tx.updateLog.create({
      data: {
        businessId: business.id,
        title: `New pledge: ${amount.toLocaleString()} rSOL`,
        body:
          "Demo event: funding landed, runway extends on the dashboard and projections update immediately.",
        type: "FUNDING",
        amount,
        tag: "DEMO_PLEDGE",
      },
    });
  });

  revalidatePath(`/b/${input.slug}`);
  revalidatePath(`/b/${input.slug}/dashboard`);
  revalidatePath("/");
}

