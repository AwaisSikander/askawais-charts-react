import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  ReferenceArea,
  Line,
} from "recharts";

type Row = {
  vendor: string;
  leadDays: number | string;
  defectRate: number | string;
};
type P = { data: Row[]; height?: number };

function regression(points: { x: number; y: number }[]) {
  const n = points.length;
  const sx = points.reduce((s, p) => s + p.x, 0);
  const sy = points.reduce((s, p) => s + p.y, 0);
  const sxx = points.reduce((s, p) => s + p.x * p.x, 0);
  const sxy = points.reduce((s, p) => s + p.x * p.y, 0);
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept };
}

export default function ScatterAnomaly({ data, height = 320 }: P) {
  const series = useMemo(() => {
    const rows = (data ?? [])
      .map((d) => ({
        ...d,
        leadDays: Number(d.leadDays),
        defectRate: Number(d.defectRate),
      }))
      .filter(
        (d) => Number.isFinite(d.leadDays) && Number.isFinite(d.defectRate)
      );
    return rows;
  }, [data]);

  const pts = useMemo(
    () => series.map((d) => ({ x: d.leadDays, y: d.defectRate })),
    [series]
  );
  const { slope, intercept } = useMemo(() => regression(pts), [pts]);
  const xMin = pts.length ? Math.min(...pts.map((p) => p.x)) : 0;
  const xMax = pts.length ? Math.max(...pts.map((p) => p.x)) : 1;
  const regLine = useMemo(
    () => [
      { x: xMin, y: slope * xMin + intercept },
      { x: xMax, y: slope * xMax + intercept },
    ],
    [xMin, xMax, slope, intercept]
  );

  const acceptable = { x1: 0, x2: 20, y1: 0, y2: 4 };

  return (
    <div className="card card-pad">
      <div className="card-title mb-2">
        Vendor QA — Lead Time vs Defect Rate (Regression + Band)
      </div>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer>
          <ScatterChart margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="leadDays"
              name="Lead Time (days)"
              domain={["dataMin", "dataMax"]}
            />
            <YAxis
              type="number"
              dataKey="defectRate"
              name="Defect %"
              domain={["auto", "auto"]}
            />
            <ZAxis range={[60, 160]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <ReferenceArea
              x1={acceptable.x1}
              x2={acceptable.x2}
              y1={acceptable.y1}
              y2={acceptable.y2}
              fill="#22c55e"
              fillOpacity={0.12}
            />
            <Scatter
              data={series}
              name="Vendors"
              fill="#0ea5e9"
              stroke="#0369a1"
            />
            <Line
              type="linear"
              data={regLine}
              dataKey="y"
              dot={false}
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="4 2"
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
