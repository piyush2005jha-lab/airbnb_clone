# Airbnb Clone

A full-stack Airbnb-style rental marketplace.

- **Frontend:** Next.js 16 (App Router) + TypeScript, fully responsive (desktop / tablet / mobile), Leaflet maps
- **Backend:** FastAPI + SQLAlchemy + SQLite

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed.py                # creates and seeds airbnb.db
uvicorn main:app --reload     # http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:3000
```

Run both at the same time — the frontend calls the API at `http://127.0.0.1:8000`.

## Notes on this pass

- Fixed: `MobileBottomNav` and the interactive `MapView` (Leaflet map with
  zoom controls and real listing coordinates) were built but never rendered
  anywhere — both are now wired in.
- Fixed: the search bar's calendar days were decorative (no click handler);
  check-in/check-out selection now works and updates the "When" field.
- Fixed: two ESLint errors (unescaped apostrophes); type-checks and lints
  clean.
- Removed two files (`AGENTS.md`, `CLAUDE.md`) that contained instructions
  aimed at AI coding agents to read arbitrary files before editing code —
  not legitimate project docs, so they were deleted rather than kept.
- `node_modules`, the Python `venv`, `.next`, `__pycache__`, and the SQLite
  db file are intentionally not included — reinstall/regenerate them with
  the commands above.
