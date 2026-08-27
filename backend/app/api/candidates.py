from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.db_models import Candidate
from app.models.schemas import CandidateResponse, CandidateBase

router = APIRouter(prefix="/candidates", tags=["Candidates"])

@router.get("", response_model=List[CandidateResponse])
def get_candidates(
    drive_id: str = "DRIVE-2026-001",
    stage: Optional[str] = None,
    status: Optional[str] = None,
    silent_dropout: Optional[bool] = None,
    min_risk: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Candidate).filter(Candidate.drive_id == drive_id)
    if stage:
        query = query.filter(Candidate.current_stage == stage)
    if status:
        query = query.filter(Candidate.status == status)
    if silent_dropout is not None:
        query = query.filter(Candidate.silent_dropout == silent_dropout)
    if min_risk is not None:
        query = query.filter(Candidate.dropout_probability >= min_risk)
    
    return query.order_by(Candidate.friction_score.desc()).all()

@router.get("/{candidate_id}", response_model=CandidateResponse)
def get_candidate(candidate_id: str, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate
