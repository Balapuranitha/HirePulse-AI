from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.core.database import get_db
from app.models.db_models import Candidate
from app.models.schemas import CandidateResponse

router = APIRouter(prefix="/dropout", tags=["Dropout"])

@router.get("/predictions", response_model=List[CandidateResponse])
def get_dropout_predictions(drive_id: str = "DRIVE-2026-001", db: Session = Depends(get_db)):
    return db.query(Candidate).filter(
        Candidate.drive_id == drive_id,
        Candidate.dropout_probability >= 0.35
    ).order_by(Candidate.dropout_probability.desc()).all()

@router.get("/silent-dropouts", response_model=List[CandidateResponse])
def get_silent_dropouts(drive_id: str = "DRIVE-2026-001", db: Session = Depends(get_db)):
    return db.query(Candidate).filter(
        Candidate.drive_id == drive_id,
        Candidate.silent_dropout == True
    ).order_by(Candidate.total_wait_minutes.desc()).all()
