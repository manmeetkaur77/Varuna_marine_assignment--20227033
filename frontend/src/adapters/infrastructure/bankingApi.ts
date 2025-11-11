import { API } from "./apiClient";

export async function bankSurplus(payload: { shipId: string; year: number; amount: number }) {
  const res = await API.post("/banking/bank", payload);
  return res.data;
}

export async function applyBank(payload: { shipId: string; year: number; amount: number }) {
  const res = await API.post("/banking/apply", payload);
  return res.data;
}

export async function getBankRecords(shipId: string, year: number) {
  const res = await API.get("/banking/records", { params: { shipId, year }});
  return res.data;
}
