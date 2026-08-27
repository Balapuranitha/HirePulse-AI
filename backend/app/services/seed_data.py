import random
from sqlalchemy.orm import Session
from app.models.db_models import Drive, Candidate, CandidateFeedback, StageMetric
from app.services.ai_engine import ai_service

FIRST_NAMES = ["Aarav", "Ananya", "Rohan", "Priya", "Vikram", "Sneha", "Aditya", "Neha", "Rahul", "Kavya", 
               "Karan", "Pooja", "Amit", "Ritu", "Siddharth", "Meera", "Varun", "Simran", "Dev", "Divya",
               "Arjun", "Isha", "Nikhil", "Tanvi", "Rajesh", "Swati", "Suresh", "Bhavna", "Manish", "Deepika"]

LAST_NAMES = ["Sharma", "Verma", "Patel", "Gupta", "Singh", "Kumar", "Rao", "Joshi", "Mehta", "Nair", 
              "Reddy", "Chopra", "Deshmukh", "Pillai", "Iyer", "Banerjee", "Chatterjee", "Kulkarni", "Bhat", "Shah"]

SAMPLE_FEEDBACKS = [
    {
        "rating": 1,
        "issue_category": "Waiting Time",
        "feedback_text": "The interviewers were professional, but I waited almost 90 minutes before the technical round and did not receive any update.",
        "stage": "Technical Round",
        "is_voice": True,
        "voice_transcript": "I came in at 9:30 AM and completed HR quickly, but then spent over an hour and a half sitting outside the technical panel room without anyone giving us queue updates. It was really frustrating."
    },
    {
        "rating": 2,
        "issue_category": "HR Communication",
        "feedback_text": "No proper queue display system. Nobody could tell me how many people were ahead of me in the technical evaluation line.",
        "stage": "Technical Round",
        "is_voice": False,
        "voice_transcript": None
    },
    {
        "rating": 2,
        "issue_category": "Infrastructure",
        "feedback_text": "The waiting area became extremely crowded around 11:30 AM. Not enough chairs and air conditioning was failing.",
        "stage": "Technical Round",
        "is_voice": True,
        "voice_transcript": "The waiting hall was packed and hot. Standing for 75 minutes before a coding interview really drains your energy."
    },
    {
        "rating": 4,
        "issue_category": "Interview Process",
        "feedback_text": "Technical interview panel was knowledgeable and tested real problem solving rather than trivia.",
        "stage": "Technical Round",
        "is_voice": False,
        "voice_transcript": None
    },
    {
        "rating": 5,
        "issue_category": "Registration",
        "feedback_text": "Digital QR registration at the gate was super fast and smooth. Got my token instantly.",
        "stage": "Registration",
        "is_voice": False,
        "voice_transcript": None
    },
    {
        "rating": 1,
        "issue_category": "Waiting Time",
        "feedback_text": "Waited 85 minutes for my technical turn only to be told the panel took a lunch break. Poor coordination.",
        "stage": "Technical Round",
        "is_voice": True,
        "voice_transcript": "I was 2nd in line when lunch break was called without prior announcement. Stood waiting for 85 minutes total."
    },
    {
        "rating": 3,
        "issue_category": "Job Role Clarity",
        "feedback_text": "HR screening was good, but the technical stack requested during the interview differed slightly from the JD.",
        "stage": "HR Screening",
        "is_voice": False,
        "voice_transcript": None
    },
    {
        "rating": 5,
        "issue_category": "Interviewer Behavior",
        "feedback_text": "Managerial round was very insightful. The Director gave clear details on team projects and growth opportunities.",
        "stage": "Managerial Round",
        "is_voice": False,
        "voice_transcript": None
    }
]

