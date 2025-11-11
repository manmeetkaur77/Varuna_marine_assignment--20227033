import React, { useEffect, useState } from "react";
import { API } from "../adapters/infrastructure/apiClient";
import "../pages/routes.css";

const RoutesTab: React.FC = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    vesselType: "",
    fuelType: "",
    year: "",
  });

  useEffect(() => {
    API.getRoutes()
      .then((data) => setRoutes(data))
      .catch((err) => console.error("Error fetching routes:", err));
  }, []);

  const handleSetBaseline = async (routeId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/routes/${routeId}/baseline`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to set baseline");
      alert(`✅ Baseline set for Route ${routeId}`);
      const updated = await API.getRoutes();
      setRoutes(updated);
    } catch (err) {
      console.error(err);
      alert("Error setting baseline");
    }
  };

  const filteredRoutes = routes.filter((r) => {
    return (
      (!filters.vesselType || r.vesselType === filters.vesselType) &&
      (!filters.fuelType || r.fuelType === filters.fuelType) &&
      (!filters.year || r.year.toString() === filters.year)
    );
  });

  return (
    <div className="routes-container">
      <h2>📊 Routes Overview</h2>

      {/* Filters */}
      <div className="filters">
        <select
          value={filters.vesselType}
          onChange={(e) =>
            setFilters({ ...filters, vesselType: e.target.value })
          }
        >
          <option value="">All Vessel Types</option>
          {[...new Set(routes.map((r) => r.vesselType))].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <select
          value={filters.fuelType}
          onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
        >
          <option value="">All Fuel Types</option>
          {[...new Set(routes.map((r) => r.fuelType))].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <option value="">All Years</option>
          {[...new Set(routes.map((r) => r.year))].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="routes-table">
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Vessel Type</th>
            <th>Fuel Type</th>
            <th>Year</th>
            <th>GHG Intensity</th>
            <th>Fuel Consumption (t)</th>
            <th>Distance (km)</th>
            <th>Total Emissions (t)</th>
            <th>Baseline</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoutes.map((route) => (
            <tr
              key={route.routeId}
              className={route.isBaseline ? "baseline-row" : ""}
            >
              <td>{route.routeId}</td>
              <td>{route.vesselType}</td>
              <td>{route.fuelType}</td>
              <td>{route.year}</td>
              <td>{route.ghgIntensity}</td>
              <td>{route.fuelConsumption}</td>
              <td>{route.distance}</td>
              <td>{route.totalEmissions}</td>
              <td>
                {route.isBaseline ? (
                  "✅ Baseline"
                ) : (
                  <button
                    className="baseline-btn"
                    onClick={() => handleSetBaseline(route.routeId)}
                  >
                    Set Baseline
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesTab;