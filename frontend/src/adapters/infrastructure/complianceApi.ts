import { API } from "./apiClient";

export async function getCB(params: { shipId: string; actualIntensity: number; fuelConsumption: number; year: number }) {
  const res = await API.get("/compliance/cb", { params });
  return res.data;
}

export async function getAdjustedCB(year: number) {
  const res = await API.get("/compliance/adjusted-cb", { params: { year }});
  return res.data;
}
