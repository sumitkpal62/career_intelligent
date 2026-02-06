import { API_BASE_URL } from "@/lib/config";
import { SkillPayload, AnalyzeResponse } from "@/types/analyze";

export async function analyzeSkills(
    payload: SkillPayload[]
): Promise<AnalyzeResponse> {
    const res = await fetch(`${API_BASE_URL}/analyze/skill-gap`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if(!res.ok) {
        throw new Error("Failed to analyze skills");
    }

    return res.json();
}