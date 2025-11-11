import React, { useState } from "react";
import { usePooling } from "../adapters/ui/usePooling";

export default function PoolingTab() {
  const [year, setYear] = useState<number | "">("");
  const [shipId, setShipId] = useState("");
  const [cbBefore, setCbBefore] = useState<number | "">("");
  const [members, setMembers] = useState<{ shipId: string; cbBefore: number }[]>([]);
  const { result, create } = usePooling();
  const [msg, setMsg] = useState("");

  const addMember = () => {
    if (!shipId || cbBefore === "") return;
    setMembers(m=>[...m, { shipId, cbBefore: Number(cbBefore) }]);
    setShipId(""); setCbBefore("");
  };

  const doCreate = async () => {
    try {
      if (!year || members.length === 0) { setMsg("add year & members"); return; }
      await create({ year: Number(year), members });
      setMsg("Pool created");
    } catch (e:any) { setMsg(e?.message || "error"); }
  };

  const poolSum = members.reduce((s,m)=>s+m.cbBefore,0);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Pooling (Article 21)</h3>

      <div className="flex gap-2 items-end mb-4">
        <input placeholder="year" value={year as any} onChange={e=>setYear(e.target.value as any)} className="border p-2 rounded w-28"/>
        <input placeholder="shipId" value={shipId} onChange={e=>setShipId(e.target.value)} className="border p-2 rounded"/>
        <input placeholder="cbBefore" value={cbBefore as any} onChange={e=>setCbBefore(e.target.value as any)} className="border p-2 rounded w-32"/>
        <button onClick={addMember} className="bg-slate-100 px-3 py-1 rounded">Add</button>
        <button onClick={doCreate} className="ml-auto bg-sky-600 text-white px-3 py-1 rounded" disabled={poolSum < 0}>Create Pool</button>
      </div>

      <div>Pool sum: <span className={poolSum>=0 ? "text-green-600":"text-red-600"}>{poolSum}</span></div>

      <ul className="mt-3 space-y-2">
        {members.map((m,i)=> <li key={i} className="border p-2 rounded">{m.shipId} — {m.cbBefore}</li>)}
      </ul>

      {result && <pre className="mt-3 text-xs bg-slate-50 p-3 rounded">{JSON.stringify(result,null,2)}</pre>}
      {msg && <div className="mt-2 text-sm">{msg}</div>}
    </div>
  );
}
