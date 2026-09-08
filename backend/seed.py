from datetime import date, timedelta

from database import Base, SessionLocal, engine
from models import (
    Amenity,
    Booking,
    Favorite,
    Listing,
    ListingAmenity,
    ListingImage,
    Review,
    User,
)


def seed_database():
    # ========================================
    # CREATE TABLES
    # ========================================

    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:

        # ========================================
        # CLEAR EXISTING DATA
        # ========================================

        db.query(Favorite).delete()
        db.query(Review).delete()
        db.query(Booking).delete()
        db.query(ListingAmenity).delete()
        db.query(ListingImage).delete()
        db.query(Listing).delete()
        db.query(Amenity).delete()
        db.query(User).delete()

        db.commit()

        # ========================================
        # USERS
        # ========================================

        hosts = [
            User(
                name="Sofia Williams",
                email="sofia@example.com",
                role="host",
                avatar="https://i.pravatar.cc/150?img=47",
            ),
            User(
                name="Daniel Brown",
                email="daniel@example.com",
                role="host",
                avatar="https://i.pravatar.cc/150?img=12",
            ),
            User(
                name="Emma Wilson",
                email="emma@example.com",
                role="host",
                avatar="https://i.pravatar.cc/150?img=32",
            ),
            User(
                name="James Miller",
                email="james@example.com",
                role="host",
                avatar="https://i.pravatar.cc/150?img=53",
            ),
            User(
                name="Olivia Davis",
                email="olivia@example.com",
                role="host",
                avatar="https://i.pravatar.cc/150?img=44",
            ),
        ]

        guests = [
            User(
                name="Piyush Jha",
                email="piyush@example.com",
                role="guest",
                avatar="https://i.pravatar.cc/150?img=11",
            ),
            User(
                name="Alex Johnson",
                email="alex@example.com",
                role="guest",
                avatar="https://i.pravatar.cc/150?img=15",
            ),
            User(
                name="Mia Taylor",
                email="mia@example.com",
                role="guest",
                avatar="https://i.pravatar.cc/150?img=25",
            ),
        ]

        db.add_all(hosts)
        db.add_all(guests)

        db.commit()

        # Refresh IDs
        for user in hosts + guests:
            db.refresh(user)

        # ========================================
        # AMENITIES
        # ========================================

        amenity_names = [
            "WiFi",
            "Kitchen",
            "Pool",
            "Free parking",
            "Air conditioning",
            "Washer",
            "TV",
            "Workspace",
            "Hot tub",
            "Beach access",
            "Mountain view",
            "Breakfast",
        ]

        amenities = [
            Amenity(name=name)
            for name in amenity_names
        ]

        db.add_all(amenities)

        db.commit()

        for amenity in amenities:
            db.refresh(amenity)

        amenity_map = {
            amenity.name: amenity
            for amenity in amenities
        }

        # ========================================
        # BASE LISTINGS
        # ========================================

        listings_data = [

            # ------------------------------------
            # 1 - GOA
            # ------------------------------------

            {
                "host": hosts[0],
                "title": "Luxury villa with ocean views",
                "description": (
                    "Relax in this beautiful oceanfront villa "
                    "with spacious rooms, a private pool and "
                    "breathtaking sunset views."
                ),
                "location": "Goa, India",
                "price": 8500,
                "rating": 4.91,
                "review_count": 128,
                "property_type": "Villa",
                "images": [
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Pool",
                    "Air conditioning",
                    "Free parking",
                ],
            },

            # ------------------------------------
            # 2 - MUMBAI
            # ------------------------------------

            {
                "host": hosts[1],
                "title": "Modern apartment in the city",
                "description": (
                    "A stylish apartment in the heart of the city, "
                    "perfect for couples and business travelers."
                ),
                "location": "Mumbai, India",
                "price": 4200,
                "rating": 4.87,
                "review_count": 94,
                "property_type": "Apartment",
                "images": [
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Air conditioning",
                    "TV",
                    "Workspace",
                ],
            },

            # ------------------------------------
            # 3 - MANALI
            # ------------------------------------

            {
                "host": hosts[2],
                "title": "Cozy mountain cabin",
                "description": (
                    "Escape to a peaceful cabin surrounded "
                    "by mountains and forests."
                ),
                "location": "Manali, India",
                "price": 5600,
                "rating": 4.95,
                "review_count": 76,
                "property_type": "Cabin",
                "images": [
                    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
                    "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
                    "https://images.unsplash.com/photo-1542718610-a1d656d1884c",
                    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Mountain view",
                    "Hot tub",
                    "Free parking",
                ],
            },

            # ------------------------------------
            # 4 - ALIBAUG
            # ------------------------------------

            {
                "host": hosts[3],
                "title": "Beach house near the shore",
                "description": (
                    "Wake up to the sound of waves in this "
                    "bright and comfortable beach house."
                ),
                "location": "Alibaug, India",
                "price": 7200,
                "rating": 4.89,
                "review_count": 112,
                "property_type": "House",
                "images": [
                    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
                    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                    "https://images.unsplash.com/photo-1493552152660-f915ab47ae9d",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Beach access",
                    "Air conditioning",
                    "Free parking",
                ],
            },

            # ------------------------------------
            # 5 - LONAVALA
            # ------------------------------------

            {
                "host": hosts[4],
                "title": "Peaceful countryside cottage",
                "description": (
                    "A charming cottage surrounded by greenery, "
                    "ideal for a quiet weekend getaway."
                ),
                "location": "Lonavala, India",
                "price": 4800,
                "rating": 4.82,
                "review_count": 61,
                "property_type": "Cottage",
                "images": [
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Free parking",
                    "Washer",
                    "Mountain view",
                ],
            },

            # ------------------------------------
            # 6 - DELHI
            # ------------------------------------

            {
                "host": hosts[0],
                "title": "Elegant penthouse with skyline views",
                "description": (
                    "Enjoy panoramic city views from this "
                    "luxurious penthouse with modern interiors."
                ),
                "location": "Delhi, India",
                "price": 9800,
                "rating": 4.96,
                "review_count": 143,
                "property_type": "Penthouse",
                "images": [
                    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Pool",
                    "Air conditioning",
                    "Workspace",
                ],
            },

            # ------------------------------------
            # 7 - BANGALORE
            # ------------------------------------

            {
                "host": hosts[1],
                "title": "Minimalist studio apartment",
                "description": (
                    "A clean and comfortable studio with "
                    "everything you need for a short city stay."
                ),
                "location": "Bangalore, India",
                "price": 2800,
                "rating": 4.78,
                "review_count": 89,
                "property_type": "Studio",
                "images": [
                    "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Air conditioning",
                    "TV",
                    "Workspace",
                ],
            },

            # ------------------------------------
            # 8 - JAIPUR
            # ------------------------------------

            {
                "host": hosts[2],
                "title": "Luxury resort-style home",
                "description": (
                    "A stunning home with resort-style amenities, "
                    "spacious living areas and a private pool."
                ),
                "location": "Jaipur, India",
                "price": 7600,
                "rating": 4.93,
                "review_count": 104,
                "property_type": "Villa",
                "images": [
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Pool",
                    "Breakfast",
                    "Free parking",
                ],
            },

            # ------------------------------------
            # 9 - UDAIPUR
            # ------------------------------------

            {
                "host": hosts[3],
                "title": "Lakefront retreat",
                "description": (
                    "A serene lakefront property with beautiful "
                    "views and plenty of space to unwind."
                ),
                "location": "Udaipur, India",
                "price": 6800,
                "rating": 4.90,
                "review_count": 87,
                "property_type": "House",
                "images": [
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
                    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Air conditioning",
                    "Free parking",
                    "TV",
                ],
            },

            # ------------------------------------
            # 10 - PUNE
            # ------------------------------------

            {
                "host": hosts[4],
                "title": "Contemporary home with pool",
                "description": (
                    "Modern architecture, open spaces and "
                    "a beautiful private pool."
                ),
                "location": "Pune, India",
                "price": 6200,
                "rating": 4.86,
                "review_count": 73,
                "property_type": "House",
                "images": [
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
                    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
                ],
                "amenities": [
                    "WiFi",
                    "Kitchen",
                    "Pool",
                    "Air conditioning",
                    "Washer",
                ],
            },
        ]

        # ========================================
        # CREATE LISTINGS
        #
        # IDs:
        #
        # 1  -> 101 102 103 104
        # 2  -> 201 202 203 204
        # 3  -> 301 302 303 304
        # 4  -> 401 402 403 404
        # 5  -> 501 502 503 504
        # 6  -> 601 602 603 604
        # 7  -> 701 702 703 704
        # 8  -> 801 802 803 804
        # 9  -> 901 902 903 904
        # 10 -> 1001 1002 1003 1004
        # ========================================

        created_listings = []

        for index, data in enumerate(
            listings_data,
            start=1
        ):

            # ====================================
            # ORIGINAL LISTING
            # ====================================

            listing = Listing(
                id=index,
                host_id=data["host"].id,
                title=data["title"],
                description=data["description"],
                location=data["location"],
                price_per_night=data["price"],
                rating=data["rating"],
                review_count=data["review_count"],
                property_type=data["property_type"],
            )

            db.add(listing)
            db.flush()

            # Original images
            for image_url in data["images"]:
                db.add(
                    ListingImage(
                        listing_id=listing.id,
                        image_url=image_url,
                    )
                )

            # Original amenities
            for amenity_name in data["amenities"]:
                db.add(
                    ListingAmenity(
                        listing_id=listing.id,
                        amenity_id=amenity_map[
                            amenity_name
                        ].id,
                    )
                )

            created_listings.append(listing)

            # ====================================
            # GENERATED LISTINGS
            # ====================================

            for variant in range(1, 5):

                listing_id = (
                    index * 100 + variant
                )

                variant_listing = Listing(
                    id=listing_id,
                    host_id=data["host"].id,
                    title=(
                        f"{data['title']} "
                        f"— Stay {variant}"
                    ),
                    description=data["description"],
                    location=data["location"],
                    price_per_night=data["price"],
                    rating=data["rating"],
                    review_count=data["review_count"],
                    property_type=data["property_type"],
                )

                db.add(variant_listing)
                db.flush()

                # ====================================
                # DIFFERENT IMAGE ORDER
                # ====================================

                original_images = data["images"]

                # Rotate image order.
                #
                # Example:
                #
                # 301 -> image 1,2,3,4
                # 302 -> image 2,3,4,1
                # 303 -> image 3,4,1,2
                # 304 -> image 4,1,2,3

                start_index = (
                    variant - 1
                ) % len(original_images)

                rotated_images = (
                    original_images[
                        start_index:
                    ]
                    +
                    original_images[
                        :start_index
                    ]
                )

                for image_url in rotated_images:

                    db.add(
                        ListingImage(
                            listing_id=variant_listing.id,
                            image_url=image_url,
                        )
                    )

                # ====================================
                # AMENITIES
                # ====================================

                for amenity_name in data["amenities"]:

                    db.add(
                        ListingAmenity(
                            listing_id=variant_listing.id,
                            amenity_id=amenity_map[
                                amenity_name
                            ].id,
                        )
                    )

                created_listings.append(
                    variant_listing
                )

        db.commit()

        # ========================================
        # REVIEWS
        # ========================================

        review_comments = [
            "Amazing place! Everything was clean and comfortable.",
            "Beautiful property and a very helpful host.",
            "The location was perfect. Would definitely stay again.",
            "Exactly as described. We had a wonderful stay.",
            "Fantastic experience from start to finish.",
        ]

        for index, listing in enumerate(
            created_listings
        ):

            for review_index in range(2):

                guest = guests[
                    (index + review_index)
                    % len(guests)
                ]

                db.add(
                    Review(
                        listing_id=listing.id,
                        user_id=guest.id,
                        rating=(
                            5
                            if review_index == 0
                            else 4.5
                        ),
                        comment=review_comments[
                            (index + review_index)
                            % len(review_comments)
                        ],
                    )
                )

        # ========================================
        # EXISTING BOOKINGS
        # ========================================

        today = date.today()

        # Only first 5 original listings
        # get bookings.

        for index, listing in enumerate(
            created_listings[:5]
        ):

            guest = guests[
                index % len(guests)
            ]

            check_in = today + timedelta(
                days=15 + index * 5
            )

            check_out = (
                check_in +
                timedelta(days=3)
            )

            total = (
                listing.price_per_night
                *
                (check_out - check_in).days
            )

            db.add(
                Booking(
                    listing_id=listing.id,
                    guest_id=guest.id,
                    check_in=check_in,
                    check_out=check_out,
                    guests=2,
                    total_price=total,
                    status="confirmed",
                )
            )

        # ========================================
        # FAVORITES
        # ========================================

        for listing in created_listings[:4]:

            db.add(
                Favorite(
                    user_id=guests[0].id,
                    listing_id=listing.id,
                )
            )

        # ========================================
        # FINAL COMMIT
        # ========================================

        db.commit()

        # ========================================
        # SUCCESS OUTPUT
        # ========================================

        print("")
        print("====================================")
        print("DATABASE SEEDED SUCCESSFULLY!")
        print("====================================")

        print(
            f"Hosts: {len(hosts)}"
        )

        print(
            f"Guests: {len(guests)}"
        )

        print(
            f"Listings: {len(created_listings)}"
        )

        print(
            f"Amenities: {len(amenities)}"
        )

        print(
            "Reviews: Added"
        )

        print(
            "Bookings: Added"
        )

        print(
            "Favorites: Added"
        )

        print("")

        print("Available Listing IDs:")
        print(
            "1, 101, 102, 103, 104"
        )
        print(
            "2, 201, 202, 203, 204"
        )
        print(
            "3, 301, 302, 303, 304"
        )
        print(
            "4, 401, 402, 403, 404"
        )
        print(
            "5, 501, 502, 503, 504"
        )
        print(
            "6, 601, 602, 603, 604"
        )
        print(
            "7, 701, 702, 703, 704"
        )
        print(
            "8, 801, 802, 803, 804"
        )
        print(
            "9, 901, 902, 903, 904"
        )
        print(
            "10, 1001, 1002, 1003, 1004"
        )

        print("====================================")
        print("")


    finally:
        db.close()


if __name__ == "__main__":
    seed_database()