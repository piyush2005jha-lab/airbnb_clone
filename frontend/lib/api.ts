const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "/svc/api"
    : "http://127.0.0.1:8000");


// =========================================================
// TYPES
// =========================================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
}

export interface ListingImage {
  id: number;
  image_url: string;
}

export interface Amenity {
  id: number;
  name: string;
}

export interface ListingAmenity {
  id: number;
  amenity: Amenity;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  price_per_night: number;
  rating: number;
  review_count: number;
  property_type: string;
  host: User;
  images: ListingImage[];
  amenities: ListingAmenity[];
}


// =========================================================
// GET ALL LISTINGS
// =========================================================

export async function getListings(
  params?: {
    location?: string;
  }
): Promise<Listing[]> {

  const url = `${API_URL}/listings/`;

  const searchParams = new URLSearchParams();

  if (params?.location) {
    searchParams.set(
      "location",
      params.location
    );
  }

  const finalUrl =
    searchParams.toString()
      ? `${url}?${searchParams.toString()}`
      : url;

  console.log(
    "Fetching listings from:",
    finalUrl
  );

  const response = await fetch(
    finalUrl,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch listings: ${response.status}`
    );
  }

  const data = await response.json();

  console.log(
    "Listings received:",
    data
  );

  return data;
}


// =========================================================
// GET SINGLE LISTING
// =========================================================

export async function getListing(
  id: number
): Promise<Listing> {

  const response = await fetch(
    `${API_URL}/listings/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch listing: ${response.status}`
    );
  }

  return response.json();
}