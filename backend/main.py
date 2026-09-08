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
# =========================================
# VERCEL SERVICES PREFIX
# =========================================

@app.middleware("http")
async def strip_vercel_service_prefix(request, call_next):
    path = request.scope.get("path", "")

    if path.startswith("/svc/api"):
        new_path = path[len("/svc/api"):]

        if not new_path:
            new_path = "/"

        request.scope["path"] = new_path

    response = await call_next(request)
    return response


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