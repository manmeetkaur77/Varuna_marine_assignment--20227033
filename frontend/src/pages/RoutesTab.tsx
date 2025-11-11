import React, { useEffect, useState } from "react";

const RoutesTab: React.FC = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Backend URL (make sure backend is running on port 3000)
    fetch("http://localhost:3000/routes")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setRoutes(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Routes Data</h2>

      {routes.length === 0 ? (
        <p>No routes found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Route ID</th>
              <th className="p-2 border">Vessel Type</th>
              <th className="p-2 border">Fuel Type</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">GHG Intensity</th>
              <th className="p-2 border">Distance</th>
              <th className="p-2 border">Total Emissions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.routeId} className="border-t">
                <td className="p-2 border">{route.routeId}</td>
                <td className="p-2 border">{route.vesselType}</td>
                <td className="p-2 border">{route.fuelType}</td>
                <td className="p-2 border">{route.year}</td>
                <td className="p-2 border">{route.ghgIntensity}</td>
                <td className="p-2 border">{route.distance}</td>
                <td className="p-2 border">{route.totalEmissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoutesTab;
