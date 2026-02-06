export type SkillPayload = {
    skill_id: string;
    proficiency: number;
}

export type AnalysisSummary = {
    readiness_percentage: number;
    readiness_level: string;
    missing_skills: string[];
    weak_skills: string[];
    strong_skills: string[];
}

export type RoadmapPhase = {
    title: string;
    estimated_weeks: number;
    skills: string[];
}

export type Roadmap = Record<string, RoadmapPhase>

export type AnalyzeResponse = {
    analysis: AnalysisSummary;
    roadmap: Roadmap;
}