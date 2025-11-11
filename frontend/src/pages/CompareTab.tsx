import React from "react";
import { useCompare } from "../adapters/ui/useCompare";

function SimpleBar({ value, label }: { value: number; label: string }) {
  const height = Math.max(4, Math.min(200, Math.round(Math.abs(value) * 2)));
  return (
    <div className="flex flex-col items-center">
      <div style={{ height }} className="w-12 bg-sky-500 mb-1" />
      <div className="text-xs">{label}</div>
    </div>
  );
}

export default function CompareTab() {
  const { rows, loading } = useCompare();

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Compare (target 89.3368)</h3>
      {loading ? <div>Loading...</div> :
        <>
          <table className="w-full text-sm mb-4">
            <thead><tr className="text-left text-slate-700"><th>route</th><th>baseline</th><th>comparison</th><th>% diff</th><th>compliant</th></tr></thead>
            <tbody>
              {rows.map((r:any)=> {
                const percent = ((r.comparison / r.baseline) - 1) * 100;
                return <tr key={r.routeId} className="border-t"><td>{r.routeId}</td><td>{r.baseline}</td><td>{r.comparison}</td><td>{percent.toFixed(2)}%</td><td>{r.comparison <= r.baseline ? "✅":"❌"}</td></tr>;
              })}
            </tbody>
          </table>

          <div className="flex gap-4">
            {rows.map((r:any)=> <SimpleBar key={r.routeId} value={r.comparison} label={r.routeId} />)}
          </div>
        </>
      }
    </div>
  );
}
