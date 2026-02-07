from fastapi import APIRouter, Depends
from app.schemas.progress import ProgressPayload
from app.core.auth import get_current_user_id
from app.db.database import get_db
from app.db.models import UserProgress

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select




router = APIRouter(prefix="/progress", tags=["Progress"])

# in-memory store (temporary)
USER_PROGRESS = {}


@router.get("")
async def get_progress(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
    ):
    result = await db.execute(
        select(UserProgress).where(UserProgress.user_id == user_id)
    )
    progress = result.scalar_one_or_none()

    if not progress:
        return {
            "completed_skills": {},
        }

    return {
        "completed_skills": progress.completed_skills,
    }


@router.post("")
async def save_progress(
    payload: ProgressPayload,
    user_id:str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserProgress).where(
            UserProgress.user_id == user_id
        )
    )
    progress = result.scalar_one_or_none()

    if progress:
        progress.completed_skills = payload.completed_skills
    else:
        progress = UserProgress(
            user_id=user_id,
            completed_skills=payload.completed_skills,
        )
        db.add(progress)

    await db.commit()
    return {"status": "saved"}

@router.post("/reset")
async def reset_progress(
    user_id: str = Depends(get_current_user_id),
    db : AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserProgress).where(UserProgress.user_id == user_id)
    )
    progress = result.scalar_one_or_none()

    if progress:
        await db.delete(progress)
        await db.commit()

    return {"status": "progress reset"}

@router.get("/summary")
async def get_progress_summary(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserProgress).where(UserProgress.user_id == user_id)
    )
    progress_items = result.scalars().all()

    if not progress_items:
        return {
            "readiness_percentage": 0,
            "completed_skills": 0,
            "remaining": 0,
            "current_phase": None,
        }

    completed = sum(1 for p in progress_items if p.completed_skills)
    total = len(progress_items)
    remaining = total - completed

    readiness = int((completed / total) * 100) if total > 0 else 0

    return {
            "readiness_percentage": readiness,
            "completed_skills": completed,
            "remaining": remaining,
            "current_phase": "Learning Phase", # Placeholder just for now
    }