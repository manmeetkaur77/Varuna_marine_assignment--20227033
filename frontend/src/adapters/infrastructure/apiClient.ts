// src/adapters/api.ts
const API_BASE = "http://localhost:3000/api";

export async function getRoutes() {
  const res = await fetch(`${API_BASE}/routes`);
  if (!res.ok) throw new Error("Failed to fetch routes");
  return res.json();
}

export async function getBaseline() {
  const res = await fetch(`${API_BASE}/baseline`);
  if (!res.ok) throw new Error("Failed to fetch baseline");
  return res.json();
}

// you can add more later (banking, pooling, etc.)
