"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOfferAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "EXPERT") {
    redirect("/auth");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const rewardRsol = parseInt(formData.get("rewardRsol") as string, 10);

  await prisma.expertOffer.create({
    data: {
      expertId: user.id,
      title,
      description,
      rewardRsol,
      status: "OPEN",
    },
  });

  revalidatePath("/community");
}

export async function acceptOfferAction(formData: FormData): Promise<void> {
  const offerId = formData.get("offerId") as string;
  if (!offerId) {
    redirect("/community");
  }
  const user = await getCurrentUser();
  if (!user || user.role !== "OWNER") {
    redirect("/auth");
  }

  const offer = await prisma.expertOffer.findUnique({
    where: { id: offerId },
    include: { business: true },
  });

  if (!offer || offer.status !== "OPEN") {
    redirect("/community");
  }

  await prisma.expertOffer.update({
    where: { id: offerId },
    data: {
      status: "ACCEPTED",
      acceptedAt: new Date(),
    },
  });

  if (offer.business) {
    await prisma.business.update({
      where: { id: offer.business.id },
      data: {
        revivalScore: { increment: 10 },
      },
    });
  }

  revalidatePath("/community");
  if (offer.business) {
    revalidatePath(`/b/${offer.business.slug}`);
  }

  redirect("/community");
}
