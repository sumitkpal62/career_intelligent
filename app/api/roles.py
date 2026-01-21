from fastapi import APIRouter

router = APIRouter(prefix="/roles", tags=["Roles"])


@router.get("/")
def get_roles():
    return [
        {
            "id": "de-001",
            "name": "Data Engineer",
            "description": "Builds and maintains data pipelines and data platforms",
            "difficulty_level": "entry"
        }
    ]
