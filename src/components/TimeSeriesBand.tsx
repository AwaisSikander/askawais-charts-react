/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  ReferenceLine,
  Brush,
} from "recharts";
import { timeParse, timeFormat } from "d3-time-format";

type P = {
  data: { date: string; co2: number; p10: number; p90: number }[];
  height?: number;
};
const parse = timeParse("%Y-%m-%d");
const fmt = timeFormat("%b %d");

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  const dev = (d.co2 - (d.p10 + d.p90) / 2).toFixed(2);
  const band = d.range.toFixed(2);
  return (
    <div className="rounded-md bg-white p-2 text-xs ring-1 ring-slate-200">
      <div className="font-medium">{fmt(d.d as Date)}</div>
      <div>
        CO₂: <strong>{d.co2}</strong>
      </div>
      <div>
        Band: {d.p10}–{d.p90} (Δ {band})
      </div>
      <div>Deviation: {dev}</div>
    </div>
  );
}

export default function TimeSeriesBand({ data, height = 320 }: P) {
  const [threshold] = useState<number>(65);

  const series = useMemo(
    () =>
      (data ?? []).map((d) => ({
        ...d,
        d: parse(d.date),
        range: d.p90 - d.p10,
      })),
    [data]
  );

  return (
    <div className="card card-pad">
      <div className="card-title mb-2">
        Daily CO₂ vs Expected Band (Brush + Threshold)
      </div>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer>
          <AreaChart
            data={series}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <defs>
              <linearGradient id="band" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="d"
              tickFormatter={(v) => fmt(v as Date)}
              minTickGap={24}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="p10"
              stackId="band"
              stroke="#34d399"
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="range"
              stackId="band"
              strokeOpacity={0}
              fill="url(#band)"
            />

            <Line
              type="monotone"
              dataKey="co2"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />

            <ReferenceLine
              y={threshold}
              stroke="#ef4444"
              strokeDasharray="4 4"
            />
            <Brush
              dataKey="d"
              height={24}
              travellerWidth={8}
              tickFormatter={(v) => fmt(v as Date)}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
