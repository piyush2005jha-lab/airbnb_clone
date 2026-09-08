from datetime import datetime

from sqlalchemy import (
    Column,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)

from sqlalchemy.orm import relationship

from database import Base


# ==========================================
# USER
# ==========================================

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True,
    )

    role = Column(
        String(20),
        nullable=False,
        default="guest",
    )

    avatar = Column(
        String(500),
        nullable=True,
    )

    listings = relationship(
        "Listing",
        back_populates="host",
        cascade="all, delete-orphan",
    )

    bookings = relationship(
        "Booking",
        back_populates="guest",
        cascade="all, delete-orphan",
    )

    reviews = relationship(
        "Review",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    favorites = relationship(
        "Favorite",
        back_populates="user",
        cascade="all, delete-orphan",
    )


# ==========================================
# LISTING
# ==========================================

class Listing(Base):

    __tablename__ = "listings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    host_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    title = Column(
        String(200),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    location = Column(
        String(200),
        nullable=False,
    )

    latitude = Column(
        Float,
        nullable=True,
    )

    longitude = Column(
        Float,
        nullable=True,
    )

    price_per_night = Column(
        Float,
        nullable=False,
    )

    rating = Column(
        Float,
        default=0,
    )

    review_count = Column(
        Integer,
        default=0,
    )

    property_type = Column(
        String(100),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    host = relationship(
        "User",
        back_populates="listings",
    )

    images = relationship(
        "ListingImage",
        back_populates="listing",
        cascade="all, delete-orphan",
    )

    amenities = relationship(
        "ListingAmenity",
        back_populates="listing",
        cascade="all, delete-orphan",
    )

    bookings = relationship(
        "Booking",
        back_populates="listing",
        cascade="all, delete-orphan",
    )

    reviews = relationship(
        "Review",
        back_populates="listing",
        cascade="all, delete-orphan",
    )

    favorites = relationship(
        "Favorite",
        back_populates="listing",
        cascade="all, delete-orphan",
    )


# ==========================================
# LISTING IMAGE
# ==========================================

class ListingImage(Base):

    __tablename__ = "listing_images"

    id = Column(
        Integer,
        primary_key=True,
    )

    listing_id = Column(
        Integer,
        ForeignKey("listings.id"),
        nullable=False,
    )

    image_url = Column(
        String(1000),
        nullable=False,
    )

    listing = relationship(
        "Listing",
        back_populates="images",
    )


# ==========================================
# AMENITY
# ==========================================

class Amenity(Base):

    __tablename__ = "amenities"

    id = Column(
        Integer,
        primary_key=True,
    )

    name = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    listing_amenities = relationship(
        "ListingAmenity",
        back_populates="amenity",
        cascade="all, delete-orphan",
    )


# ==========================================
# LISTING AMENITY
# ==========================================

class ListingAmenity(Base):

    __tablename__ = "listing_amenities"

    id = Column(
        Integer,
        primary_key=True,
    )

    listing_id = Column(
        Integer,
        ForeignKey("listings.id"),
        nullable=False,
    )

    amenity_id = Column(
        Integer,
        ForeignKey("amenities.id"),
        nullable=False,
    )

    listing = relationship(
        "Listing",
        back_populates="amenities",
    )

    amenity = relationship(
        "Amenity",
        back_populates="listing_amenities",
    )

    __table_args__ = (
        UniqueConstraint(
            "listing_id",
            "amenity_id",
            name="unique_listing_amenity",
        ),
    )


# ==========================================
# BOOKING
# ==========================================

class Booking(Base):

    __tablename__ = "bookings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    listing_id = Column(
        Integer,
        ForeignKey("listings.id"),
        nullable=False,
    )

    guest_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    check_in = Column(
        Date,
        nullable=False,
    )

    check_out = Column(
        Date,
        nullable=False,
    )

    guests = Column(
        Integer,
        nullable=False,
    )

    total_price = Column(
        Float,
        nullable=False,
    )

    status = Column(
        String(30),
        default="confirmed",
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    listing = relationship(
        "Listing",
        back_populates="bookings",
    )

    guest = relationship(
        "User",
        back_populates="bookings",
    )


# ==========================================
# REVIEW
# ==========================================

class Review(Base):

    __tablename__ = "reviews"

    id = Column(
        Integer,
        primary_key=True,
    )

    listing_id = Column(
        Integer,
        ForeignKey("listings.id"),
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    rating = Column(
        Float,
        nullable=False,
    )

    comment = Column(
        Text,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    listing = relationship(
        "Listing",
        back_populates="reviews",
    )

    user = relationship(
        "User",
        back_populates="reviews",
    )


# ==========================================
# FAVORITE
# ==========================================

class Favorite(Base):

    __tablename__ = "favorites"

    id = Column(
        Integer,
        primary_key=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    listing_id = Column(
        Integer,
        ForeignKey("listings.id"),
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="favorites",
    )

    listing = relationship(
        "Listing",
        back_populates="favorites",
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "listing_id",
            name="unique_user_favorite",
        ),
    )