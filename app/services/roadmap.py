def generate_roadmap(role_skills, missing_skills, weak_skills):
    """
    role_skills: list of role-skill mappings
    missing_skills: list of skill names
    weak_skills: list of skill names
    """

    roadmap = {
        "phase_1": [],
        "phase_2": [],
        "phase_3": []
    }

    for skill in role_skills:
        skill_name = skill["skill_name"]
        importance = skill["importance"]

        if skill_name in missing_skills and importance == "core":
            roadmap["phase_1"].append(skill_name)

        elif skill_name in weak_skills and importance == "core":
            roadmap["phase_2"].append(skill_name)

        elif importance == "secondary":
            roadmap["phase_3"].append(skill_name)

    return roadmap
