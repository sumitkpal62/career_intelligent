"use client";

import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SKILLS = [
  { id: "skill-001", name: "Python" },
  { id: "skill-002", name: "SQL" },
  { id: "skill-003", name: "ETL Concepts" },
  { id: "skill-004", name: "Data Modeling" },
  { id: "skill-005", name: "Airflow (Basics)" },
  { id: "skill-006", name: "Git" },
];

export default function AnalyzePage() {
  const [skills, setSkills] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const updateSkill = (id: string, value: number) => {
    setSkills((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = Object.entries(skills).map(
      ([skill_id, proficiency]) => ({
        skill_id,
        proficiency,
      })
    );

    try {
      const response = await fetch(
        `${API_BASE_URL}/analyze/skill-gap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze skills");
      }

      const data = await response.json();

      // store roadmap for next page
      sessionStorage.setItem(
        "roadmap",
        JSON.stringify(data.roadmap)
      );

      setResult(data);

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
      <div className="space-y-6">
        {SKILLS.map((skill) => (
          <div
            key={skill.id}
            className="
              flex items-center justify-between
              p-4 rounded-md
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
            "
          >
            <span className="font-medium">
              {skill.name}
            </span>

            <select
              value={skills[skill.id] ?? 0}
              onChange={(e) =>
                updateSkill(skill.id, Number(e.target.value))
              }
              className="
                border rounded-md px-3 py-2 text-sm
                bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-600
              "
            >
              <option value={0}>Not Started</option>
              <option value={1}>Beginner</option>
              <option value={2}>Basic</option>
              <option value={3}>Intermediate</option>
              <option value={4}>Advanced</option>
              <option value={5}>Expert</option>
            </select>
          </div>
        ))}
      </div>

      {/* Analyze Button */}
      <div className="mt-10">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="
            px-6 py-3 rounded-md font-medium
            bg-black text-white
            dark:bg-white dark:text-black
            hover:opacity-90
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Analyzing your profile..." : "Analyze My Readiness"}
        </button>
      </div>

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

          <div
            className="
              p-6 rounded-md
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
            "
          >
            <div className="mb-2">
              <strong>Overall Readiness:</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This score reflects how close you are to being job-ready
                for a Data Engineer role.
              </p>
              {result.analysis.readiness_percentage}% (
              {result.analysis.readiness_level})
            </div>

            <div className="mb-2">
              <strong>Missing Skills:</strong>{" "}
              {result.analysis.missing_skills.join(", ") || "None"}
            </div>

            <div className="mb-2">
              <strong>Weak Skills:</strong>{" "}
              {result.analysis.weak_skills.join(", ") || "None"}
            </div>

            <div>
              <strong>Strong Skills:</strong>{" "}
              {result.analysis.strong_skills.join(", ") || "None"}
            </div>
          </div>

          <div
            className="
              p-6 rounded-md
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
            "
          >
            <h4 className="font-semibold mb-4">
              Learning Roadmap
            </h4>

            {Object.entries(result.roadmap).map(
              ([phase, details]: any) => (
                <div key={phase} className="mb-4">
                  <p className="font-medium">
                    {details.title} (
                    {details.estimated_weeks} weeks)
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {details.skills.join(", ") || "—"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
}
