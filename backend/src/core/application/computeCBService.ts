import { ComplianceRepository } from "../../adapters/outbound/postgres/complianceRepository";

const TARGET_INTENSITY = 89.3368; // gCO₂e/MJ
const ENERGY_FACTOR = 41000; // MJ/t

const repo = new ComplianceRepository();

export const computeComplianceBalance = async (
  shipId: string,
  actualIntensity: number,
  fuelConsumption: number,
  year: number
) => {
  // Formula: CB = (Target - Actual) * Energy
  const energy = fuelConsumption * ENERGY_FACTOR;
  const cb = (TARGET_INTENSITY - actualIntensity) * energy;

  await repo.saveCB(shipId, year, cb);

  return {
    shipId,
    year,
    cb,
    status: cb >= 0 ? "Surplus" : "Deficit",
  };
};
