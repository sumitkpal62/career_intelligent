"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAnalyze } from "@/hooks/useAnalyze";
import SkillSelector from "@/components/analyze/SkillSelector";
import AnalyzeButton from "@/components/analyze/AnalyzeButton";
import AnalysisResult from "@/components/analyze/AnalysisResult";
import RoadmapPreview from "@/components/analyze/RoadmapPreview";

export default function AnalyzePage() {
  const {token} = useAuth();
  const { runAnalysis, loading, result, error } = useAnalyze(token);
  const [skills, setSkills] = useState<Record<string, number>>({}); 
  const router = useRouter();



  const updateSkill = (id: string, value: number) => {
    setSkills((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAnalyze = () => {
    const payload = Object.entries(skills).map(
      ([skill_id, proficiency]) => ({
        skill_id,
        proficiency,
      })
    );

    runAnalysis(payload);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-2">
        Skill Readiness Analysis
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Tell us your current skill level. We’ll evaluate your readiness
        for a Data Engineer role and generate a personalized roadmap.
      </p>


      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Select your current proficiency for each skill.
        This helps us calculate your readiness and learning roadmap.
      </p>

      {/* Skill Input */}
      <SkillSelector skills={skills} updateSkill={updateSkill} />

      {/* Analyze Button */}
      <AnalyzeButton loading={loading} onClick={handleAnalyze} />

      {/* Error */}
      {error && (
        <div className="mt-6 text-red-500">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="
              mt-16 space-y-6
              opacity-0 translate-y-4
              animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">
              Analysis Result
            </h3>

            <a
              href="/roadmap"
              onClick={() => {
                if (result?.roadmap) {
                  sessionStorage.setItem(
                    "roadmap",
                    JSON.stringify(result.roadmap)
                  );
                }
              }}
            >
              View Roadmap →
            </a>

          </div>

          <AnalysisResult result={result.analysis} />

          <RoadmapPreview roadmap={result.roadmap}/>
        </div>
      )}
    </main>
  );
}
