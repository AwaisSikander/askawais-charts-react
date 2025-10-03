import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ReferenceLine,
} from "recharts";

type Row = { label: string; a: number; b: number; c: number };

type Props = { data?: Row[]; height?: number; title?: string };

const DEFAULTS: Row[] = Array.from({ length: 24 }, (_, i) => ({
  label: `W${i + 1}`,
  a: Math.round(40 + Math.sin(i / 2) * 12 + Math.random() * 6),
  b: Math.round(30 + Math.cos(i / 3) * 10 + Math.random() * 5),
  c: Math.round(20 + Math.sin(i / 5) * 6 + Math.random() * 4),
}));

export default function AreaInteractive({
  data = DEFAULTS,
  height = 340,
  title = "Components vs Total (Interactive)",
}: Props) {
  const [show, setShow] = useState<{ a: boolean; b: boolean; c: boolean }>({
    a: true,
    b: true,
    c: true,
  });
  const [mode, setMode] = useState<"stack" | "percent" | "separate">("stack");
  const [showTotal, setShowTotal] = useState(true);

  const series = useMemo(() => {
    const rows = data.map((d) => ({
      ...d,
      total: d.a + d.b + d.c,
    }));

    if (mode === "percent") {
      return rows.map((r) => {
        const t = r.total || 1;
        return {
          ...r,
          a: (r.a / t) * 100,
          b: (r.b / t) * 100,
          c: (r.c / t) * 100,
          total: 100,
        };
      });
    }
    return rows;
  }, [data, mode]);

  const opacityFor = (on: boolean) => (on ? 0.9 : 0.08);

  return (
    <div className="card card-pad">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="card-title">{title}</div>
        <div className="flex items-center gap-2 text-xs">
          <div className="inline-flex rounded-lg overflow-hidden ring-1 ring-slate-200">
            {(["stack", "percent", "separate"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 py-1 ${
                  mode === m ? "bg-slate-900 text-white" : "bg-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-1">
            <input
              type="checkbox"
              checked={showTotal}
              onChange={(e) => setShowTotal(e.target.checked)}
            />
            Total
          </label>
          <div className="inline-flex items-center gap-2">
            <button
              className={`text-[11px] ${show.a ? "" : "opacity-40"}`}
              onClick={() => setShow((s) => ({ ...s, a: !s.a }))}
            >
              A
            </button>
            <button
              className={`text-[11px] ${show.b ? "" : "opacity-40"}`}
              onClick={() => setShow((s) => ({ ...s, b: !s.b }))}
            >
              B
            </button>
            <button
              className={`text-[11px] ${show.c ? "" : "opacity-40"}`}
              onClick={() => setShow((s) => ({ ...s, c: !s.c }))}
            >
              C
            </button>
          </div>
        </div>
      </div>

      <div style={{ height }} className="w-full">
        <ResponsiveContainer>
          <AreaChart
            data={series}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <defs>
              <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="gb" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="gc" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis domain={mode === "percent" ? [0, 100] : ["auto", "auto"]} />
            <Tooltip />
            <Legend />

            {/* Mode control */}
            {mode !== "separate" ? (
              <>
                {show.a && (
                  <Area
                    type="monotone"
                    dataKey="a"
                    stackId="s"
                    stroke="#2563eb"
                    fill="url(#ga)"
                    fillOpacity={opacityFor(show.a)}
                  />
                )}
                {show.b && (
                  <Area
                    type="monotone"
                    dataKey="b"
                    stackId="s"
                    stroke="#059669"
                    fill="url(#gb)"
                    fillOpacity={opacityFor(show.b)}
                  />
                )}
                {show.c && (
                  <Area
                    type="monotone"
                    dataKey="c"
                    stackId="s"
                    stroke="#b45309"
                    fill="url(#gc)"
                    fillOpacity={opacityFor(show.c)}
                  />
                )}
              </>
            ) : (
              <>
                {show.a && (
                  <Area
                    type="monotone"
                    dataKey="a"
                    stroke="#2563eb"
                    fill="url(#ga)"
                    fillOpacity={opacityFor(show.a)}
                  />
                )}
                {show.b && (
                  <Area
                    type="monotone"
                    dataKey="b"
                    stroke="#059669"
                    fill="url(#gb)"
                    fillOpacity={opacityFor(show.b)}
                  />
                )}
                {show.c && (
                  <Area
                    type="monotone"
                    dataKey="c"
                    stroke="#b45309"
                    fill="url(#gc)"
                    fillOpacity={opacityFor(show.c)}
                  />
                )}
              </>
            )}

            {showTotal && (
              <Line
                type="monotone"
                dataKey="total"
                stroke="#0f172a"
                strokeDasharray="4 4"
                dot={false}
              />
            )}
            {mode === "percent" && <ReferenceLine y={100} stroke="#cbd5e1" />}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
