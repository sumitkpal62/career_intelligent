from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.db.models import User
from app.schemas.auth import SignupRequest
from app.core.security import hash_password

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    payload: SignupRequest,
    db: AsyncSession = Depends(get_db)
):
    # 1. Check if user is already exists
    result = await db.execute(
        select(User).where(User.email == payload.email)
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already registered"
        )

    # 2. Hash password
    hashed_password = hash_password(payload.password)

    # 3. Create user
    user = User(
        email=payload.email,
        hashed_password=hashed_password
    )

    # 4. Add user to DB
    db.add(user)
    await db.commit()

    return {
        "message": "User created successfully"
    }