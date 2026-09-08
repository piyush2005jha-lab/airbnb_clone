"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ListingGrid from "@/components/ListingGrid";
import ListingMap from "@/components/ListingMap";

import {
  getListings,
  type Listing,
} from "@/lib/api";

/* =====================================================
   EXPERIENCE DATA
===================================================== */

const experienceItems = [
  {
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    title: "Cultural tours",
  },
  {
    image:
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=600&q=80",
    title: "Landmarks",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=600&q=80",
    title: "Food tours",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80",
    title: "Art workshops",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    title: "Cooking",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80",
    title: "Shopping & fashion",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
    title: "Outdoors",
  },
  {
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988b5?auto=format&fit=crop&w=600&q=80",
    title: "Museums",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
    title: "Wellness",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=600&q=80",
    title: "Performances",
  },
];

/* =====================================================
   MEMORY DATA
===================================================== */

const memoryItems = [
  {
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=600&q=80",
    title: "Travel photography",
    subtitle: "Photography by local creators",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=600&q=80",
    title: "Editorial love stories",
    subtitle: "Beautiful moments together",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=600&q=80",
    title: "Candid travel portraits",
    subtitle: "Discover hidden city corners",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    title: "Artful city portraits",
    subtitle: "Creative photography sessions",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    title: "Intimate candid moments",
    subtitle: "Memories made together",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80",
    title: "Cinematic portraits",
    subtitle: "Unique experiences nearby",
  },
  {
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    title: "Storytelling portraits",
    subtitle: "Make your trip memorable",
  },
];

/* =====================================================
   EXPERIENCE SECTION
===================================================== */

function ExperienceSection({
  title,
  items,
}: {
  title: string;
  items: {
    image: string;
    title: string;
    subtitle?: string;
  }[];
}) {
  return (
    <section className="home-section">

      <div className="section-heading-row">

        <h2>
          {title}
        </h2>

        <button
          type="button"
          className="section-arrow"
          aria-label="Next"
        >
          →
        </button>

      </div>

      <div className="experience-scroll">

        {items.map((item, index) => (

          <article
            className="experience-card"
            key={`${item.title}-${index}`}
          >

            <div className="experience-image-wrapper">

              <img
                src={item.image}
                alt={item.title}
                className="experience-image"
                loading="lazy"
              />

              <button
                type="button"
                className="experience-heart"
                aria-label={`Save ${item.title}`}
              >
                ♡
              </button>

            </div>

            <h3>
              {item.title}
            </h3>

            {item.subtitle && (
              <p>
                {item.subtitle}
              </p>
            )}

          </article>

        ))}

      </div>

    </section>
  );
}

/* =====================================================
   FOOTER
===================================================== */

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-inner">

        <div className="footer-columns">

          <div className="footer-column">

            <h3>
              Support
            </h3>

            <a>Help Centre</a>
            <a>Get help with a safety issue</a>
            <a>AirCover</a>
            <a>Anti-discrimination</a>
            <a>Disability support</a>
            <a>Cancellation options</a>
            <a>Report neighbourhood concern</a>

          </div>

          <div className="footer-column">

            <h3>
              Hosting
            </h3>

            <a>Airbnb your home</a>
            <a>Airbnb your experience</a>
            <a>Airbnb your service</a>
            <a>AirCover for Hosts</a>
            <a>Hosting resources</a>
            <a>Community forum</a>
            <a>Hosting responsibly</a>
            <a>Join a free hosting class</a>
            <a>Find a co-host</a>
            <a>Refer a host</a>

          </div>

          <div className="footer-column">

            <h3>
              Airbnb
            </h3>

            <a>2026 Summer Release</a>
            <a>Newsroom</a>
            <a>Careers</a>
            <a>Investors</a>
            <a>Airbnb.org emergency stays</a>

          </div>

        </div>

        <div className="footer-bottom">

          <div className="footer-legal">

            <span>
              © 2026 Airbnb, Inc.
            </span>

            <span>·</span>

            <a>Privacy</a>

            <span>·</span>

            <a>Terms</a>

            <span>·</span>

            <a>Company details</a>

          </div>

          <div className="footer-right">

            <button>
              ◎ English (IN)
            </button>

            <button>
              ₹ INR
            </button>

            <button>
              ●
            </button>

            <button>
              𝕏
            </button>

            <button>
              ◎
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}

