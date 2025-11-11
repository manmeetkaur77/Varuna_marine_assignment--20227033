import { useState } from "react";
import * as api from "../infrastructure/bankingApi";

export function useBanking() {
  const [records, setRecords] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function bank(payload: { shipId: string; year: number; amount: number }) {
    try {
      const res = await api.bankSurplus(payload);
      return res;
    } catch (e:any) {
      setError(e?.message || "Failed to bank");
      throw e;
    }
  }

  async function apply(payload: { shipId: string; year: number; amount: number }) {
    try {
      const res = await api.applyBank(payload);
      return res;
    } catch (e:any) {
      setError(e?.message || "Failed to apply");
      throw e;
    }
  }

  async function fetchRecords(shipId: string, year: number) {
    try {
      const res = await api.getBankRecords(shipId, year);
      setRecords(res);
    } catch {
      setRecords([]);
    }
  }

  return { records, error, bank, apply, fetchRecords };
}
