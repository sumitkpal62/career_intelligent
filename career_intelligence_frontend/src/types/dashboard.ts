export type UserInfo = {
    email: string;
    created_at: string;
}

export type ProgressSummary = {
    readiness_percentage: number;
    completed_skills: number;
    remaining_skills: number;
    current_phase: string | null;
}