/* =====================================================
   HOME PAGE
===================================================== */

export default function Home() {

  const [listings, setListings] =
    useState<Listing[]>([]);

  const [filteredListings, setFilteredListings] =
    useState<Listing[]>([]);

  const [searchLocation, setSearchLocation] =
    useState("");

  const [searchActive, setSearchActive] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [searchLoading, setSearchLoading] =
    useState(false);

  /* ===================================================
     CATEGORY
  =================================================== */

  const [activeCategory, setActiveCategory] =
    useState("All");

  /* ===================================================
     LOAD LISTINGS
  =================================================== */

  useEffect(() => {

    async function loadListings() {

      try {

        const data =
          await getListings();

        setListings(data);

        setFilteredListings(
          data
        );

      } catch (error) {

        console.error(
          "Listings error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }

    loadListings();

  }, []);

  /* ===================================================
     SEARCH
  =================================================== */

  async function handleSearch(
    location: string
  ) {

    const search =
      location.trim();

    setSearchLocation(
      location
    );

    if (!search) {

      setSearchActive(false);

      setFilteredListings(
        listings
      );

      return;

    }

    setSearchActive(true);

    setSearchLoading(true);

    try {

      const results =
        await getListings({
          location: search,
        });

      setFilteredListings(
        results
      );

    } catch (error) {

      console.error(
        "Search error:",
        error
      );

      setFilteredListings([]);

    } finally {

      setSearchLoading(false);

    }

  }

  /* ===================================================
     IMPORTANT FIX
     
     NEVER CHANGE listing.id.
     
     Earlier:
     3 -> 301
     3 -> 302
     
     That caused invalid listing URLs.
     
     Now we use actual DB listings directly.
  =================================================== */

  const displayListings = useMemo(() => {

    return filteredListings;

  }, [filteredListings]);

  /* ===================================================
     SEARCH TITLE
  =================================================== */

  const searchTitle =
    useMemo(() => {

      if (!searchActive) {

        return "Popular homes in North Goa";

      }

      if (searchLoading) {

        return `Finding homes in ${searchLocation}...`;

      }

      if (
        filteredListings.length === 0
      ) {

        return `No homes available in ${searchLocation}`;

      }

      return `Over ${filteredListings.length} homes in ${searchLocation}`;

    }, [
      searchActive,
      searchLoading,
      filteredListings.length,
      searchLocation,
    ]);

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {

    return (
      <main className="home-page">

        <Navbar
          activeCategory={activeCategory}
          onCategoryChange={
            setActiveCategory
          }
        />

        <div className="loading-screen">

          <div className="loading-spinner" />

          <p>
            Finding beautiful homes...
          </p>

        </div>

      </main>
    );

  }

  /* ===================================================
     MAIN
  =================================================== */

  return (
    <main className="home-page">

      {/* =============================================
          NAVBAR
          
          Categories are HERE.
          No separate CategoryBar below.
      ============================================= */}

      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={(category) => {

          setActiveCategory(
            category
          );

          setSearchActive(false);

        }}
      />

      {/* =============================================
          SEARCH
      ============================================= */}

      <SearchBar
        onSearch={handleSearch}
      />

      {/* =============================================
          SEARCH RESULTS
      ============================================= */}

      {searchActive ? (

        <section className="search-results-page">

          <div className="search-results-header">

            <div>

              <h1>
                {searchTitle}
              </h1>

              {!searchLoading &&
                filteredListings.length >
                  0 && (

                  <p>

                    Homes matching your
                    search in{" "}

                    <strong>
                      {searchLocation}
                    </strong>

                  </p>

                )}

            </div>

            <div className="price-info">

              <span>
                🏷️
              </span>

              <strong>
                Prices include all fees
              </strong>

            </div>

          </div>

          {searchLoading ? (

            <div className="search-loading">

              <div className="loading-spinner" />

              <p>
                Finding homes...
              </p>

            </div>

          ) : filteredListings.length >
            0 ? (

            <div className="search-results-layout">

              {/* LEFT */}

              <div className="search-results-list">

                <ListingGrid
                  listings={
                    displayListings
                  }
                />

              </div>

              {/* RIGHT */}

              <div className="search-results-map">

                <ListingMap
                  listings={
                    filteredListings
                  }
                />

              </div>

            </div>

          ) : (

            <div className="no-search-results">

              <div className="no-results-icon">
                🏠
              </div>

              <h2>
                No homes found
              </h2>

              <p>

                We couldn&apos;t find any
                homes matching{" "}

                <strong>
                  {searchLocation}
                </strong>

                .

              </p>

              <button
                type="button"
                onClick={() => {

                  setSearchLocation("");

                  setSearchActive(false);

                  setFilteredListings(
                    listings
                  );

                }}
              >
                Show all homes
              </button>

            </div>

          )}

        </section>

      ) : (

        /* =============================================
           CATEGORY CONTENT
        ============================================= */

        <>

          {/* =========================================
              ALL
          ========================================= */}

          {activeCategory === "All" && (

            <div className="page-content">

              <section className="home-section">

                <div className="section-heading-row">

                  <h2>
                    Popular homes in North Goa
                  </h2>

                  <button
                    type="button"
                    className="section-arrow"
                    aria-label="Next"
                  >
                    →
                  </button>

                </div>

                <ListingGrid
                  listings={
                    listings.slice(
                      0,
                      7
                    )
                  }
                />

              </section>

              <section className="home-section">

                <div className="section-heading-row">

                  <h2>
                    Available in Dehradun
                    this weekend
                  </h2>

                  <button
                    type="button"
                    className="section-arrow"
                    aria-label="Next"
                  >
                    →
                  </button>

                </div>

                <ListingGrid
                  listings={
                    listings.slice(
                      3,
                      10
                    )
                  }
                />

              </section>

              <section className="home-section">

                <div className="section-heading-row">

                  <h2>
                    Stay in New Delhi
                  </h2>

                  <button
                    type="button"
                    className="section-arrow"
                    aria-label="Next"
                  >
                    →
                  </button>

                </div>

                <ListingGrid
                  listings={
                    listings.slice(
                      0,
                      7
                    )
                  }
                />

              </section>

              <ExperienceSection
                title="Explore experiences nearby"
                items={
                  experienceItems
                }
              />

              <ExperienceSection
                title="Capture memories nearby"
                items={
                  memoryItems
                }
              />

              <section className="home-section">

                <div className="section-heading-row">

                  <h2>
                    Popular stays around India
                  </h2>

                  <button
                    type="button"
                    className="section-arrow"
                    aria-label="Next"
                  >
                    →
                  </button>

                </div>

                <ListingGrid
                  listings={
                    listings
                  }
                />

              </section>

            </div>

          )}

          {/* =========================================
              HOMES
          ========================================= */}

          {activeCategory === "Homes" && (

            <div className="page-content">

              <section className="home-section">

                <div className="section-heading-row">

                  <h2>
                    Homes around India
                  </h2>

                  <button
                    type="button"
                    className="section-arrow"
                    aria-label="Next"
                  >
                    →
                  </button>

                </div>

                <ListingGrid
                  listings={
                    listings
                  }
                />

              </section>

            </div>

          )}

          {/* =========================================
              EXPERIENCES
          ========================================= */}

          {activeCategory === "Experiences" && (

            <div className="page-content">

              <ExperienceSection
                title="Happening today in Gurgaon District"
                items={
                  experienceItems
                }
              />

              <ExperienceSection
                title="Tomorrow in Gurgaon District"
                items={
                  [
                    ...experienceItems.slice(
                      2
                    ),
                    ...experienceItems.slice(
                      0,
                      2
                    ),
                  ]
                }
              />

              <ExperienceSection
                title="Explore experiences nearby"
                items={
                  memoryItems
                }
              />

            </div>

          )}

          {/* =========================================
              SERVICES
          ========================================= */}

          {activeCategory === "Services" && (

            <div className="page-content">

              <ExperienceSection
                title="Photography"
                items={
                  memoryItems
                }
              />

              <ExperienceSection
                title="Training"
                items={
                  experienceItems.slice(
                    0,
                    7
                  )
                }
              />

              <ExperienceSection
                title="More services"
                items={
                  memoryItems
                }
              />

            </div>

          )}

          <Footer />

        </>

      )}

    </main>
  );
}