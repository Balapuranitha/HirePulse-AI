from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine, SessionLocal
from app.services.seed_data import seed_demo_data

from app.api.drives import router as drives_router
from app.api.candidates import router as candidates_router
from app.api.analytics import router as analytics_router
from app.api.feedback import router as feedback_router
from app.api.dropout import router as dropout_router
from app.api.ai import router as ai_router
from app.api.simulation import router as simulation_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables & seed data on startup
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_demo_data(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="HirePulse AI - Candidate Journey Intelligence & Recruitment Optimization Platform",
    lifespan=lifespan
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers with /api prefix AND without prefix for Vercel Serverless path flexibility
app.include_router(drives_router, prefix="/api")
app.include_router(candidates_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
app.include_router(feedback_router, prefix="/api")
app.include_router(dropout_router, prefix="/api")
app.include_router(ai_router, prefix="/api")
app.include_router(simulation_router, prefix="/api")

# Duplicate registration without /api prefix to handle direct serverless rewrites
app.include_router(drives_router, prefix="")
app.include_router(candidates_router, prefix="")
app.include_router(analytics_router, prefix="")
app.include_router(feedback_router, prefix="")
app.include_router(dropout_router, prefix="")
app.include_router(ai_router, prefix="")
app.include_router(simulation_router, prefix="")

@app.get("/")
@app.get("/api")
@app.get("/api/")
def root():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "demo_mode": settings.DEMO_MODE,
        "docs": "/docs"
    }
