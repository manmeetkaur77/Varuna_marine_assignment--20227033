import { useEffect, useState } from "react";

function App() {
  const [hello, setHello] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    // ✅ Test backend connection
    fetch("http://localhost:3000/hello")
      .then((res) => res.text())
      .then(setHello)
      .catch((err) => console.error("Hello fetch error:", err));

    // ✅ Fetch routes data
    fetch("http://localhost:3000/routes")
      .then((res) => res.json())
      .then(setRoutes)
      .catch((err) => console.error("Routes fetch error:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Fuel EU Dashboard Test</h1>
      <p className="text-lg mb-4">{hello || "Connecting to backend..."}</p>

      <h2 className="font-semibold text-xl mb-2">Routes Data:</h2>
      {routes.length === 0 ? (
        <p>Loading routes...</p>
      ) : (
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border p-2">Route ID</th>
              <th className="border p-2">Vessel Type</th>
              <th className="border p-2">Fuel Type</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">GHG Intensity</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.routeId}>
                <td className="border p-2">{r.routeId}</td>
                <td className="border p-2">{r.vesselType}</td>
                <td className="border p-2">{r.fuelType}</td>
                <td className="border p-2">{r.year}</td>
                <td className="border p-2">{r.ghgIntensity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
