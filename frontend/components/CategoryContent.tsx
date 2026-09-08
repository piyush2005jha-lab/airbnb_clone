"use client";

import type { Listing } from "@/lib/api";
import ListingGrid from "./ListingGrid";

interface CategoryContentProps {
  category: string;
  listings: Listing[];
}

const experiences = [
  {
    title: "Old Delhi Food Tour",
    category: "Food & Culture",
    price: "₹3,999 / guest",
    rating: "5.0",
    time: "10 am",
    image:
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Explore Old Delhi with a Guide",
    category: "History",
    price: "₹3,600 / guest",
    rating: "4.98",
    time: "8:30 am",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Street Food & Heritage Walk",
    category: "Food Tour",
    price: "₹2,799 / guest",
    rating: "5.0",
    time: "1 pm",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Delhi Temple & Spice Market",
    category: "Culture",
    price: "₹2,700 / guest",
    rating: "5.0",
    time: "10 am",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Indian Food & Religion Walk",
    category: "Culture",
    price: "₹2,500 / guest",
    rating: "5.0",
    time: "9:30 am",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Indian Hand Block Printing",
    category: "Art",
    price: "₹1,500 / guest",
    rating: "4.94",
    time: "6 pm",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Horse Riding Adventure",
    category: "Outdoor",
    price: "₹2,750 / guest",
    rating: "4.98",
    time: "5 pm",
    image:
      "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=700&q=80",
  },
];

const services = [
  {
    title: "New Delhi photo session",
    category: "Photography",
    price: "₹8,500 / guest",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Editorial love stories",
    category: "Photography",
    price: "₹10,000 / guest",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Candid travel portraits",
    category: "Photography",
    price: "₹8,000 / guest",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Artful city portraits",
    category: "Photography",
    price: "₹9,500 / group",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Intimate candid portraits",
    category: "Photography",
    price: "₹5,000 / group",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Cinematic portraits",
    category: "Photography",
    price: "₹6,400 / guest",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Storytelling portraits",
    category: "Photography",
    price: "₹8,000 / guest",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80",
  },
];

const training = [
  {
    title: "Personal Fitness Training",
    price: "₹2,500 / guest",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Professional Fitness Session",
    price: "₹3,000 / guest",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Outdoor Group Training",
    price: "₹1,800 / guest",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Yoga & Wellness",
    price: "₹2,000 / guest",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Meditation Session",
    price: "₹1,500 / guest",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Dance Training",
    price: "₹2,200 / guest",
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Wellness Experience",
    price: "₹2,800 / guest",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=700&q=80",
  },
];

function HorizontalCards({
  items,
}: {
  items: {
    title: string;
    price: string;
    image: string;
    rating?: string;
    category?: string;
    time?: string;
  }[];
}) {
  return (
    <div className="category-horizontal">

      {items.map((item, index) => (
        <article
          className="category-card"
          key={`${item.title}-${index}`}
        >

          <div className="category-card-image">

            <img
              src={item.image}
              alt={item.title}
            />

            {item.time && (
              <span className="category-time">
                {item.time}
              </span>
            )}

            <button
              type="button"
              className="category-heart"
            >
              ♡
            </button>

          </div>

          <div className="category-card-info">

            <h3>
              {item.title}
            </h3>

            {item.category && (
              <p>
                {item.category}
              </p>
            )}

            <div className="category-price">

              <span>
                {item.price}
              </span>

              {item.rating && (
                <span>
                  · ★ {item.rating}
                </span>
              )}

            </div>

          </div>

        </article>
      ))}

    </div>
  );
}

export default function CategoryContent({
  category,
  listings,
}: CategoryContentProps) {

  // ==========================================
  // ALL
  // ==========================================

  if (category === "All") {
    return (
      <div className="category-content">

        <section className="home-section">

          <div className="section-heading-row">
            <h2>
              Popular homes
            </h2>

            <button>
              →
            </button>
          </div>

          <ListingGrid
            listings={listings.slice(0, 12)}
          />

        </section>

        <section className="home-section">

          <div className="section-heading-row">
            <h2>
              Experiences
            </h2>

            <button>
              →
            </button>
          </div>

          <HorizontalCards
            items={experiences.slice(0, 7)}
          />

        </section>

        <section className="home-section">

          <div className="section-heading-row">
            <h2>
              Services
            </h2>

            <button>
              →
            </button>
          </div>

          <HorizontalCards
            items={services.slice(0, 7)}
          />

        </section>

      </div>
    );
  }

  // ==========================================
  // HOMES
  // ==========================================

  if (category === "Homes") {
    return (
      <div className="category-content">

        <section className="home-section">

          <div className="section-heading-row">

            <h2>
              Homes around India
            </h2>

            <button>
              →
            </button>

          </div>

          <ListingGrid
            listings={listings}
          />

        </section>

      </div>
    );
  }

  // ==========================================
  // EXPERIENCES
  // ==========================================

  if (category === "Experiences") {
    return (
      <div className="category-content">

        <section className="category-section">

          <div className="section-heading-row">

            <h2>
              Happening today in Gurgaon District
            </h2>

            <button>
              →
            </button>

          </div>

          <HorizontalCards
            items={experiences}
          />

        </section>

        <section className="category-section">

          <div className="section-heading-row">

            <h2>
              Tomorrow in Gurgaon District
            </h2>

            <button>
              →
            </button>

          </div>

          <HorizontalCards
            items={[
              ...experiences.slice(1),
              ...experiences.slice(0, 2),
            ]}
          />

        </section>

      </div>
    );
  }

  // ==========================================
  // SERVICES
  // ==========================================

  return (
    <div className="category-content">

      <section className="category-section">

        <div className="section-heading-row">

          <h2>
            Photography
          </h2>

          <button>
            →
          </button>

        </div>

        <HorizontalCards
          items={services}
        />

      </section>

      <section className="category-section">

        <div className="section-heading-row">

          <h2>
            Training
          </h2>

          <button>
            →
          </button>

        </div>

        <HorizontalCards
          items={training}
        />

      </section>

    </div>
  );
}