import React from "react";

type Props = { label: string; value: string | number; delta?: number };
export default function KpiCard({ label, value, delta }: Props) {
  const pos = (delta ?? 0) >= 0;
  return (
    <div className="card card-pad">
      <div className="flex items-start justify-between">
        <div>
          <div className="card-title">{label}</div>
          <div className="card-value mt-1">{value}</div>
        </div>
        {delta !== undefined && (
          <span
            className={`badge ${
              pos ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {pos ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        )}
      </div>
    </div>
  );
}
