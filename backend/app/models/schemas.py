from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Any, Dict

# Drive Schemas
class DriveBase(BaseModel):
    title: str
    company: str
    date: str
    location: str
    job_role: str
    expected_candidates: int = 300
    stages: List[str]

class DriveCreate(DriveBase):
    pass

class DriveResponse(DriveBase):
    id: str
    status: str
    model_config = ConfigDict(from_attributes=True)

# Candidate Schemas
class CandidateBase(BaseModel):
    candidate_code: str
    name: str
    email: str
    phone: str
    current_stage: str
    status: str
    total_wait_minutes: float = 0.0
    friction_score: float = 0.0
    dropout_probability: float = 0.0
    silent_dropout: bool = False
    top_risk_factors: List[str] = []

class CandidateResponse(CandidateBase):
    id: str
    drive_id: str
    registration_time: Optional[str] = None
    hr_start: Optional[str] = None
    hr_end: Optional[str] = None
    technical_start: Optional[str] = None
    technical_end: Optional[str] = None
    managerial_start: Optional[str] = None
    managerial_end: Optional[str] = None
    final_start: Optional[str] = None
    final_end: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

# Feedback Schemas
class FeedbackCreate(BaseModel):
    drive_id: str
    candidate_id: str
    rating: int = Field(..., ge=1, le=5)
    issue_category: str
    feedback_text: str
    is_voice: bool = False
    voice_transcript: Optional[str] = None

class FeedbackResponse(BaseModel):
    id: str
    drive_id: str
    candidate_id: str
    candidate_name: Optional[str] = None
    stage_name: Optional[str] = None
    rating: int
    issue_category: str
    feedback_text: str
    is_voice: bool
    sentiment: str
    topics: List[str]
    severity: str
    root_cause: Optional[str] = None
    suggested_action: Optional[str] = None
    created_at: Optional[Any] = None
    model_config = ConfigDict(from_attributes=True)

# Simulation Request/Response
class SimulationInput(BaseModel):
    drive_id: str
    tech_interviewers: int = Field(3, ge=1, le=20)
    hr_interviewers: int = Field(4, ge=1, le=20)
    managerial_interviewers: int = Field(3, ge=1, le=20)
    avg_tech_duration_mins: float = Field(20.0, ge=5.0, le=60.0)
    avg_hr_duration_mins: float = Field(15.0, ge=5.0, le=45.0)
    avg_managerial_duration_mins: float = Field(25.0, ge=5.0, le=60.0)
    break_duration_mins: float = Field(15.0, ge=0.0, le=60.0)
    parallel_rooms: int = Field(8, ge=1, le=30)

class ScenarioResult(BaseModel):
    avg_waiting_time_mins: float
    max_queue_length: int
    total_process_duration_hours: float
    candidate_throughput_per_hour: float
    predicted_dropout_rate_pct: float
    candidate_satisfaction_score: float

class SimulationResponse(BaseModel):
    drive_id: str
    current_scenario: ScenarioResult
    simulated_scenario: ScenarioResult
    delta_waiting_time_pct: float
    delta_dropout_pct: float
    delta_duration_hours: float

# Analytics KPIs Response
class AnalyticsKPIs(BaseModel):
    total_candidates: int
    selected: int
    in_progress: int
    dropouts: int
    avg_waiting_time_mins: float
    candidate_experience_score: float
    overall_process_duration_hours: float
    high_risk_candidates_count: int
    highest_friction_stage: str

# Live AI Analysis Request
class TextAnalysisRequest(BaseModel):
    feedback_text: str
    stage_name: Optional[str] = "Technical Round"

class TextAnalysisResponse(BaseModel):
    sentiment: str
    topics: List[str]
    severity: str
    root_cause: str
    suggested_action: str
