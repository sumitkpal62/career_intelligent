from pydantic import BaseModel
from typing import Dict


class ProgressPayload(BaseModel):
    completed_skills: Dict[str, bool]
