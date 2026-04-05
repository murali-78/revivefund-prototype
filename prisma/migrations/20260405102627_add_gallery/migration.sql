-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "fundingGoal" INTEGER NOT NULL,
    "currentFunded" INTEGER NOT NULL DEFAULT 0,
    "emergency" BOOLEAN NOT NULL DEFAULT false,
    "healthScore" INTEGER NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "revivalScore" INTEGER NOT NULL DEFAULT 0,
    "recoveryProbability" REAL NOT NULL,
    "minRecommendedPledge" INTEGER NOT NULL,
    "maxRecommendedPledge" INTEGER NOT NULL,
    "monthlyRevenue" TEXT NOT NULL,
    "expensesMonthly" INTEGER NOT NULL,
    "fundUsagePlan" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "beforeImageUrl" TEXT NOT NULL,
    "afterImageUrl" TEXT NOT NULL,
    "ownerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Business" ("afterImageUrl", "beforeImageUrl", "category", "city", "country", "createdAt", "currentFunded", "emergency", "expensesMonthly", "fundUsagePlan", "fundingGoal", "healthScore", "id", "latitude", "longitude", "maxRecommendedPledge", "minRecommendedPledge", "monthlyRevenue", "name", "ownerId", "recoveryProbability", "revivalScore", "riskScore", "shortDescription", "slug", "story", "timeline", "updatedAt") SELECT "afterImageUrl", "beforeImageUrl", "category", "city", "country", "createdAt", "currentFunded", "emergency", "expensesMonthly", "fundUsagePlan", "fundingGoal", "healthScore", "id", "latitude", "longitude", "maxRecommendedPledge", "minRecommendedPledge", "monthlyRevenue", "name", "ownerId", "recoveryProbability", "revivalScore", "riskScore", "shortDescription", "slug", "story", "timeline", "updatedAt" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
CREATE UNIQUE INDEX "Business_slug_key" ON "Business"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
