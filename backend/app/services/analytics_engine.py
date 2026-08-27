from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.db_models import Candidate, CandidateFeedback, StageMetric, Drive

class AnalyticsEngine:
    @staticmethod
    def calculate_friction_score(
        avg_wait_mins: float,
        target_wait_mins: float,
        negative_feedback_pct: float,
        dropout_pct: float,
        delays_count: int = 1
    ) -> float:
        """
        Calculates Candidate Friction Score (0 to 100).
        Higher score = worse candidate experience.
        """
        wait_factor = min(100.0, (avg_wait_mins / max(1.0, target_wait_mins)) * 30.0)
        neg_factor = min(100.0, negative_feedback_pct * 100.0) * 0.35
        dropout_factor = min(100.0, dropout_pct * 100.0) * 0.25
        delay_factor = min(100.0, delays_count * 10.0) * 0.10

        total = wait_factor + neg_factor + dropout_factor + delay_factor
        return round(min(100.0, max(0.0, total)), 1)

    @staticmethod
    def get_stage_friction_breakdown(db: Session, drive_id: str) -> List[Dict[str, Any]]:
        stages = db.query(StageMetric).filter(StageMetric.drive_id == drive_id).order_by(StageMetric.stage_order).all()
        result = []
        for s in stages:
            is_critical = s.friction_score >= 70.0
            result.append({
                "stage_name": s.stage_name,
                "stage_order": s.stage_order,
                "entered_count": s.entered_count,
                "completed_count": s.completed_count,
                "avg_wait_mins": s.avg_wait_mins,
                "avg_process_mins": s.avg_process_mins,
                "dropout_count": s.dropout_count,
                "negative_feedback_pct": round(s.negative_feedback_pct * 100, 1),
                "friction_score": s.friction_score,
                "bottleneck_status": s.bottleneck_status,
                "is_critical_friction": is_critical,
                "possible_cause": "Capacity shortage & extended queue wait time" if is_critical else "Normal flow operations"
            })
        return result

    @staticmethod
    def get_hourly_candidate_flow(db: Session, drive_id: str) -> List[Dict[str, Any]]:
        return [
            {"hour": "09:00 AM", "arrivals": 65, "processed": 45, "queue": 20},
            {"hour": "10:00 AM", "arrivals": 85, "processed": 55, "queue": 50},
            {"hour": "11:00 AM", "arrivals": 70, "processed": 48, "queue": 72},
            {"hour": "12:00 PM", "arrivals": 45, "processed": 50, "queue": 67},
            {"hour": "01:00 PM", "arrivals": 20, "processed": 35, "queue": 52},
            {"hour": "02:00 PM", "arrivals": 15, "processed": 40, "queue": 27},
            {"hour": "03:00 PM", "arrivals": 0,  "processed": 27, "queue": 0},
        ]

    @staticmethod
    def get_interviewer_utilization(db: Session, drive_id: str) -> List[Dict[str, Any]]:
        return [
            {"stage": "HR Screening", "interviewers": 4, "utilization_pct": 82.5, "avg_duration_mins": 14.2},
            {"stage": "Technical Round", "interviewers": 3, "utilization_pct": 98.0, "avg_duration_mins": 22.5},
            {"stage": "Managerial Round", "interviewers": 3, "utilization_pct": 74.0, "avg_duration_mins": 24.0},
        ]
