// Pure logic for computing compliance balance and percentDiff
export const TARGET_INTENSITY = 89.3368; // target for 2025

export function energyInScope(fuelConsumptionT: number) {
  // MJ = t * 41 000 MJ/t
  return fuelConsumptionT * 41000;
}

export function computeComplianceBalance(target: number, actual: number, fuelConsumptionT: number) {
  const energy = energyInScope(fuelConsumptionT);
  const cb = (target - actual) * energy; // units: gCO2e
  return cb;
}

export function percentDiff(baseline: number, comparison: number) {
  if (baseline === 0) return 0;
  return ((comparison / baseline) - 1) * 100;
}
