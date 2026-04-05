"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await login(email, password);
  if (result.error) {
    return { error: result.error };
  }

  const cookieStore = await cookies();
  cookieStore.set("revivefund_session", result.token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect("/me");
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) || "BACKER";

  if (!email || !password || !name) {
    return { error: "All fields required" };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "Email already registered" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role,
    },
  });

  const { createSession } = await import("@/lib/auth");
  const token = await createSession(user.id);

  const cookieStore = await cookies();
  cookieStore.set("revivefund_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/me");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("revivefund_session")?.value;

  if (token) {
    const { logout } = await import("@/lib/auth");
    await logout(token);
  }

  cookieStore.delete("revivefund_session");
  redirect("/");
}
