"use client";

import dynamic from "next/dynamic";
import type { Listing } from "@/lib/api";

interface ListingMapProps {
  listings: Listing[];
}

const MapView = dynamic(
  () => import("./MapView"),
  {
    ssr: false,
    loading: () => (
      <div className="airbnb-map">
        <div className="map-fallback">
          <span>🗺️</span>
          <strong>Loading map…</strong>
        </div>
      </div>
    ),
  }
);

export default function ListingMap({
  listings,
}: ListingMapProps) {
  const validListings = listings.filter(
    (listing) =>
      listing.latitude !== null &&
      listing.longitude !== null
  );

  const firstListing =
    validListings[0] ?? listings[0];

  const nearbyPrices = validListings.map(
    (listing) => ({
      price: `₹${listing.price_per_night}`,
      position: [
        listing.latitude!,
        listing.longitude!,
      ] as [number, number],
    })
  );

  return (
    <MapView
      location={
        firstListing?.location ?? "India"
      }
      latitude={
        firstListing?.latitude ?? undefined
      }
      longitude={
        firstListing?.longitude ?? undefined
      }
      zoom={12}
      nearbyPrices={nearbyPrices}
    />
  );
}