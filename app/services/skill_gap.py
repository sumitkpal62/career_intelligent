def analyze_skill_gap(role_skills, user_skills):
    """
    role_skills: list of dicts with keys:
        - skill_id
        - skill_name
        - importance
        - weight

    user_skills: list of dicts with keys:
        - skill_id
        - proficiency (0–5)
    """

    # Convert user skills to lookup map
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
        total_possible_score += weight * 5  # max proficiency = 5

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

    return {
        "readiness_percentage": readiness_percentage,
        "missing_skills": missing_skills,
        "weak_skills": weak_skills,
        "strong_skills": strong_skills
    }
