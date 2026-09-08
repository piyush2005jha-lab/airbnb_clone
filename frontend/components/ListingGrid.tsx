import ListingCard from "./ListingCard";

import type { Listing } from "@/lib/api";

interface ListingGridProps {
  listings: Listing[];
}

export default function ListingGrid({
  listings,
}: ListingGridProps) {

  if (listings.length === 0) {
    return (
      <div className="empty-state">
        <h2>No homes found</h2>
        <p>
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <section className="listing-grid">

      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
        />
      ))}

    </section>
  );
}