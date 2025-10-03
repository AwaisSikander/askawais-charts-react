import React from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

type Node = { name: string };

type Link = { source: number; target: number; value: number };

export default function SankeyFlow({
  nodes,
  links,
}: {
  nodes: Node[];
  links: Link[];
}) {
  return (
    <div className="card card-pad">
      <div className="card-title mb-2">Supply Chain Flow (Sankey)</div>
      <div className="h-[340px]">
        <ResponsiveContainer>
          <Sankey
            data={{
              nodes: nodes.map((n, i) => ({ ...n, key: `${i}-${n.name}` })),
              links: links,
            }}
            nodePadding={18}
            nodeWidth={12}
            linkCurvature={0.5}
            iterations={32}
          >
            <Tooltip />
          </Sankey>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
