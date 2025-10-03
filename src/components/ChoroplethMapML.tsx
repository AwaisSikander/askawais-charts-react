/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Map, {
  Source,
  Layer,
  type MapLayerMouseEvent,
} from "react-map-gl/maplibre";

const STYLE_URL = "https://demotiles.maplibre.org/style.json";

type Props = { geo: any };

type Hover = { name: string; value: number } | null;

const fillPaint: any = {
  "fill-color": [
    "interpolate",
    ["linear"],
    ["get", "value"],
    0,
    "hsl(220, 90%, 90%)",
    50,
    "hsl(220, 90%, 70%)",
    100,
    "hsl(220, 90%, 50%)",
  ],
  "fill-opacity": 0.75,
};
const linePaint: any = { "line-color": "#ffffff", "line-width": 1 };

export default function ChoroplethMapML({ geo }: Props) {
  const [hover, setHover] = React.useState<Hover>(null);
  const initial = { longitude: 67.5, latitude: 25.0, zoom: 8 };

  const onMouseMove = (e: MapLayerMouseEvent) => {
    const f: any = e.features?.[0];
    if (f) setHover({ name: f.properties?.name, value: f.properties?.value });
  };
  const onMouseLeave = () => setHover(null);

  return (
    <div className="card card-pad">
      <div className="card-title mb-2">
        District Performance (Choropleth · Vector)
      </div>
      <div className="h-[360px] overflow-hidden rounded-xl">
        <Map
          initialViewState={initial}
          mapStyle={STYLE_URL}
          interactiveLayerIds={["district-fill"]}
          style={{ width: "100%", height: "100%" }}
        >
          <Source id="districts" type="geojson" data={geo}>
            <Layer
              id="district-fill"
              type="fill"
              paint={fillPaint}
              onMousemove={onMouseMove}
              onMouseleave={onMouseLeave}
            />
            <Layer id="district-line" type="line" paint={linePaint} />
          </Source>
        </Map>
      </div>
      {hover && (
        <div className="mt-2 text-xs text-slate-600">
          {hover.name}: {hover.value}
        </div>
      )}
    </div>
  );
}
