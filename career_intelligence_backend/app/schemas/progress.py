from pydantic import BaseModel
from typing import Dict


class ProgressPayload(BaseModel):
    user_id: str
    completed_skills: Dict[str, bool]
