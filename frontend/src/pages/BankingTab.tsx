import React, { useState } from "react";
import { useBanking } from "../adapters/ui/useBanking";

export default function BankingTab() {
  const [shipId, setShipId] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const { records, bank, fetchRecords } = useBanking();
  const [msg, setMsg] = useState("");

  const doBank = async () => {
    try {
      if (!shipId || !year || !amount) { setMsg("provide shipId, year, amount"); return; }
      await bank({ shipId, year: Number(year), amount: Number(amount) });
      setMsg("Banked");
      await fetchRecords(shipId, Number(year));
    } catch (e:any) { setMsg(e?.message || "error"); }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Banking (Article 20)</h3>
      <div className="flex gap-2 items-end">
        <input placeholder="shipId" value={shipId} onChange={e=>setShipId(e.target.value)} className="border p-2 rounded"/>
        <input placeholder="year" value={year as any} onChange={e=>setYear(e.target.value as any)} className="border p-2 rounded w-24"/>
        <input placeholder="amount (gCO2eq)" value={amount as any} onChange={e=>setAmount(e.target.value as any)} className="border p-2 rounded w-40"/>
        <button onClick={doBank} className="ml-auto bg-sky-600 text-white px-3 py-1 rounded">Bank</button>
      </div>

      {msg && <div className="mt-2 text-sm">{msg}</div>}

      <div className="mt-4">
        <h4 className="font-medium">Records</h4>
        <ul className="mt-2">
          {records.map((r:any)=> <li key={r.id} className="text-sm border p-2 rounded mb-2">{r.shipId} — {r.year} — {r.amountGco2eq ?? r.cbBalance ?? r.amount}</li>)}
        </ul>
      </div>
    </div>
  );
}
