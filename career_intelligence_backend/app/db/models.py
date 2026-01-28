from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, JSON

class Base(DeclarativeBase):
    pass


class UserProgress(Base):
    __tablename__ = "user_progress"

    user_id: Mapped[str] = mapped_column(String, primary_key=True)
    completed_skills: Mapped[dict] = mapped_column(JSON)
