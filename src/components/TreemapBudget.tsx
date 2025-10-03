/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { Treemap, ResponsiveContainer, Rectangle } from "recharts";

type Node = { name: string; size: number };

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
  "#38bdf8",
  "#fb923c",
  "#22c55e",
];
const hashStr = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const colorFor = (name: string) => COLORS[hashStr(name) % COLORS.length];

const CustomContent = React.memo(function CustomContent(props: any) {
  console.log("hi");

  const { depth, x, y, width, height, name, value } = props;
  const fill = colorFor(name);
  return (
    <g>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="#fff"
        fill={fill}
        fillOpacity={depth === 1 ? 0.9 : 0.75}
      />
      {width > 80 && height > 24 && (
        <text x={x + 6} y={y + 18} fontSize={12} fill="#0f172a">
          {name} ({value})
        </text>
      )}
    </g>
  );
});

export default function TreemapBudget({ data }: { data: Node[] }) {
  const series = useMemo(() => data, [data]);

  return (
    <div className="card card-pad">
      <div className="card-title mb-2">
        Budget Allocation Treemap (Custom Labels)
      </div>
      <div className="h-[340px]">
        <ResponsiveContainer debounce={200}>
          <Treemap
            data={series}
            dataKey="size"
            content={<CustomContent />}
            isAnimationActive={false}
          />
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-slate-500 mt-2">
        Use to surface disproportional allocations; click-through can drill to
        detail tables.
      </div>
    </div>
  );
}
