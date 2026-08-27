from fastapi.testclient import TestClient
from app.main import app

def test_backend_suite():
    with TestClient(app) as client:
        # 1. Root endpoint
        res = client.get("/")
        assert res.status_code == 200
        assert res.json()["app"] == "HirePulse AI"

        # 2. Get drives
        res = client.get("/api/drives")
        assert res.status_code == 200
        drives = res.json()
        assert len(drives) >= 1
        assert drives[0]["id"] == "DRIVE-2026-001"

        # 3. Get candidates
        res = client.get("/api/candidates?drive_id=DRIVE-2026-001")
        assert res.status_code == 200
        candidates = res.json()
        assert len(candidates) == 300

        # 4. Get KPIs
        res = client.get("/api/analytics/kpis")
        assert res.status_code == 200
        kpis = res.json()
        assert kpis["total_candidates"] == 300
        assert kpis["highest_friction_stage"] == "Technical Round"

        # 5. Get charts
        res = client.get("/api/analytics/charts")
        assert res.status_code == 200
        charts = res.json()
        assert "funnel" in charts
        assert "hourly_flow" in charts

        # 6. Run process simulation
        payload = {
            "drive_id": "DRIVE-2026-001",
            "tech_interviewers": 4,
            "hr_interviewers": 4,
            "managerial_interviewers": 3,
            "avg_tech_duration_mins": 20.0,
            "avg_hr_duration_mins": 15.0,
            "avg_managerial_duration_mins": 25.0,
            "break_duration_mins": 15.0,
            "parallel_rooms": 8
        }
        res = client.post("/api/simulation/run", json=payload)
        assert res.status_code == 200
        sim = res.json()
        assert sim["simulated_scenario"]["avg_waiting_time_mins"] < sim["current_scenario"]["avg_waiting_time_mins"]

        # 7. Analyze text feedback
        fb_payload = {
            "feedback_text": "I waited 90 minutes for my technical interview without receiving any queue update.",
            "stage_name": "Technical Round"
        }
        res = client.post("/api/feedback/analyze-text", json=fb_payload)
        assert res.status_code == 200
        fb_res = res.json()
        assert fb_res["sentiment"] == "Negative"
        assert "Waiting Time" in fb_res["topics"]
