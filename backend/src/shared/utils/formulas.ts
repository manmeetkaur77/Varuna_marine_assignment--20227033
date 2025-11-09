export const TARGET_2025 = 89.3368;
const MJ_PER_TON = 41000;

export function calculateEnergy(fuelConsumption: number) {
  return fuelConsumption * MJ_PER_TON;
}

export function calculateComplianceBalance(
  target: number,
  actual: number,
  fuelConsumption: number
) {
  const energy = calculateEnergy(fuelConsumption);
  return (target - actual) * energy;
}

export function percentDiff(comparison: number, baseline: number) {
  return ((comparison / baseline) - 1) * 100;
}
