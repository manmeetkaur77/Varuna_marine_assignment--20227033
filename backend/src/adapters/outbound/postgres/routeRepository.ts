import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class RouteRepository {
  async getAll() {
    return prisma.route.findMany();
  }

  async setBaseline(routeId: string) {
    await prisma.route.updateMany({ data: { isBaseline: false } });
    return prisma.route.update({ where: { routeId }, data: { isBaseline: true } });
  }

  async getBaseline() {
    return prisma.route.findFirst({ where: { isBaseline: true } });
  }
}


