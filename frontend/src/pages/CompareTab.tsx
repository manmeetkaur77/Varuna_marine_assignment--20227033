// src/pages/CompareTab.tsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

import "../pages/compare.css";

const CompareTab: React.FC = () => {
  const [baseline, setBaseline] = useState<any>(null);
  const [comparisons, setComparisons] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/routes/comparison")
      .then((res) => res.json())
      .then((data) => {
        setBaseline(data.baseline);
        setComparisons(data.comparisons);
      })
      .catch((err) => console.error("Error fetching comparison:", err));
  }, []);

  if (!baseline) return <p>Loading comparison data...</p>;

  // Combine baseline + comparison routes for chart
  const chartData = [
    { routeId: baseline.routeId, ghgIntensity: baseline.ghgIntensity },
    ...comparisons,
  ];

  return (
    <div className="compare-container">
      <h2>⚖️ GHG Intensity Comparison</h2>

      <div className="baseline-info">
        <strong>Baseline Route:</strong> {baseline.routeId} (
        {baseline.ghgIntensity} gCO₂e/MJ)
      </div>

      {/* Comparison Table */}
      <table className="compare-table">
        <thead>
          <tr>
            <th>Route ID</th>
            <th>GHG Intensity (gCO₂e/MJ)</th>
            <th>% Difference vs Baseline</th>
            <th>Compliant (≤ 89.3368)</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((r) => (
            <tr key={r.routeId}>
              <td>{r.routeId}</td>
              <td>{r.ghgIntensity.toFixed(2)}</td>
              <td
                style={{
                  color: r.percentDiff > 0 ? "#dc2626" : "#16a34a",
                  fontWeight: "bold",
                }}
              >
                {r.percentDiff.toFixed(2)}%
              </td>
              <td>{r.compliant ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>📊 Chart: Baseline vs Routes</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="routeId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine
            y={89.3368}
            label="Target (89.34)"
            stroke="red"
            strokeDasharray="5 5"
          />
          <Bar
            dataKey="ghgIntensity"
            fill="#2563eb"
            name="GHG Intensity"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareTab;
