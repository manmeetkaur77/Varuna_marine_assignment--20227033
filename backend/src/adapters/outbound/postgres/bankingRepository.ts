import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BankingRepository {
  async bankSurplus(shipId: string, year: number, amount: number) {
    return prisma.bankEntry.create({ data: { shipId, year, amountGco2eq: amount } });
  }

  async getBanked(shipId: string, year: number) {
    return prisma.bankEntry.findMany({ where: { shipId, year } });
  }
}
