import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BankingRepository {
  async bankSurplus(shipId: string, year: number | string, amount: number | string) {
    const numericYear = Number(year);
    const numericAmount = Number(amount);

    if (isNaN(numericYear) || isNaN(numericAmount)) {
      throw new Error("Invalid input: year and amount must be numbers");
    }

    return prisma.bankEntry.create({
      data: {
        shipId,
        year: numericYear, // ✅ explicitly number
        amountGco2eq: numericAmount, // ✅ explicitly number
      },
    });
  }

  async getBanked(shipId: string, year: number | string) {
    const numericYear = Number(year);

    if (isNaN(numericYear)) {
      throw new Error("Invalid input: year must be a number");
    }

    return prisma.bankEntry.findMany({
      where: {
        shipId,
        year: numericYear, // ✅ explicitly number
      },
    });
  }
}
