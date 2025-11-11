import React, { useEffect, useState } from "react";
import "../pages/banking.css";

const API_BASE = "http://localhost:3000/api";

const BankingTab: React.FC = () => {
  const [shipId, setShipId] = useState("SHIP123");
  const [year, setYear] = useState(2025);
  const [cb, setCb] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [deficit, setDeficit] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🧾 Fetch compliance balance
  const fetchCB = async () => {
    try {
      const res = await fetch(`${API_BASE}/compliance/cb?year=${year}`);
      const data = await res.json();
      setCb(data.cbGco2eq ?? null);
    } catch (err) {
      console.error("Error fetching CB:", err);
    }
  };

  // 🏦 Fetch banking records
  const fetchRecords = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/banking/records?shipId=${shipId}&year=${year}`
      );
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Error fetching bank records:", err);
    }
  };

  useEffect(() => {
    fetchCB();
    fetchRecords();
  }, [year]);

  // 💰 Bank surplus
  const handleBank = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/banking/bank`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipId, year, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Successfully banked surplus!");
        await fetchRecords();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to bank surplus");
    } finally {
      setLoading(false);
    }
  };

  // ⚖️ Apply banked CB
  const handleApply = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/banking/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipId, year, deficit }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          `✅ Applied ${data.applied} gCO₂eq. Remaining: ${data.cb_after}`
        );
        await fetchRecords();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to apply banked CB");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="banking-container">
      <h2>🏦 FuelEU Banking Dashboard</h2>

      <div className="banking-form">
        <label>Ship ID:</label>
        <input value={shipId} onChange={(e) => setShipId(e.target.value)} />

        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      <div
        className="cb-info"
        style={{
          backgroundColor:
            cb === null
              ? "#f1f5f9"
              : cb > 0
              ? "#dcfce7"
              : cb === 0
              ? "#fee2e2"
              : "#fef9c3",
        }}
      >
        <p>
          <strong>Compliance Balance (CB): </strong>
          {cb !== null ? `${cb} gCO₂eq` : "Not available"}
        </p>
      </div>

      <div className="actions">
        <div>
          <h4>💰 Bank Surplus</h4>
          <input
            type="number"
            placeholder="Amount (gCO₂eq)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleBank}
            disabled={loading || !amount || (cb !== null && cb <= 0)}
          >
            {loading ? "Processing..." : "Bank"}
          </button>
        </div>

        <div>
          <h4>⚖️ Apply Banked CB</h4>
          <input
            type="number"
            placeholder="Deficit (gCO₂eq)"
            value={deficit}
            onChange={(e) => setDeficit(e.target.value)}
          />
          <button onClick={handleApply} disabled={loading || !deficit}>
            {loading ? "Processing..." : "Apply"}
          </button>
        </div>
      </div>

      {message && <p className="message">{message}</p>}

      <h3>
        📜 Banked Records{" "}
        <span style={{ color: "#2563eb" }}>({records.length})</span>
      </h3>

      <table className="records-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ship ID</th>
            <th>Year</th>
            <th>Amount (gCO₂eq)</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#64748b" }}>
                No records found.
              </td>
            </tr>
          ) : (
            records.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.shipId}</td>
                <td>{r.year}</td>
                <td>{r.amountGco2eq}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BankingTab;
