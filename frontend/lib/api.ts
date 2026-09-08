const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

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

/* =========================================================
   IMAGE URL HELPER
========================================================= */

export function getImageUrl(
  url: string | null | undefined
): string {
  if (!url) {
    return "";
  }

  const cleanUrl = url.trim();

  if (!cleanUrl) {
    return "";
  }

  // Already a complete URL
  if (
    cleanUrl.startsWith("http://") ||
    cleanUrl.startsWith("https://") ||
    cleanUrl.startsWith("data:")
  ) {
    return cleanUrl;
  }

  // Backend-relative path
  if (cleanUrl.startsWith("/")) {
    return `${API_URL}${cleanUrl}`;
  }

  // Relative path without /
  return `${API_URL}/${cleanUrl}`;
}

/* =========================================================
   GET ALL LISTINGS
========================================================= */

export async function getListings(
  params?: {
    location?: string;
  }
): Promise<Listing[]> {
  const url = new URL(
    `${API_URL}/api/listings/`
  );

  if (params?.location) {
    url.searchParams.set(
      "location",
      params.location
    );
  }

  const response = await fetch(
    url.toString(),
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch listings: ${response.status}`
    );
  }

  return response.json();
}

/* =========================================================
   GET SINGLE LISTING
========================================================= */

export async function getListing(
  id: number
): Promise<Listing> {
  const response = await fetch(
    `${API_URL}/api/listings/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch listing ${id}: ${response.status}`
    );
  }

  return response.json();
}

/* =========================================================
   CREATE LISTING
========================================================= */

export async function createListing(
  listing: Partial<Listing>
): Promise<Listing> {
  const response = await fetch(
    `${API_URL}/api/listings/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(listing),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create listing"
    );
  }

  return response.json();
}

/* =========================================================
   UPDATE LISTING
========================================================= */

export async function updateListing(
  id: number,
  listing: Partial<Listing>
): Promise<Listing> {
  const response = await fetch(
    `${API_URL}/api/listings/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(listing),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update listing"
    );
  }

  return response.json();
}

/* =========================================================
   DELETE LISTING
========================================================= */

export async function deleteListing(
  id: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/listings/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete listing"
    );
  }
}