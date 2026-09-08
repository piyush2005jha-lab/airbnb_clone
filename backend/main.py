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
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==========================================
# ROUTES
# ==========================================

app.include_router(
    listings_router
)

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