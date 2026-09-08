from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


# ==========================================
# USER
# ==========================================

class UserBase(BaseModel):

    name: str
    email: str
    role: str = "guest"
    avatar: Optional[str] = None


class UserResponse(UserBase):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================
# IMAGE
# ==========================================

class ListingImageResponse(BaseModel):

    id: int
    image_url: str

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================
# AMENITY
# ==========================================

class AmenityResponse(BaseModel):

    id: int
    name: str

    model_config = ConfigDict(
        from_attributes=True
    )


class ListingAmenityResponse(BaseModel):

    id: int
    amenity: AmenityResponse

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================
# LISTING
# ==========================================

class ListingCreate(BaseModel):

    title: str
    description: str
    location: str

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    price_per_night: float
    property_type: str

    images: List[str] = []
    amenities: List[str] = []


class ListingUpdate(BaseModel):

    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    price_per_night: Optional[float] = None
    property_type: Optional[str] = None

    images: Optional[List[str]] = None
    amenities: Optional[List[str]] = None


class ListingResponse(BaseModel):

    id: int

    title: str
    description: str
    location: str

    latitude: Optional[float]
    longitude: Optional[float]

    price_per_night: float

    rating: float
    review_count: int

    property_type: str

    host: UserResponse

    images: List[ListingImageResponse]

    amenities: List[ListingAmenityResponse]

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================
# BOOKING
# ==========================================

class BookingCreate(BaseModel):

    listing_id: int

    guest_id: int

    check_in: date

    check_out: date

    guests: int


class BookingResponse(BaseModel):

    id: int

    listing_id: int

    guest_id: int

    check_in: date

    check_out: date

    guests: int

    total_price: float

    status: str

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================
# FAVORITE
# ==========================================

class FavoriteCreate(BaseModel):

    user_id: int
    listing_id: int


class FavoriteResponse(BaseModel):

    id: int
    user_id: int
    listing_id: int

    model_config = ConfigDict(
        from_attributes=True
    )