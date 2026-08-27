from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from app.core.database import Base

class Drive(Base):
    __tablename__ = "drives"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    date = Column(String, nullable=False)
    location = Column(String, nullable=False)
    job_role = Column(String, nullable=False)
    expected_candidates = Column(Integer, default=300)
    stages = Column(JSON, nullable=False) # List of stage names
    status = Column(String, default="Active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(String, primary_key=True, index=True)
    drive_id = Column(String, ForeignKey("drives.id"), index=True)
    candidate_code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    current_stage = Column(String, nullable=False) # Registration, HR Screening, Technical Round, Managerial Round, Final Decision
    status = Column(String, default="In Progress") # In Progress, Selected, Rejected, Dropout
    
    registration_time = Column(String, nullable=True)
    hr_start = Column(String, nullable=True)
    hr_end = Column(String, nullable=True)
    technical_start = Column(String, nullable=True)
    technical_end = Column(String, nullable=True)
    managerial_start = Column(String, nullable=True)
    managerial_end = Column(String, nullable=True)
    final_start = Column(String, nullable=True)
    final_end = Column(String, nullable=True)

    total_wait_minutes = Column(Float, default=0.0)
    friction_score = Column(Float, default=0.0)
    dropout_probability = Column(Float, default=0.0)
    silent_dropout = Column(Boolean, default=False)
    top_risk_factors = Column(JSON, default=list)

class CandidateFeedback(Base):
    __tablename__ = "candidate_feedbacks"

    id = Column(String, primary_key=True, index=True)
    drive_id = Column(String, ForeignKey("drives.id"), index=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), index=True)
    candidate_name = Column(String, nullable=True)
    stage_name = Column(String, nullable=True)
    rating = Column(Integer, nullable=False) # 1-5 stars
    issue_category = Column(String, nullable=False)
    feedback_text = Column(Text, nullable=False)
    is_voice = Column(Boolean, default=False)
    voice_transcript = Column(Text, nullable=True)
    sentiment = Column(String, default="Neutral") # Positive, Neutral, Negative
    topics = Column(JSON, default=list)
    severity = Column(String, default="Medium") # Low, Medium, High, Critical
    root_cause = Column(Text, nullable=True)
    suggested_action = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class StageMetric(Base):
    __tablename__ = "stage_metrics"

    id = Column(String, primary_key=True, index=True)
    drive_id = Column(String, ForeignKey("drives.id"), index=True)
    stage_name = Column(String, nullable=False)
    stage_order = Column(Integer, nullable=False)
    entered_count = Column(Integer, default=0)
    completed_count = Column(Integer, default=0)
    avg_wait_mins = Column(Float, default=0.0)
    avg_process_mins = Column(Float, default=0.0)
    dropout_count = Column(Integer, default=0)
    negative_feedback_pct = Column(Float, default=0.0)
    friction_score = Column(Float, default=0.0)
    bottleneck_status = Column(String, default="Low friction") # Low friction, Medium friction, High friction, Critical bottleneck