def seed_demo_data(db: Session):
    # Check if drive already seeded
    existing_drive = db.query(Drive).filter(Drive.id == "DRIVE-2026-001").first()
    if existing_drive:
        return

    random.seed(42) # Deterministic demo seed

    # 1. Create Default Drive
    drive = Drive(
        id="DRIVE-2026-001",
        title="Software Engineer Walk-In Drive 2026",
        company="HirePulse Tech Solutions",
        date="2026-08-27",
        location="Tech Hub Building A, Floor 4",
        job_role="Senior Full-Stack Engineer (React / Python)",
        expected_candidates=300,
        stages=["Registration", "HR Screening", "Technical Round", "Managerial Round", "Final Decision"],
        status="Active"
    )
    db.add(drive)

    # 2. Seed Stage Metrics
    stages_data = [
        {"name": "Registration", "order": 1, "entered": 300, "completed": 295, "wait": 12.5, "proc": 5.0, "dropout": 5, "neg": 0.08, "friction": 18.0, "bottleneck": "Low friction"},
        {"name": "HR Screening", "order": 2, "entered": 295, "completed": 260, "wait": 28.0, "proc": 12.0, "dropout": 12, "neg": 0.15, "friction": 32.0, "bottleneck": "Medium friction"},
        {"name": "Technical Round", "order": 3, "entered": 248, "completed": 160, "wait": 78.5, "proc": 25.0, "dropout": 48, "neg": 0.42, "friction": 78.0, "bottleneck": "Critical bottleneck"},
        {"name": "Managerial Round", "order": 4, "entered": 112, "completed": 78, "wait": 35.0, "proc": 22.0, "dropout": 6, "neg": 0.18, "friction": 41.0, "bottleneck": "Medium friction"},
        {"name": "Final Decision", "order": 5, "entered": 72, "completed": 42, "wait": 15.0, "proc": 15.0, "dropout": 1, "neg": 0.05, "friction": 14.0, "bottleneck": "Low friction"},
    ]

    for sd in stages_data:
        sm = StageMetric(
            id=f"SM-{sd['order']}",
            drive_id="DRIVE-2026-001",
            stage_name=sd["name"],
            stage_order=sd["order"],
            entered_count=sd["entered"],
            completed_count=sd["completed"],
            avg_wait_mins=sd["wait"],
            avg_process_mins=sd["proc"],
            dropout_count=sd["dropout"],
            negative_feedback_pct=sd["neg"],
            friction_score=sd["friction"],
            bottleneck_status=sd["bottleneck"]
        )
        db.add(sm)

    # 3. Seed Candidates (300 total)
    stages_list = ["Registration", "HR Screening", "Technical Round", "Managerial Round", "Final Decision"]
    
    # 42 selected, ~72 dropouts, remaining in progress / rejected
    statuses = (["Selected"] * 42) + (["Dropout"] * 72) + (["Rejected"] * 126) + (["In Progress"] * 60)
    random.shuffle(statuses)

    for i in range(1, 301):
        c_code = f"HP-{100 + i}"
        fname = random.choice(FIRST_NAMES)
        lname = random.choice(LAST_NAMES)
        name = f"{fname} {lname}"
        email = f"{fname.lower()}.{lname.lower()}{i}@example.com"
        phone = f"+91 98765 {10000 + i}"
        status = statuses[i-1]

        # Stage determination based on status
        if status == "Selected":
            current_stage = "Final Decision"
            total_wait = random.uniform(45.0, 75.0)
            friction = random.uniform(20.0, 40.0)
            dropout_prob = random.uniform(0.08, 0.25)
            is_silent = False
            risk_factors = ["Standard wait time"]
        elif status == "Dropout":
            # Mostly dropped out at Technical Round after long wait
            current_stage = random.choice(["Technical Round", "Technical Round", "HR Screening", "Managerial Round"])
            total_wait = random.uniform(70.0, 115.0)
            friction = random.uniform(65.0, 92.0)
            dropout_prob = random.uniform(0.68, 0.92)
            is_silent = random.choice([True, True, False]) # ~66% silent dropouts
            risk_factors = [
                "Extended technical wait time (>75 mins)",
                "No queue update received",
                "Early stage process stalling"
            ]
        elif status == "Rejected":
            current_stage = random.choice(["HR Screening", "Technical Round", "Managerial Round"])
            total_wait = random.uniform(50.0, 85.0)
            friction = random.uniform(35.0, 60.0)
            dropout_prob = random.uniform(0.20, 0.45)
            is_silent = False
            risk_factors = ["Moderate wait variance"]
        else: # In Progress
            current_stage = random.choice(["HR Screening", "Technical Round", "Managerial Round"])
            total_wait = random.uniform(30.0, 70.0)
            friction = random.uniform(30.0, 55.0)
            dropout_prob = random.uniform(0.25, 0.50)
            is_silent = False
            risk_factors = ["Waiting for panel assignment"]

        # Signature candidate #184 for demo scenario
        if i == 184:
            status = "Dropout"
            current_stage = "Technical Round"
            total_wait = 84.0
            friction = 86.5
            dropout_prob = 0.78
            is_silent = True
            name = "Ananya Verma (Demo Signature Candidate)"
            risk_factors = [
                "Waiting time: 84 min in Technical Queue",
                "Rounds completed: 1/3 (HR Done)",
                "Communication status: No status update",
                "High risk classification: Probable Process-Induced Dropout"
            ]

        candidate = Candidate(
            id=f"CAND-{i:03d}",
            drive_id="DRIVE-2026-001",
            candidate_code=c_code,
            name=name,
            email=email,
            phone=phone,
            current_stage=current_stage,
            status=status,
            registration_time="09:15 AM",
            hr_start="09:40 AM",
            hr_end="09:55 AM",
            technical_start="10:15 AM" if status != "Dropout" or i != 184 else None,
            technical_end="10:40 AM" if current_stage in ["Managerial Round", "Final Decision"] else None,
            managerial_start="11:00 AM" if current_stage == "Final Decision" else None,
            managerial_end="11:25 AM" if current_stage == "Final Decision" else None,
            total_wait_minutes=round(total_wait, 1),
            friction_score=round(friction, 1),
            dropout_probability=round(dropout_prob, 2),
            silent_dropout=is_silent,
            top_risk_factors=risk_factors
        )
        db.add(candidate)

        # 4. Add Candidate Feedback for ~120 candidates
        if i <= 120 or i == 184:
            fb_sample = random.choice(SAMPLE_FEEDBACKS)
            analysis = ai_service.analyze_feedback(fb_sample["feedback_text"], fb_sample["stage"])
            
            fb = CandidateFeedback(
                id=f"FB-{i:03d}",
                drive_id="DRIVE-2026-001",
                candidate_id=f"CAND-{i:03d}",
                candidate_name=name,
                stage_name=fb_sample["stage"],
                rating=fb_sample["rating"],
                issue_category=fb_sample["issue_category"],
                feedback_text=fb_sample["feedback_text"],
                is_voice=fb_sample["is_voice"],
                voice_transcript=fb_sample["voice_transcript"],
                sentiment=analysis["sentiment"],
                topics=analysis["topics"],
                severity=analysis["severity"],
                root_cause=analysis["root_cause"],
                suggested_action=analysis["suggested_action"]
            )
            db.add(fb)

    db.commit()
    print("Demo dataset seeded successfully (300 candidates loaded).")
