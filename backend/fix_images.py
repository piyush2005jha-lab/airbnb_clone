from database import SessionLocal
from models import ListingImage


BROKEN_URL = (
    "https://images.unsplash.com/"
    "photo-1600566753051-1a4f5d8c0f75"
)

FIXED_URL = (
    "https://images.unsplash.com/"
    "photo-1600566753190-17f0baa2a6c3"
)


def fix_broken_images():
    db = SessionLocal()

    try:
        images = (
            db.query(ListingImage)
            .filter(ListingImage.image_url == BROKEN_URL)
            .all()
        )

        print(f"Found {len(images)} broken images.")

        for image in images:
            print(
                f"Fixing image ID {image.id} "
                f"for listing {image.listing_id}"
            )

            image.image_url = FIXED_URL

        db.commit()

        print("====================================")
        print("All broken images fixed successfully.")
        print("====================================")

    except Exception as error:
        db.rollback()
        print("Error:", error)

    finally:
        db.close()


if __name__ == "__main__":
    fix_broken_images()