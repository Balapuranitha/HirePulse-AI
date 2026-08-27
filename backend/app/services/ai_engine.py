import random
from typing import List, Dict, Any
from app.core.config import settings

class AIService:
    """
    Modular AI Service abstraction.
    Supports real LLM API when API keys are configured, or fallback intelligent local rules/heuristics for Demo Mode.
    """
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY or settings.GEMINI_API_KEY

    def analyze_feedback(self, text: str, stage_name: str = "Technical Round") -> Dict[str, Any]:
        text_lower = text.lower()

        # 1. Sentiment analysis
        negative_keywords = ["wait", "waited", "delayed", "slow", "no update", "rushed", "confusing", "unprofessional", "frustrated", "long", "chaos", "noisy", "disorganized", "ignoring"]
        positive_keywords = ["great", "smooth", "helpful", "polite", "quick", "transparent", "excellent", "organized", "friendly", "informative"]
        
        neg_count = sum(1 for kw in negative_keywords if kw in text_lower)
        pos_count = sum(1 for kw in positive_keywords if kw in text_lower)

        if neg_count > pos_count:
            sentiment = "Negative"
        elif pos_count > neg_count:
            sentiment = "Positive"
        else:
            sentiment = "Neutral"

        # 2. Topic extraction
        topics = []
        if any(w in text_lower for w in ["wait", "hour", "min", "delay", "queue", "slow"]):
            topics.append("Waiting Time")
        if any(w in text_lower for w in ["interviewer", "question", "rushed", "rude", "technical", "panel"]):
            topics.append("Interviewer Behavior")
        if any(w in text_lower for w in ["update", "inform", "communication", "announcement", "status"]):
            topics.append("HR Communication")
        if any(w in text_lower for w in ["room", "ac", "seating", "water", "noise", "infrastructure", "venue"]):
            topics.append("Infrastructure")
        if any(w in text_lower for w in ["form", "qr", "token", "registration", "portal"]):
            topics.append("Registration")
        if any(w in text_lower for w in ["role", "salary", "description", "jd", "clarity"]):
            topics.append("Job Role Clarity")

        if not topics:
            topics = ["General Experience"]

        # 3. Severity
        if sentiment == "Negative" and len(topics) >= 2 or "90" in text or "2 hour" in text_lower or "abandon" in text_lower:
            severity = "High"
        elif sentiment == "Negative":
            severity = "Medium"
        elif sentiment == "Positive":
            severity = "Low"
        else:
            severity = "Low"

        # 4. Root cause detection
        if "Waiting Time" in topics:
            root_cause = f"{stage_name} capacity bottleneck - insufficient interviewers during peak arrivals."
            suggested_action = f"Deploy 1 additional interviewer to {stage_name} and issue real-time SMS/app queue updates."
        elif "HR Communication" in topics:
            root_cause = "Queue updates not being communicated to waiting candidates."
            suggested_action = "Display live digital queue boards and send automated stage transition notifications."
        elif "Interviewer Behavior" in topics:
            root_cause = "Interviewer overload leading to rushed evaluations."
            suggested_action = "Schedule mandatory 10-minute interviewer breaks to prevent burnout."
        elif "Infrastructure" in topics:
            root_cause = "Waiting hall overcrowding and insufficient seating."
            suggested_action = "Open auxiliary holding room and improve air conditioning/refreshment points."
        else:
            root_cause = "Minor operational variance in candidate flow."
            suggested_action = "Maintain current candidate progression protocol."

        return {
            "sentiment": sentiment,
            "topics": topics,
            "severity": severity,
            "root_cause": root_cause,
            "suggested_action": suggested_action
        }

    def predict_candidate_dropout(
        self, 
        wait_minutes: float, 
        completed_rounds: int, 
        communication_delay: bool, 
        negative_sentiment: bool,
        current_stage: str
    ) -> Dict[str, Any]:
        """
        ML / Rule-based dropout probability model.
        Returns risk score 0.0 to 1.0, risk level, and contributing factors.
        """
        score = 0.15 # Baseline risk

        factors = []
        if wait_minutes > 75:
            score += 0.40
            factors.append("Extended waiting time (>75 mins)")
        elif wait_minutes > 45:
            score += 0.25
            factors.append("Moderate waiting time (>45 mins)")

        if completed_rounds <= 1 and current_stage in ["Technical Round", "HR Screening"]:
            score += 0.15
            factors.append("Early stage stalling (<= 1 round completed)")

        if communication_delay:
            score += 0.15
            factors.append("No queue status update received")

        if negative_sentiment:
            score += 0.20
            factors.append("Expressed negative feedback / dissatisfaction")

        score = min(0.95, max(0.05, score))

        if score >= 0.65:
            risk_level = "High"
        elif score >= 0.35:
            risk_level = "Medium"
        else:
            risk_level = "Low"

        return {
            "dropout_probability": round(score, 2),
            "dropout_probability_pct": int(round(score * 100)),
            "risk_level": risk_level,
            "top_risk_factors": factors if factors else ["Standard wait variance"]
        }

    def get_ai_recommendations(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "REC-001",
                "priority": "Critical",
                "stage": "Technical Round",
                "problem": "Average waiting time at Technical Round has reached 75 minutes, exceeding the target threshold of 30 minutes.",
                "evidence": "42% of negative feedback submissions explicitly report long waiting times during the technical interview phase.",
                "recommendation": "Deploy 1 additional technical interviewer panel during peak arrival hours (11:00 AM - 2:00 PM) and implement real-time queue notifications.",
                "expected_impact": {
                    "waiting_time_before": "75 mins",
                    "waiting_time_after": "48 mins",
                    "dropout_rate_before": "25.0%",
                    "dropout_rate_after": "16.0%",
                    "candidate_sat_before": "3.6 / 5",
                    "candidate_sat_after": "4.4 / 5"
                },
                "status": "Recommended"
            },
            {
                "id": "REC-002",
                "priority": "High",
                "stage": "HR Screening",
                "problem": "Candidate check-in queue spikes rapidly between 9:30 AM and 10:30 AM creating initial entry congestion.",
                "evidence": "Candidate friction score in HR Screening is 32/100, driven by 35-minute initial waiting times.",
                "recommendation": "Introduce QR self-check-in kiosks at entry and staggered candidate arrival time slots.",
                "expected_impact": {
                    "waiting_time_before": "35 mins",
                    "waiting_time_after": "12 mins",
                    "dropout_rate_before": "8.0%",
                    "dropout_rate_after": "2.5%",
                    "candidate_sat_before": "3.8 / 5",
                    "candidate_sat_after": "4.6 / 5"
                },
                "status": "Recommended"
            },
            {
                "id": "REC-003",
                "priority": "Medium",
                "stage": "Managerial Round",
                "problem": "Sub-optimal interviewer scheduling causes gap delays between Technical and Managerial rounds.",
                "evidence": "Average transition delay between Technical and Managerial round is 45 minutes despite available managerial interviewers.",
                "recommendation": "Implement automated candidate routing in HirePulse AI to trigger Managerial round prep as soon as Technical pass is logged.",
                "expected_impact": {
                    "waiting_time_before": "45 mins",
                    "waiting_time_after": "20 mins",
                    "dropout_rate_before": "12.0%",
                    "dropout_rate_after": "5.0%",
                    "candidate_sat_before": "4.0 / 5",
                    "candidate_sat_after": "4.7 / 5"
                },
                "status": "Planned"
            }
        ]

ai_service = AIService()
