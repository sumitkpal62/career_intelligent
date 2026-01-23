def get_readiness_level(readiness_percentage: float) -> str:
    if readiness_percentage <= 30:
        return "Beginner"
    elif readiness_percentage <= 60:
        return "Foundation Ready"
    elif readiness_percentage <= 80:
        return "Junior Data Engineer"
    else:
        return "Job-Ready"


def analyze_skill_gap(role_skills, user_skills):
    user_skill_map = {
        skill["skill_id"]: skill["proficiency"]
        for skill in user_skills
    }

    missing_skills = []
    weak_skills = []
    strong_skills = []

    total_possible_score = 0
    user_score = 0

    for role_skill in role_skills:
        weight = role_skill["weight"]
        total_possible_score += weight * 5

        user_proficiency = user_skill_map.get(role_skill["skill_id"], 0)
        user_score += user_proficiency * weight

        if user_proficiency == 0:
            missing_skills.append(role_skill["skill_name"])
        elif user_proficiency < 3:
            weak_skills.append(role_skill["skill_name"])
        else:
            strong_skills.append(role_skill["skill_name"])

    readiness_percentage = round(
        (user_score / total_possible_score) * 100, 2
    )

    readiness_level = get_readiness_level(readiness_percentage)

    return {
        "readiness_percentage": readiness_percentage,
        "readiness_level": readiness_level,
        "missing_skills": missing_skills,
        "weak_skills": weak_skills,
        "strong_skills": strong_skills
    }
