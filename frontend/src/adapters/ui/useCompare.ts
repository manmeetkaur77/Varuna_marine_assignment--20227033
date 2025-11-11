import { useEffect, useState } from "react";
import * as api from "../infrastructure/routesApi";
import { percentDiff } from "../../core/application/computeCB";

export function useCompare() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await api.fetchComparison();
      // assume backend returns items with baseline and comparison intensities
      setRows(data);
    } catch {
      // fallback: create comparisons using MOCK baseline = R001 (91)
      setRows([
        { routeId: "R002", baseline: 91, comparison: 88, percentDiff: percentDiff(91,88) },
        { routeId: "R003", baseline: 91, comparison: 93.5, percentDiff: percentDiff(91,93.5) },
      ]);
    } finally { setLoading(false); }
  }

  useEffect(()=>{ load(); }, []);

  return { rows, loading, reload: load };
}
