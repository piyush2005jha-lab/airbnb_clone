from typing import Optional

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
)

from sqlalchemy.orm import Session

from database import get_db

from models import (
    Amenity,
    Listing,
    ListingAmenity,
    ListingImage,
)

from schemas import (
    ListingCreate,
    ListingResponse,
    ListingUpdate,
)


router = APIRouter(
    prefix="/api/listings",
    tags=["Listings"],
)


# ==========================================
# GET ALL LISTINGS
# ==========================================

@router.get(
    "/",
    response_model=list[ListingResponse],
)
def get_listings(
    location: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    property_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):

    query = db.query(Listing)

    if location:

        query = query.filter(
            Listing.location.ilike(
                f"%{location}%"
            )
        )

    if min_price is not None:

        query = query.filter(
            Listing.price_per_night >= min_price
        )

    if max_price is not None:

        query = query.filter(
            Listing.price_per_night <= max_price
        )

    if property_type:

        query = query.filter(
            Listing.property_type == property_type
        )

    return (
        query
        .order_by(
            Listing.created_at.desc()
        )
        .all()
    )


# ==========================================
# GET SINGLE LISTING
# ==========================================

@router.get(
    "/{listing_id}",
    response_model=ListingResponse,
)
def get_listing(
    listing_id: int,
    db: Session = Depends(get_db),
):

    listing = (
        db.query(Listing)
        .filter(
            Listing.id == listing_id
        )
        .first()
    )

    if not listing:

        raise HTTPException(
            status_code=404,
            detail="Listing not found",
        )

    return listing


# ==========================================
# CREATE LISTING
# ==========================================

@router.post(
    "/",
    response_model=ListingResponse,
    status_code=201,
)
def create_listing(
    data: ListingCreate,
    host_id: int,
    db: Session = Depends(get_db),
):

    listing = Listing(

        host_id=host_id,

        title=data.title,

        description=data.description,

        location=data.location,

        latitude=data.latitude,

        longitude=data.longitude,

        price_per_night=data.price_per_night,

        property_type=data.property_type,

    )

    db.add(listing)

    db.commit()

    db.refresh(listing)


    for image_url in data.images:

        image = ListingImage(

            listing_id=listing.id,

            image_url=image_url,

        )

        db.add(image)


    for amenity_name in data.amenities:

        amenity = (
            db.query(Amenity)
            .filter(
                Amenity.name == amenity_name
            )
            .first()
        )

        if not amenity:

            amenity = Amenity(
                name=amenity_name
            )

            db.add(amenity)

            db.flush()


        listing_amenity = ListingAmenity(

            listing_id=listing.id,

            amenity_id=amenity.id,

        )

        db.add(listing_amenity)


    db.commit()

    db.refresh(listing)

    return listing


# ==========================================
# UPDATE LISTING
# ==========================================

@router.put(
    "/{listing_id}",
    response_model=ListingResponse,
)
def update_listing(
    listing_id: int,
    data: ListingUpdate,
    host_id: int,
    db: Session = Depends(get_db),
):

    listing = (
        db.query(Listing)
        .filter(
            Listing.id == listing_id
        )
        .first()
    )

    if not listing:

        raise HTTPException(
            status_code=404,
            detail="Listing not found",
        )


    if listing.host_id != host_id:

        raise HTTPException(
            status_code=403,
            detail=(
                "You can only edit "
                "your own listing"
            ),
        )


    update_data = data.model_dump(
        exclude_unset=True
    )


    images = update_data.pop(
        "images",
        None,
    )

    amenities = update_data.pop(
        "amenities",
        None,
    )


    for key, value in update_data.items():

        setattr(
            listing,
            key,
            value,
        )


    if images is not None:

        listing.images.clear()

        for image_url in images:

            listing.images.append(
                ListingImage(
                    image_url=image_url
                )
            )


    if amenities is not None:

        listing.amenities.clear()

        for amenity_name in amenities:

            amenity = (
                db.query(Amenity)
                .filter(
                    Amenity.name == amenity_name
                )
                .first()
            )

            if not amenity:

                amenity = Amenity(
                    name=amenity_name
                )

                db.add(amenity)

                db.flush()


            listing.amenities.append(
                ListingAmenity(
                    amenity_id=amenity.id
                )
            )


    db.commit()

    db.refresh(listing)

    return listing


# ==========================================
# DELETE LISTING
# ==========================================

@router.delete(
    "/{listing_id}"
)
def delete_listing(
    listing_id: int,
    host_id: int,
    db: Session = Depends(get_db),
):

    listing = (
        db.query(Listing)
        .filter(
            Listing.id == listing_id
        )
        .first()
    )

    if not listing:

        raise HTTPException(
            status_code=404,
            detail="Listing not found",
        )


    if listing.host_id != host_id:

        raise HTTPException(
            status_code=403,
            detail=(
                "You can only delete "
                "your own listing"
            ),
        )


    db.delete(listing)

    db.commit()


    return {
        "message": "Listing deleted successfully"
    }