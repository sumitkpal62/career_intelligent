from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, JSON, DateTime
from datetime import datetime
import uuid

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    email: Mapped[str] = mapped_column(
        String,
        unique=True,
        index=True,
        nullable=False,
    )

    hashed_password: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        # For now we are using utcnow, it can be changed later datetime.now(timezone.utc)
        default=datetime.utcnow, 
    )


class UserProgress(Base):
    __tablename__ = "user_progress"

    user_id: Mapped[str] = mapped_column(String, primary_key=True)
    completed_skills: Mapped[dict] = mapped_column(JSON)
