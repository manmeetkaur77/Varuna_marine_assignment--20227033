import { API } from "./apiClient";

export async function createPool(payload: { year: number; members: { shipId: string; cbBefore: number }[] }) {
  const res = await API.post("/pools", payload);
  return res.data;
}
