from fastapi import APIRouter
from typing import List, Dict, Any
from app.services.ai_engine import ai_service

router = APIRouter(prefix="/ai", tags=["AI Engine"])

@router.get("/recommendations")
def get_ai_recommendations():
    return ai_service.get_ai_recommendations()
