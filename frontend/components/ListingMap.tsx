"use client";

import dynamic from "next/dynamic";

/*
  Leaflet touches `window`, so it can only run in the browser.
  This client component is the boundary that makes `ssr: false`
  legal (Server Components can render this file directly, they
  just can't call `dynamic(..., { ssr: false })` themselves).
*/
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="airbnb-map">
      <div className="map-fallback">
        <span>🗺️</span>
        <strong>Loading map…</strong>
      </div>
    </div>
  ),
});

interface ListingMapProps {
  location: string;
  latitude?: number | null;
  longitude?: number | null;
}

export default function ListingMap({
  location,
  latitude,
  longitude,
}: ListingMapProps) {
  return (
    <MapView
      location={location}
      latitude={latitude ?? undefined}
      longitude={longitude ?? undefined}
      zoom={14}
    />
  );
}
