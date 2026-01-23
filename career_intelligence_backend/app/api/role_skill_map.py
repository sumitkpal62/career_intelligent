from fastapi import APIRouter

router = APIRouter(prefix="/role-skill-mapping", tags=["Role Skill Mapping"])


@router.get("/")
def get_role_skill_mapping():
    return {
        "role_id": "de-001",
        "role_name": "Data Engineer",
        "skills": [
            {
                "skill_id": "skill-001",
                "skill_name": "Python",
                "importance": "core",
                "weight": 5
            },
            {
                "skill_id": "skill-002",
                "skill_name": "SQL",
                "importance": "core",
                "weight": 5
            },
            {
                "skill_id": "skill-003",
                "skill_name": "ETL Concepts",
                "importance": "core",
                "weight": 5
            },
            {
                "skill_id": "skill-004",
                "skill_name": "Data Modeling",
                "importance": "core",
                "weight": 4
            },
            {
                "skill_id": "skill-005",
                "skill_name": "Airflow (Basics)",
                "importance": "secondary",
                "weight": 3
            },
            {
                "skill_id": "skill-006",
                "skill_name": "Git",
                "importance": "secondary",
                "weight": 2
            }
        ]
    }
