"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListings, type Listing } from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function ListingPage() {
  const params = useParams();
  const router = useRouter();

  const rawId = params?.id;

  const id = Number(
    Array.isArray(rawId) ? rawId[0] : rawId
  );

  const [listing, setListing] =
    useState<Listing | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState(2);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    async function load() {
      try {
        console.log(
          "Looking for listing ID:",
          id
        );

        const listings =
          await getListings();

        console.log(
          "All listings:",
          listings
        );

        const found =
          listings.find(
            (item) =>
              Number(item.id) === id
          );

        console.log(
          "Found listing:",
          found
        );

        if (!found) {
          throw new Error(
            `Listing ${id} not found`
          );
        }

        setListing(found);
      } catch (error) {
        console.error(
          "Failed to load listing:",
          error
        );

        setListing(null);
      } finally {
        setLoading(false);
      }
    }

    if (
      Number.isInteger(id) &&
      id > 0
    ) {
      load();
    } else {
      setLoading(false);
    }
  }, [id]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start =
      new Date(checkIn);

    const end =
      new Date(checkOut);

    const difference =
      end.getTime() -
      start.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )
    );
  }, [checkIn, checkOut]);

  const subtotal =
    listing && nights > 0
      ? listing.price_per_night *
        nights
      : 0;

  const cleaningFee =
    nights > 0 ? 500 : 0;

  const serviceFee =
    subtotal * 0.12;

  const total =
    subtotal +
    cleaningFee +
    serviceFee;

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  function reserve() {
    if (!checkIn) {
      alert(
        "Please select check-in date."
      );
      return;
    }

    if (!checkOut) {
      alert(
        "Please select check-out date."
      );
      return;
    }

    if (nights <= 0) {
      alert(
        "Check-out date must be after check-in date."
      );
      return;
    }

    router.push(
      `/checkout?listingId=${listing?.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="listing-loading">
          <div className="loading-spinner" />

          <p>
            Loading property...
          </p>
        </div>
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Navbar />

        <div className="listing-error">

          <h1>
            Property not found
          </h1>

          <p>
            This property is no longer available.
          </p>

          <button
            onClick={() =>
              router.push("/")
            }
          >
            Back to homes
          </button>

        </div>
      </>
    );
  }

  const images =
    listing.images || [];

  return (
    <main className="listing-page">

      <Navbar />

      <div className="listing-container">

        {/* TOP */}

        <div className="listing-topbar">

          <h1>
            {listing.title}
          </h1>

          <div className="listing-actions">

            <button>
              ↗ Share
            </button>

            <button
              onClick={() =>
                setSaved(!saved)
              }
            >
              {saved
                ? "♥ Saved"
                : "♡ Save"}
            </button>

          </div>

        </div>

        {/* PHOTOS */}

        <section className="listing-gallery">

          <div className="gallery-main">

            {images[0] ? (
              <img
                src={
                  images[0].image_url
                }
                alt={
                  listing.title
                }
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                alt="Property"
              />
            )}

          </div>

          <div className="gallery-right">

            {images
              .slice(1, 5)
              .map((image) => (
                <div
                  className="gallery-small"
                  key={image.id}
                >
                  <img
                    src={
                      image.image_url
                    }
                    alt={
                      listing.title
                    }
                  />
                </div>
              ))}

            {images.length > 4 && (
              <button className="show-photos">
                ▦ Show all photos
              </button>
            )}

          </div>

        </section>

        {/* BODY */}

        <div className="listing-layout">

          {/* LEFT */}

          <div className="listing-left">

            {/* INTRO */}

            <section className="listing-intro">

              <h2>
                Entire rental unit in{" "}
                {listing.location}
              </h2>

              <p>
                {guests} guests · 1 bedroom ·
                1 bed · 1 bathroom
              </p>

              <strong>
                ★{" "}
                {listing.rating
                  ? listing.rating.toFixed(
                      2
                    )
                  : "New"}
              </strong>

            </section>

            {/* HOST */}

            <section className="host-section">

              <div className="host-avatar">

                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                  alt="Host"
                />

              </div>

              <div>

                <strong>
                  Hosted by{" "}
                  {listing.host.name}
                </strong>

                <span>
                  Superhost · 4 months hosting
                </span>

              </div>

            </section>

            {/* FEATURES */}

            <section className="stay-features">

              <div className="feature-row">

                <span className="feature-icon">
                  🐾
                </span>

                <div>

                  <strong>
                    Furry friends welcome
                  </strong>

                  <p>
                    Bring your pets along for
                    the stay.
                  </p>

                </div>

              </div>

              <div className="feature-row">

                <span className="feature-icon">
                  🚪
                </span>

                <div>

                  <strong>
                    Self check-in
                  </strong>

                  <p>
                    Check yourself in with
                    the lockbox.
                  </p>

                </div>

              </div>

              <div className="feature-row">

                <span className="feature-icon">
                  🏅
                </span>

                <div>

                  <strong>
                    {listing.host.name} is a
                    Superhost
                  </strong>

                  <p>
                    Superhosts are experienced,
                    highly rated hosts.
                  </p>

                </div>

              </div>

            </section>

            {/* DESCRIPTION */}

            <section className="detail-section">

              <p className="description">
                {listing.description}
              </p>

            </section>

            {/* AMENITIES */}

            <section className="detail-section">

              <h2>
                What this place offers
              </h2>

              <div className="amenities-list">

                {listing.amenities
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      className="amenity"
                      key={item.id}
                    >
                      <span>
                        ✓
                      </span>

                      <span>
                        {
                          item
                            .amenity
                            .name
                        }
                      </span>
                    </div>
                  ))}

              </div>

              <button className="show-amenities">
                Show all{" "}
                {listing.amenities.length ||
                  10}{" "}
                amenities
              </button>

            </section>

            {/* LOCATION */}

            <section className="detail-section">

              <h2>
                Where you'll be
              </h2>

              <div className="location-card">

                <div className="location-map">

                  <div className="map-road road-one" />

                  <div className="map-road road-two" />

                  <div className="map-road road-three" />

                  <div className="location-pin">
                    🏠
                  </div>

                </div>

              </div>

              <h3>
                {listing.location}
              </h3>

              <p>
                India
              </p>

            </section>

            {/* REVIEWS */}

            <section className="detail-section">

              <h2>
                ★{" "}
                {listing.rating
                  ? listing.rating.toFixed(
                      2
                    )
                  : "New"}{" "}
                ·{" "}
                {listing.review_count ||
                  0}{" "}
                reviews
              </h2>

              <div className="reviews-empty">

                <span>
                  ☆
                </span>

                <div>

                  <strong>
                    New · No reviews yet
                  </strong>

                  <p>
                    Reviews from guests will
                    appear here.
                  </p>

                </div>

              </div>

            </section>

            {/* MEET HOST */}

            <section className="detail-section">

              <h2>
                Meet your host
              </h2>

              <div className="meet-host">

                <div className="host-profile-card">

                  <div className="big-host-avatar">

                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                      alt="Host"
                    />

                  </div>

                  <h2>
                    {listing.host.name}
                  </h2>

                  <span>
                    🏅 Superhost
                  </span>

                  <div className="host-stats">

                    <div>
                      <strong>
                        64
                      </strong>

                      <span>
                        Reviews
                      </span>
                    </div>

                    <div>
                      <strong>
                        4.91★
                      </strong>

                      <span>
                        Rating
                      </span>
                    </div>

                    <div>
                      <strong>
                        4
                      </strong>

                      <span>
                        Months hosting
                      </span>
                    </div>

                  </div>

                </div>

                <div className="host-description">

                  <h3>
                    {listing.host.name} is
                    a Superhost
                  </h3>

                  <p>
                    Superhosts are experienced,
                    highly rated hosts who are
                    committed to providing great
                    stays for guests.
                  </p>

                  <h3>
                    Host details
                  </h3>

                  <p>
                    Response rate: 100%
                    <br />
                    Responds within an hour
                  </p>

                  <button>
                    Message host
                  </button>

                </div>

              </div>

            </section>

            {/* THINGS TO KNOW */}

            <section className="detail-section things-to-know">

              <h2>
                Things to know
              </h2>

              <div className="things-grid">

                <div>

                  <span>
                    ▣
                  </span>

                  <h3>
                    Cancellation policy
                  </h3>

                  <p>
                    Free cancellation before
                    10 September.
                  </p>

                </div>

                <div>

                  <span>
                    ⚿
                  </span>

                  <h3>
                    House rules
                  </h3>

                  <p>
                    Check-in after 12:00 pm
                    <br />
                    Pets allowed
                  </p>

                </div>

                <div>

                  <span>
                    🛡
                  </span>

                  <h3>
                    Safety & property
                  </h3>

                  <p>
                    Exterior security cameras
                    on property.
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* BOOKING */}

          <aside className="booking-sidebar">

            <div className="booking-card">

              <div className="booking-price">

                <strong>
                  ₹
                  {listing.price_per_night.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <span>
                  / night
                </span>

              </div>

              <div className="booking-rating">

                ★{" "}
                {listing.rating
                  ? listing.rating.toFixed(
                      2
                    )
                  : "New"}

              </div>

              {/* DATES */}

              <div className="booking-fields">

                <div>

                  <label>
                    CHECK-IN
                  </label>

                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) =>
                      setCheckIn(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label>
                    CHECKOUT
                  </label>

                  <input
                    type="date"
                    min={
                      checkIn || today
                    }
                    value={checkOut}
                    onChange={(e) =>
                      setCheckOut(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* GUESTS */}

              <div className="booking-guest">

                <label>
                  GUESTS
                </label>

                <div className="guest-control">

                  <span>
                    {guests}{" "}
                    {guests === 1
                      ? "guest"
                      : "guests"}
                  </span>

                  <div>

                    <button
                      onClick={() =>
                        setGuests(
                          Math.max(
                            1,
                            guests - 1
                          )
                        )
                      }
                    >
                      −
                    </button>

                    <button
                      onClick={() =>
                        setGuests(
                          guests + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              {/* PRICE */}

              {nights > 0 && (
                <div className="price-details">

                  <div>

                    <span>
                      ₹
                      {listing.price_per_night.toLocaleString(
                        "en-IN"
                      )}{" "}
                      × {nights} nights
                    </span>

                    <span>
                      ₹
                      {subtotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  <div>

                    <span>
                      Cleaning fee
                    </span>

                    <span>
                      ₹500
                    </span>

                  </div>

                  <div>

                    <span>
                      Service fee
                    </span>

                    <span>
                      ₹
                      {serviceFee.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 0,
                        }
                      )}
                    </span>

                  </div>

                  <hr />

                  <div className="total">

                    <strong>
                      Total
                    </strong>

                    <strong>
                      ₹
                      {total.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 0,
                        }
                      )}
                    </strong>

                  </div>

                </div>
              )}

              <button
                className="reserve-button"
                onClick={reserve}
              >
                Reserve
              </button>

              <p className="charge-message">
                You won't be charged yet
              </p>

            </div>

          </aside>

        </div>

      </div>

      {/* MOBILE */}

      <div className="mobile-reserve">

        <div>

          <strong>
            ₹
            {listing.price_per_night.toLocaleString(
              "en-IN"
            )}
          </strong>

          <span>
            / night
          </span>

        </div>

        <button
          onClick={reserve}
        >
          Reserve
        </button>

      </div>

    </main>
  );
}