from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

import models

from routes.listings import (
    router as listings_router
)

from routes.bookings import (
    router as bookings_router
)


# ==========================================
# DATABASE
# ==========================================

Base.metadata.create_all(
    bind=engine
)


# ==========================================
# APP
# ==========================================

app = FastAPI(
    title="Airbnb Clone API",
    description="Backend API for Airbnb Clone",
    version="1.0.0",
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "https://airbnb-clone-chi-ten.vercel.app",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==========================================
# LISTING ROUTES
# ==========================================

# Local development
# http://127.0.0.1:8000/api/listings/

app.include_router(
    listings_router,
    prefix="/api/listings",
)


# Vercel Services
# https://airbnb-clone-chi-ten.vercel.app/svc/api/listings/

app.include_router(
    listings_router,
    prefix="/svc/api/listings",
)


# ==========================================
# BOOKING ROUTES
# ==========================================

app.include_router(
    bookings_router
)


# ==========================================
# ROOT
# ==========================================

@app.get("/")
def root():

    return {
        "message": "Airbnb Clone API is running"
    }


# ==========================================
# HEALTH
# ==========================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy"
    }