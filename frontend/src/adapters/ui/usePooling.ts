import { useState } from "react";
import * as api from "../infrastructure/poolsApi";

export function usePooling() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function create(payload: { year: number; members: { shipId: string; cbBefore: number }[] }) {
    try {
      const res = await api.createPool(payload);
      setResult(res);
      return res;
    } catch (e:any) {
      setError(e?.message || "Failed to create pool");
      throw e;
    }
  }

  return { result, error, create };
}
