/* eslint-disable @typescript-eslint/no-explicit-any */
import KpiCard from "./components/KpiCard";
import TimeSeriesBand from "./components/TimeSeriesBand";
import StackedBarDept from "./components/StackedBarDept";
import ScatterAnomaly from "./components/ScatterAnomaly";
import TreemapBudget from "./components/TreemapBudget";
import SankeyFlow from "./components/SankeyFlow";
import SmallMultiples from "./components/SmallMultiples";
import ChoroplethMapML from "./components/ChoroplethMapML";
import DonutComplex from "./components/DonutComplex";
import AreaInteractive from "./components/AreaInteractive";
import {
  emissions,
  deptSpend,
  vendorQA,
  budget,
  flowNodes,
  flowLinks,
  pickupsByDistrict,
  geoDistricts,
} from "./data/mock";

// Make the geo prop optional, defaulting to our mock geoDistricts so <App /> works without props
export type Props = { geo?: any };

export default function App({ geo = geoDistricts }: Props) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-lg font-bold">
            Cloudsyte · Data Visualization Demo By Awais Sikander (askawais.com)
          </div>
          <div className="text-sm text-slate-600">
            React · TypeScript · Tailwind · Recharts · MapLibre GL
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard label="On-time Deliveries" value="92.4%" delta={+1.6} />
          <KpiCard label="Avg Lead Time" value="12.8 days" delta={-0.9} />
          <KpiCard label="CO₂ per Order" value="51.2 kg" delta={-3.1} />
          <KpiCard label="Active Vendors" value={48} />
        </section>

        <section>
          <TimeSeriesBand data={emissions} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StackedBarDept data={deptSpend} />
          <ScatterAnomaly data={vendorQA} />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutComplex title="Opex Split (YTD)" />
          <AreaInteractive title="Weekly Spend · Components vs Total" />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TreemapBudget data={budget} />
          <SankeyFlow nodes={flowNodes} links={flowLinks} />
        </section>

        <section>
          <SmallMultiples series={pickupsByDistrict} />
        </section>

        <section>
          <ChoroplethMapML geo={geo} />
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          Demo for evaluation. Replace mock data with Cloudsyte APIs to go live.
        </footer>
      </main>
    </div>
  );
}
