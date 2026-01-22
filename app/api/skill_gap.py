from fastapi import APIRouter
from app.services.skill_gap import analyze_skill_gap

router = APIRouter(prefix="/analyze", tags=["Skill Gap Analysis"])


@router.post("/skill-gap")
def skill_gap_analysis(user_skills: list[dict]):
    # Hardcoded role-skill mapping (temporary)
    role_skills = [
        {"skill_id": "skill-001", "skill_name": "Python", "importance": "core", "weight": 5},
        {"skill_id": "skill-002", "skill_name": "SQL", "importance": "core", "weight": 5},
        {"skill_id": "skill-003", "skill_name": "ETL Concepts", "importance": "core", "weight": 5},
        {"skill_id": "skill-004", "skill_name": "Data Modeling", "importance": "core", "weight": 4},
        {"skill_id": "skill-005", "skill_name": "Airflow (Basics)", "importance": "secondary", "weight": 3},
        {"skill_id": "skill-006", "skill_name": "Git", "importance": "secondary", "weight": 2},
    ]

    return analyze_skill_gap(role_skills, user_skills)
