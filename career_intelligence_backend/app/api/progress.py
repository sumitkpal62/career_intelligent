from fastapi import APIRouter
from app.schemas.progress import ProgressPayload

router = APIRouter(prefix="/progress", tags=["Progress"])

# in-memory store (temporary)
USER_PROGRESS = {}


@router.get("/{user_id}")
def get_progress(user_id: str):
    return {
        "user_id": user_id,
        "completed_skills": USER_PROGRESS.get(user_id, {})
    }


@router.post("")
def save_progress(payload: ProgressPayload):
    USER_PROGRESS[payload.user_id] = payload.completed_skills
    return {"status": "saved"}
