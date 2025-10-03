/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export type DonutDatum = { key: string; value: number; color?: string };

type Props = {
  data?: DonutDatum[];
  height?: number;
  title?: string;
};

const DEFAULTS: DonutDatum[] = [
  { key: "Infrastructure", value: 560, color: "#60a5fa" },
  { key: "Sanitation", value: 300, color: "#34d399" },
  { key: "Transit", value: 420, color: "#f59e0b" },
  { key: "Parks", value: 180, color: "#ef4444" },
  { key: "Health", value: 220, color: "#a78bfa" },
];

export default function DonutComplex({
  data = DEFAULTS,
  height = 340,
  title = "Budget Split",
}: Props) {
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => data.filter((d) => !muted[d.key]),
    [data, muted]
  );
  const total = useMemo(
    () => visible.reduce((s, d) => s + d.value, 0),
    [visible]
  );

  const onLegendClick = (o: any) => {
    const k: string = o?.value;
    setMuted((m) => ({ ...m, [k]: !m[k] }));
  };

  return (
    <div className="card card-pad">
      <div className="flex items-center justify-between mb-2">
        <div className="card-title">{title}</div>
        <div className="text-xs text-slate-500">Click legend to toggle</div>
      </div>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="key"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((d, i) => {
                const isMuted = !!muted[d.key];
                const isActive = activeIndex === i;
                const opacity = isMuted ? 0.15 : isActive ? 1 : 0.9;
                return (
                  <Cell
                    key={d.key}
                    fill={d.color || "#94a3b8"}
                    stroke="#fff"
                    strokeWidth={2}
                    fillOpacity={opacity}
                  />
                );
              })}
              <Label
                position="center"
                content={({ viewBox }) => {
                  if (
                    !viewBox ||
                    typeof viewBox.cx !== "number" ||
                    typeof viewBox.cy !== "number"
                  )
                    return null;
                  const cx = viewBox.cx,
                    cy = viewBox.cy;
                  const active = activeIndex != null ? data[activeIndex] : null;
                  const activePct = active
                    ? Math.round((active.value / total) * 100)
                    : null;
                  return (
                    <g>
                      <text
                        x={cx}
                        y={cy - 6}
                        textAnchor="middle"
                        fontSize={24}
                        fontWeight={700}
                        fill="#0f172a"
                      >
                        {total.toLocaleString()}
                      </text>
                      <text
                        x={cx}
                        y={cy + 14}
                        textAnchor="middle"
                        fontSize={12}
                        fill="#64748b"
                      >
                        {active ? `${active.key} • ${activePct}%` : "Total"}
                      </text>
                    </g>
                  );
                }}
              />
            </Pie>
            <Tooltip formatter={(v: any, n: any) => [v, n]} />
            <Legend
              onClick={onLegendClick}
              wrapperStyle={{ cursor: "pointer" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
