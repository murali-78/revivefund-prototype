import { PrismaClient } from "@prisma/client";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Dynamically resolve SQLite database URL to absolute path for Vercel standalone runtime
const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const databaseUrl = `file:${dbPath}`;

export const prisma =
  global.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

