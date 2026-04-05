"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function adoptBusinessAction(businessId: string) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth");
  }

  const existing = await prisma.adoption.findFirst({
    where: {
      userId: user.id,
      businessId,
      status: "ACTIVE",
    },
  });

  if (existing) {
    return { error: "You already adopted this business" };
  }

  const tasks = {
    items: [
      { label: "Review turnaround plan", done: false, impact: "context" },
      { label: "Share campaign with 3 friends", done: false, impact: "reach" },
      { label: "Join monthly update call", done: false, impact: "accountability" },
      { label: "Complete first milestone task", done: false, impact: "progress" },
    ],
  };

  await prisma.adoption.create({
    data: {
      userId: user.id,
      businessId,
      status: "ACTIVE",
      tasks: JSON.stringify(tasks),
      earnedRsol: 0,
    },
  });

  await prisma.business.update({
    where: { id: businessId },
    data: {
      revivalScore: { increment: 5 },
    },
  });

  revalidatePath("/adopt");
  revalidatePath(`/b/${businessId}`);
}
