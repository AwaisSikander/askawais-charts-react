import React from "react";

export default function Legend({ items }: { items: { label: string }[] }) {
  return (
    <div className="flex gap-3 text-xs text-slate-600">
      {items.map((it, i) => (
        <div key={i} className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm ring-1 ring-slate-300" />
          {it.label}
        </div>
      ))}
    </div>
  );
}
