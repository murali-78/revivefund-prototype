-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adoption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "offerId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "tasks" TEXT NOT NULL,
    "earnedRsol" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adoption_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adoption_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "ExpertOffer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Adoption" ("businessId", "completedAt", "createdAt", "earnedRsol", "id", "offerId", "status", "tasks", "userId") SELECT "businessId", "completedAt", "createdAt", "earnedRsol", "id", "offerId", "status", "tasks", "userId" FROM "Adoption";
DROP TABLE "Adoption";
ALTER TABLE "new_Adoption" RENAME TO "Adoption";
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
