"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Listing } from "@/lib/api";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({
  listing,
}: ListingCardProps) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);

  const image = listing.images?.[0]?.image_url;

  const openListing = () => {
    console.log(
      "CLICKED LISTING:",
      listing.id,
      listing.title
    );

    // Never allow fake/generated IDs
    if (
      !listing.id ||
      !Number.isInteger(Number(listing.id))
    ) {
      console.error(
        "Invalid listing:",
        listing
      );
      return;
    }

    router.push(
      `/listings/${Number(listing.id)}`
    );
  };

  return (
    <article
      className="listing-card"
      onClick={openListing}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          openListing();
        }
      }}
    >
      <div className="listing-image-wrapper">

        {image ? (
          <img
            src={image}
            alt={listing.title}
            className="listing-image"
          />
        ) : (
          <div className="image-placeholder">
            🏠
          </div>
        )}

        <button
          type="button"
          className={`favorite-button ${
            favorite ? "favorited" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            setFavorite(
              (current) => !current
            );
          }}
          aria-label="Favorite"
        >
          {favorite ? "♥" : "♡"}
        </button>

        <div className="image-dots">
          <span className="active-dot" />
          <span />
          <span />
          <span />
          <span />
        </div>

      </div>

      <div className="listing-info">

        <div className="listing-title-row">

          <h3>
            {listing.location}
          </h3>

          <div className="rating">
            ★{" "}
            {listing.rating
              ? listing.rating.toFixed(2)
              : "New"}
          </div>

        </div>

        <p className="listing-title">
          {listing.title}
        </p>

        <p className="listing-property">
          {listing.property_type}
        </p>

        <p className="listing-price">

          <strong>
            ₹
            {listing.price_per_night.toLocaleString(
              "en-IN"
            )}
          </strong>

          <span>
            night
          </span>

        </p>

      </div>
    </article>
  );
}