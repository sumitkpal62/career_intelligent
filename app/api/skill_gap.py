from fastapi import APIRouter
from app.services.skill_gap import analyze_skill_gap
from app.services.roadmap import generate_roadmap

router = APIRouter(prefix="/analyze", tags=["Skill Gap Analysis"])


@router.post("/skill-gap")
def skill_gap_analysis(user_skills: list[dict]):
    role_skills = [
        {"skill_id": "skill-001", "skill_name": "Python", "importance": "core", "weight": 5},
        {"skill_id": "skill-002", "skill_name": "SQL", "importance": "core", "weight": 5},
        {"skill_id": "skill-003", "skill_name": "ETL Concepts", "importance": "core", "weight": 5},
        {"skill_id": "skill-004", "skill_name": "Data Modeling", "importance": "core", "weight": 4},
        {"skill_id": "skill-005", "skill_name": "Airflow (Basics)", "importance": "secondary", "weight": 3},
        {"skill_id": "skill-006", "skill_name": "Git", "importance": "secondary", "weight": 2},
    ]

    analysis_result = analyze_skill_gap(role_skills, user_skills)

    roadmap = generate_roadmap(
        role_skills=role_skills,
        missing_skills=analysis_result["missing_skills"],
        weak_skills=analysis_result["weak_skills"]
    )

    return {
        "analysis": analysis_result,
        "roadmap": roadmap
    }
