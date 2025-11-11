import { API } from "./apiClient";
import type { RouteRecord } from "../../core/domain/types";

export async function fetchRoutes(): Promise<RouteRecord[]> {
  const res = await API.get("/routes");
  return res.data;
}

export async function postSetBaseline(routeId: string) {
  const res = await API.post(`/routes/${routeId}/baseline`);
  return res.data;
}

export async function fetchComparison() {
  const res = await API.get("/routes/comparison");
  return res.data;
}
