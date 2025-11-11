import { useEffect, useState } from "react";
import { fetchData, postData } from "../infrastructure/apiClient";

export function useRoutes() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    try {
      const data = await fetchData("/routes");
      setRoutes(data);
    } catch (err) {
      console.error("Failed to fetch routes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function setBaseline(routeId: string) {
    try {
      await postData(`/routes/${routeId}/baseline`, {});
      alert(`Baseline set for ${routeId}`);
      reload();
    } catch (err) {
      console.error("Failed to set baseline:", err);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  return { routes, loading, setBaseline, reload };
}
