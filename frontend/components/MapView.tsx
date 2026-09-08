"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface NearbyPrice {
  price: string;
  position: [number, number];
}

interface MapViewProps {
  location?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  /* Optional: show nearby fake price pins (used for a search/map view) */
  nearbyPrices?: NearbyPrice[];
}

const DEFAULT_CENTER: [number, number] = [28.5759, 77.32];

const createPriceIcon = (price: string) =>
  L.divIcon({
    className: "price-marker-wrapper",
    html: `<div class="price-marker">${price}</div>`,
    iconSize: [90, 40],
    iconAnchor: [45, 20],
  });

const createLocationIcon = (label: string) =>
  L.divIcon({
    className: "location-marker-wrapper",
    html: `
      <div class="location-marker">
        <span>●</span>
        <b>${label}</b>
      </div>
    `,
    iconSize: [90, 42],
    iconAnchor: [45, 21],
  });

/* =========================================
   ZOOM CONTROLS
   (needs access to the map instance, so it
   has to live inside <MapContainer />)
========================================= */

function ZoomControls() {
  const map = useMap();

  return (
    <div className="map-zoom-controls">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
      >
        +
      </button>

      <div />

      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
      >
        −
      </button>
    </div>
  );
}

export default function MapView({
  location = "Location",
  latitude,
  longitude,
  zoom = 13,
  nearbyPrices = [],
}: MapViewProps) {
  const center: [number, number] =
    latitude !== undefined && longitude !== undefined
      ? [latitude, longitude]
      : DEFAULT_CENTER;

  return (
    <div className="airbnb-map">

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="leaflet-map"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {nearbyPrices.map((item) => (
          <Marker
            key={item.price}
            position={item.position}
            icon={createPriceIcon(item.price)}
          />
        ))}

        <Marker
          position={center}
          icon={createLocationIcon(location)}
        >
          <Popup>{location}</Popup>
        </Marker>

        <ZoomControls />

      </MapContainer>

      {/* EXPAND */}
      <a
        className="map-expand-button"
        href={`https://www.openstreetmap.org/?mlat=${center[0]}&mlon=${center[1]}#map=${zoom}/${center[0]}/${center[1]}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open map in a new tab"
      >
        ↗
      </a>

    </div>
  );
}
