def generate_roadmap(role_skills, missing_skills, weak_skills):
    """
    Generates a phased learning roadmap with time estimates (in weeks)
    """

    roadmap = {
        "phase_1": {
            "title": "Core Foundations",
            "skills": [],
            "estimated_weeks": 0
        },
        "phase_2": {
            "title": "Strengthen Core Skills",
            "skills": [],
            "estimated_weeks": 0
        },
        "phase_3": {
            "title": "Supporting & Tooling Skills",
            "skills": [],
            "estimated_weeks": 0
        }
    }

    for skill in role_skills:
        skill_name = skill["skill_name"]
        importance = skill["importance"]

        if skill_name in missing_skills and importance == "core":
            roadmap["phase_1"]["skills"].append(skill_name)

        elif skill_name in weak_skills and importance == "core":
            roadmap["phase_2"]["skills"].append(skill_name)

        elif importance == "secondary":
            roadmap["phase_3"]["skills"].append(skill_name)

    # Simple time estimation rules
    roadmap["phase_1"]["estimated_weeks"] = len(roadmap["phase_1"]["skills"]) * 2
    roadmap["phase_2"]["estimated_weeks"] = len(roadmap["phase_2"]["skills"]) * 1
    roadmap["phase_3"]["estimated_weeks"] = len(roadmap["phase_3"]["skills"]) * 1

    return roadmap
