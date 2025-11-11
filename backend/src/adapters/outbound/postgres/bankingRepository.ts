import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BankingRepository {
  // 🏦 Bank a positive Compliance Balance (CB)
  async bankSurplus(shipId: string, year: number | string, amount: number | string) {
    const numericYear = Number(year);
    const numericAmount = Number(amount);

    if (isNaN(numericYear) || isNaN(numericAmount)) {
      throw new Error("Invalid input: year and amount must be numbers");
    }

    return prisma.bankEntry.create({
      data: {
        shipId,
        year: numericYear,
        amountGco2eq: numericAmount,
      },
    });
  }

  // 📜 Fetch banked entries (optionally filtered)
  async getBanked(shipId?: string, year?: number | string) {
    const where: any = {};

    // Apply filters only if provided
    if (shipId) where.shipId = shipId;
    if (year !== undefined && year !== null && year !== "") {
      const numericYear = Number(year);
      if (isNaN(numericYear)) throw new Error("Invalid year value");
      where.year = numericYear;
    }

    // Fetch records sorted by most recent
    return prisma.bankEntry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  // 💰 Apply stored CB to offset a deficit
  async applyBankedCB(shipId: string, year: number, deficit: number) {
    // 1️⃣ Fetch current CB for this ship & year
    const current = await prisma.bankEntry.findFirst({
      where: { shipId, year },
      orderBy: { createdAt: "desc" },
    });

    if (!current) throw new Error("No banked CB found for this ship and year");

    const cb_before = current.amountGco2eq;
    const applied = Math.min(cb_before, deficit);
    const cb_after = cb_before - applied;

    // 2️⃣ Update the record
    await prisma.bankEntry.update({
      where: { id: current.id },
      data: { amountGco2eq: cb_after },
    });

    // 3️⃣ Return summary
    return { cb_before, applied, cb_after };
  }
}
