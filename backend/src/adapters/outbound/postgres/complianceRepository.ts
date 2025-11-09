import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ComplianceRepository {
  async saveCB(shipId: string, year: number, cb: number) {
    return prisma.shipCompliance.upsert({
      where: { shipId_year: { shipId, year } },
      update: { cbGco2eq: cb },
      create: { shipId, year, cbGco2eq: cb },
    });
  }

  async getCB(shipId: string, year: number) {
    return prisma.shipCompliance.findUnique({
      where: { shipId_year: { shipId, year } },
    });
  }
}
