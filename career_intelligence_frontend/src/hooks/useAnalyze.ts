import { useState, useEffect } from "react";
import { analyzeSkills } from "@/services/analyzeService";
import { AnalyzeResponse, SkillPayload } from "@/types/analyze";
import { API_BASE_URL } from "@/lib/config";
import { useRouter } from "next/navigation";

export function useAnalyze(token: string | null) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

      useEffect(() => {
    if(!token) {
      router.push("/login");
      return;
    }
  }, [token])

    const runAnalysis = async (payload: SkillPayload[]) => {
        if(!token) return;

        const existingRoadmap = sessionStorage.getItem("roadmap");

        // if workflow reset
        if(existingRoadmap) {
            const confirmReset = confirm(
                "You already have a roadmap. Starting a new analysis will reset your progress. Continue?"
            );

            if(!confirmReset) return;

            await fetch(`${API_BASE_URL}/progress/reset`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            sessionStorage.removeItem("roadmap");
            setResult(null);
        }

        setLoading(true);
        setError(null);

        try {
            const data = await analyzeSkills(payload);
            sessionStorage.setItem("roadmap", JSON.stringify(data.roadmap));
            setResult(data);
        } catch(err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        runAnalysis,
        loading,
        result,
        error,
    };
}