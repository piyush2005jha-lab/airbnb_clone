from datetime import date

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from database import get_db

from models import (
    Booking,
    Listing,
    User,
)

from schemas import (
    BookingCreate,
    BookingResponse,
)


router = APIRouter(
    prefix="/api/bookings",
    tags=["Bookings"],
)


# ==========================================
# CREATE BOOKING
# ==========================================

@router.post(
    "/",
    response_model=BookingResponse,
    status_code=201,
)
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
):

    listing = (
        db.query(Listing)
        .filter(
            Listing.id == data.listing_id
        )
        .first()
    )

    if not listing:

        raise HTTPException(
            status_code=404,
            detail="Listing not found",
        )


    guest = (
        db.query(User)
        .filter(
            User.id == data.guest_id
        )
        .first()
    )

    if not guest:

        raise HTTPException(
            status_code=404,
            detail="Guest not found",
        )


    if guest.role != "guest":

        raise HTTPException(
            status_code=400,
            detail=(
                "Only guests can make bookings"
            ),
        )


    if data.check_in >= data.check_out:

        raise HTTPException(
            status_code=400,
            detail=(
                "Check-out date must be "
                "after check-in date"
            ),
        )


    if data.check_in < date.today():

        raise HTTPException(
            status_code=400,
            detail=(
                "Check-in date cannot be "
                "in the past"
            ),
        )


    if data.guests < 1:

        raise HTTPException(
            status_code=400,
            detail=(
                "At least one guest is required"
            ),
        )


    # ======================================
    # OVERLAP CHECK
    # ======================================

    overlapping_booking = (
        db.query(Booking)
        .filter(

            Booking.listing_id
            == data.listing_id,

            Booking.status
            == "confirmed",

            Booking.check_in
            < data.check_out,

            Booking.check_out
            > data.check_in,

        )
        .first()
    )


    if overlapping_booking:

        raise HTTPException(
            status_code=409,
            detail=(
                "This listing is already "
                "booked for the selected dates"
            ),
        )


    # ======================================
    # PRICE
    # ======================================

    nights = (
        data.check_out
        - data.check_in
    ).days


    subtotal = (
        listing.price_per_night
        * nights
    )


    cleaning_fee = 500


    service_fee = round(
        subtotal * 0.12,
        2,
    )


    total_price = round(
        subtotal
        + cleaning_fee
        + service_fee,
        2,
    )


    # ======================================
    # CREATE BOOKING
    # ======================================

    booking = Booking(

        listing_id=data.listing_id,

        guest_id=data.guest_id,

        check_in=data.check_in,

        check_out=data.check_out,

        guests=data.guests,

        total_price=total_price,

        status="confirmed",

    )


    db.add(booking)

    db.commit()

    db.refresh(booking)


    return booking


# ==========================================
# GET BOOKINGS
# ==========================================

@router.get(
    "/",
    response_model=list[BookingResponse],
)
def get_bookings(
    guest_id: int | None = None,
    listing_id: int | None = None,
    db: Session = Depends(get_db),
):

    query = db.query(Booking)


    if guest_id is not None:

        query = query.filter(
            Booking.guest_id
            == guest_id
        )


    if listing_id is not None:

        query = query.filter(
            Booking.listing_id
            == listing_id
        )


    return (
        query
        .order_by(
            Booking.created_at.desc()
        )
        .all()
    )


# ==========================================
# GET SINGLE BOOKING
# ==========================================

@router.get(
    "/{booking_id}",
    response_model=BookingResponse,
)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
):

    booking = (
        db.query(Booking)
        .filter(
            Booking.id == booking_id
        )
        .first()
    )


    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking not found",
        )


    return booking


# ==========================================
# CANCEL BOOKING
# ==========================================

@router.delete(
    "/{booking_id}"
)
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
):

    booking = (
        db.query(Booking)
        .filter(
            Booking.id == booking_id
        )
        .first()
    )


    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking not found",
        )


    if booking.status == "cancelled":

        raise HTTPException(
            status_code=400,
            detail=(
                "Booking is already cancelled"
            ),
        )


    booking.status = "cancelled"

    db.commit()


    return {
        "message": (
            "Booking cancelled successfully"
        )
    }


# ==========================================
# CHECK AVAILABILITY
# ==========================================

@router.get(
    "/availability/{listing_id}"
)
def check_availability(
    listing_id: int,
    check_in: date,
    check_out: date,
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


    if check_in >= check_out:

        raise HTTPException(
            status_code=400,
            detail=(
                "Check-out date must be "
                "after check-in date"
            ),
        )


    overlapping_booking = (
        db.query(Booking)
        .filter(

            Booking.listing_id
            == listing_id,

            Booking.status
            == "confirmed",

            Booking.check_in
            < check_out,

            Booking.check_out
            > check_in,

        )
        .first()
    )


    if overlapping_booking:

        return {
            "listing_id": listing_id,
            "check_in": check_in,
            "check_out": check_out,
            "available": False,
            "message": (
                "Listing is not available "
                "for these dates"
            ),
        }


    return {
        "listing_id": listing_id,
        "check_in": check_in,
        "check_out": check_out,
        "available": True,
        "message": (
            "Listing is available "
            "for these dates"
        ),
    }