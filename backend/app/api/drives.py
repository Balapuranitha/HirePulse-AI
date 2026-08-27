from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.db_models import Drive
from app.models.schemas import DriveCreate, DriveResponse

router = APIRouter(prefix="/drives", tags=["Drives"])

@router.get("", response_model=List[DriveResponse])
def get_drives(db: Session = Depends(get_db)):
    return db.query(Drive).all()

@router.get("/{drive_id}", response_model=DriveResponse)
def get_drive(drive_id: str, db: Session = Depends(get_db)):
    drive = db.query(Drive).filter(Drive.id == drive_id).first()
    if not drive:
        raise HTTPException(status_code=404, detail="Drive not found")
    return drive

@router.post("", response_model=DriveResponse)
def create_drive(drive_in: DriveCreate, db: Session = Depends(get_db)):
    new_id = f"DRIVE-2026-{db.query(Drive).count() + 1:03d}"
    drive = Drive(
        id=new_id,
        title=drive_in.title,
        company=drive_in.company,
        date=drive_in.date,
        location=drive_in.location,
        job_role=drive_in.job_role,
        expected_candidates=drive_in.expected_candidates,
        stages=drive_in.stages,
        status="Active"
    )
    db.add(drive)
    db.commit()
    db.refresh(drive)
    return drive
