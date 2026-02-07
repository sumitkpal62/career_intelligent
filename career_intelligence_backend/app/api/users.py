from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.db.models import User
from app.core.auth import get_current_user_id

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me")
async def get_current_user(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()

    if not user:
        return {"error": "User not found"}

    return {
        "email": user.email,
        "created_at": user.created_at,
    }

