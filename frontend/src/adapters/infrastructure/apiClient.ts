// src/adapters/infrastructure/apiClient.ts
const API_BASE = "http://localhost:3000/api";


async function getRoutes() {
  const res = await fetch(`${API_BASE}/routes`);
  if (!res.ok) throw new Error("Failed to fetch routes");
  return res.json();
}

async function getBaseline() {
  const res = await fetch(`${API_BASE}/baseline`);
  if (!res.ok) throw new Error("Failed to fetch baseline");
  return res.json();
}

// ✅ export an object named API
export const API = {
  getRoutes,
  getBaseline,
};
