from fastapi import APIRouter

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("/")
def get_skills():
    return [
        {
            "id": "skill-001",
            "name": "Python",
            "category": "language"
        },
        {
            "id": "skill-002",
            "name": "SQL",
            "category": "language"
        },
        {
            "id": "skill-003",
            "name": "ETL Concepts",
            "category": "concept"
        },
        {
            "id": "skill-004",
            "name": "Data Modeling",
            "category": "concept"
        },
        {
            "id": "skill-005",
            "name": "Airflow (Basics)",
            "category": "tool"
        },
        {
            "id": "skill-006",
            "name": "Git",
            "category": "tool"
        }
    ]
