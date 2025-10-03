/* eslint-disable @typescript-eslint/no-explicit-any */
export type EmissionPoint = {
  date: string;
  co2: number;
  p10: number;
  p90: number;
};
export const emissions: EmissionPoint[] = Array.from(
  { length: 180 },
  (_, i) => {
    const base = 50 + Math.sin(i / 10) * 8 + (Math.random() * 4 - 2);
    const p10 = base - 6 - Math.random() * 2;
    const p90 = base + 6 + Math.random() * 2;
    return {
      date: new Date(2025, 0, 1 + i).toISOString().slice(0, 10),
      co2: +(base + (Math.random() * 6 - 3)).toFixed(2),
      p10: +p10.toFixed(2),
      p90: +p90.toFixed(2),
    };
  }
);

export const deptSpend = [
  { dept: "Public Works", materials: 320, labor: 210, services: 140 },
  { dept: "Sanitation", materials: 180, labor: 260, services: 160 },
  { dept: "Parks", materials: 140, labor: 120, services: 90 },
  { dept: "Transit", materials: 380, labor: 300, services: 200 },
  { dept: "Health", materials: 160, labor: 280, services: 220 },
];

export const vendorQA = Array.from({ length: 64 }, (_, i) => ({
  vendor: "Vendor " + (i + 1),
  leadDays: Math.round(5 + Math.random() * 35),
  defectRate: +Math.max(
    0,
    Math.min(12, Math.random() * 7 + (Math.random() > 0.85 ? 8 : 0))
  ).toFixed(2),
}));

export const budget = [
  { name: "Infrastructure", size: 560, fill: "#1783ec" },
  { name: "Infrastructure/Roads", size: 260, fill: "#1783ec" },
  { name: "Infrastructure/Water", size: 180 },
  { name: "Infrastructure/Energy", size: 120 },
  { name: "Sanitation", size: 300 },
  { name: "Sanitation/Waste", size: 200 },
  { name: "Sanitation/Recycling", size: 100 },
  { name: "Parks", size: 180 },
  { name: "Transit", size: 420 },
  { name: "Transit/Buses", size: 240 },
  { name: "Transit/Metro", size: 180 },
];

export const districts = ["North", "South", "East", "West"];
export const pickupsByDistrict: Record<
  string,
  { week: number; tons: number }[]
> = Object.fromEntries(
  districts.map((d) => [
    d,
    Array.from({ length: 16 }, (_, i) => ({
      week: i + 1,
      tons: Math.round(60 + Math.sin(i / 2) * 10 + Math.random() * 8),
    })),
  ])
);

export type SankeyNode = { name: string };
export type SankeyLink = { source: number; target: number; value: number };

export const flowNodes: SankeyNode[] = [
  { name: "Vendors" },
  { name: "Warehouse" },
  { name: "City Stores" },
  { name: "Projects" },
];

export const flowLinks: SankeyLink[] = [
  { source: 0, target: 1, value: 600 },
  { source: 1, target: 2, value: 420 },
  { source: 2, target: 3, value: 290 },
];

export const geoDistricts: any = {
  type: "FeatureCollection",
  features: districts.map((d, idx) => ({
    type: "Feature",
    properties: { name: d, value: Math.round(40 + Math.random() * 60) },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [67 + idx * 0.4, 24.8],
          [67.2 + idx * 0.4, 25.0],
          [67.0 + idx * 0.4, 25.2],
          [66.8 + idx * 0.4, 25.0],
          [67 + idx * 0.4, 24.8],
        ],
      ],
    },
  })),
};
