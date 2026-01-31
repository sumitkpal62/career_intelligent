from fastapi import APIRouter
from app.schemas.progress import ProgressPayload
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import Depends

from app.db.database import get_db
from app.db.models import UserProgress
from app.schemas.progress import ProgressPayload
from app.core.auth import get_current_user_id


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
