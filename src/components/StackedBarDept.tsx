import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Row = { dept: string; materials: number; labor: number; services: number };

type P = { data: Row[]; height?: number };

export default function StackedBarDept({ data, height = 320 }: P) {
  const [asPct, setAsPct] = useState(false);
  const normalized = useMemo(
    () =>
      asPct
        ? data.map((r) => {
            const total = r.materials + r.labor + r.services;
            return {
              ...r,
              materials: +((r.materials / total) * 100).toFixed(2),
              labor: +((r.labor / total) * 100).toFixed(2),
              services: +((r.services / total) * 100).toFixed(2),
            };
          })
        : data,
    [data, asPct]
  );

  return (
    <div className="card card-pad">
      <div className="flex items-center justify-between mb-2">
        <div className="card-title">
          Department Spend ({asPct ? "100% Stacked" : "Stacked"})
        </div>
        <label className="text-xs inline-flex items-center gap-2 cursor-pointer select-none">
          <span>Show %</span>
          <input
            type="checkbox"
            checked={asPct}
            onChange={(e) => setAsPct(e.target.checked)}
          />
        </label>
      </div>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer>
          <BarChart
            data={normalized}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept" />
            <YAxis domain={asPct ? [0, 100] : ["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="materials" stackId="a" fill="#60a5fa" />
            <Bar dataKey="labor" stackId="a" fill="#34d399" />
            <Bar dataKey="services" stackId="a" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
