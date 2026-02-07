from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.db.models import UserProgress
from app.core.auth import get_current_user_id

router = APIRouter(prefix="/progress", tags=["Progress"])


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