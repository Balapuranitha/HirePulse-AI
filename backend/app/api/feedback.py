from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.db_models import CandidateFeedback, Candidate
from app.models.schemas import FeedbackCreate, FeedbackResponse, TextAnalysisRequest, TextAnalysisResponse
from app.services.ai_engine import ai_service

router = APIRouter(prefix="/feedback", tags=["Feedback"])

@router.get("", response_model=List[FeedbackResponse])
def get_feedbacks(
    drive_id: str = "DRIVE-2026-001",
    category: Optional[str] = None,
    sentiment: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(CandidateFeedback).filter(CandidateFeedback.drive_id == drive_id)
    if category:
        query = query.filter(CandidateFeedback.issue_category == category)
    if sentiment:
        query = query.filter(CandidateFeedback.sentiment == sentiment)
    return query.order_by(CandidateFeedback.created_at.desc()).all()

@router.post("", response_model=FeedbackResponse)
def submit_feedback(fb_in: FeedbackCreate, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(Candidate.id == fb_in.candidate_id).first()
    cand_name = candidate.name if candidate else "Anonymous Candidate"
    stage_name = candidate.current_stage if candidate else "Technical Round"

    text_to_analyze = fb_in.voice_transcript if (fb_in.is_voice and fb_in.voice_transcript) else fb_in.feedback_text
    analysis = ai_service.analyze_feedback(text_to_analyze, stage_name)

    new_id = f"FB-{db.query(CandidateFeedback).count() + 1:04d}"
    fb = CandidateFeedback(
        id=new_id,
        drive_id=fb_in.drive_id,
        candidate_id=fb_in.candidate_id,
        candidate_name=cand_name,
        stage_name=stage_name,
        rating=fb_in.rating,
        issue_category=fb_in.issue_category,
        feedback_text=fb_in.feedback_text,
        is_voice=fb_in.is_voice,
        voice_transcript=fb_in.voice_transcript,
        sentiment=analysis["sentiment"],
        topics=analysis["topics"],
        severity=analysis["severity"],
        root_cause=analysis["root_cause"],
        suggested_action=analysis["suggested_action"]
    )
    db.add(fb)
    db.commit()
    db.refresh(fb)
    return fb

@router.post("/analyze-text", response_model=TextAnalysisResponse)
def analyze_text_live(req: TextAnalysisRequest):
    analysis = ai_service.analyze_feedback(req.feedback_text, req.stage_name or "Technical Round")
    return TextAnalysisResponse(
        sentiment=analysis["sentiment"],
        topics=analysis["topics"],
        severity=analysis["severity"],
        root_cause=analysis["root_cause"],
        suggested_action=analysis["suggested_action"]
    )
