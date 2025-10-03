import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

type Series = { week: number; tons: number }[];
export default function SmallMultiples({
  series,
}: {
  series: Record<string, Series>;
}) {
  const names = Object.keys(series);
  return (
    <div className="card card-pad">
      <div className="card-title mb-3">
        District Pickups (Small Multiples + Sparkline)
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {names.map((name) => {
          const s = series[name];
          const avg = (
            s.reduce((acc, v) => acc + v.tons, 0) / s.length
          ).toFixed(1);
          const trend = Math.sign(s[s.length - 1].tons - s[0].tons);
          return (
            <div
              key={name}
              className="bg-slate-50 rounded-xl p-3 ring-1 ring-slate-200"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium text-slate-600">{name}</div>
                <div
                  className={`text-[11px] ${
                    trend > 0
                      ? "text-green-600"
                      : trend < 0
                      ? "text-red-600"
                      : "text-slate-500"
                  }`}
                >
                  {trend > 0 ? "▲" : trend < 0 ? "▼" : "–"}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mb-1">
                Avg {avg} tons
              </div>
              <div className="h-[120px]">
                <ResponsiveContainer>
                  <LineChart
                    data={s}
                    margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
                  >
                    <XAxis hide dataKey="week" />
                    <YAxis hide />
                    <Line
                      type="monotone"
                      dataKey="tons"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
