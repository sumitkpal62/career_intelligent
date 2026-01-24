"use client";

import { useState } from "react";

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

  const updateSkill = (id: string, value: number) => {
    setSkills((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">
        Analyze Your Skills
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Select your current proficiency for each skill.
        This helps us calculate your readiness and learning roadmap.
      </p>

      {/* Skill Input Section */}
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
          className="
            px-6 py-3 rounded-md font-medium
            bg-black text-white
            dark:bg-white dark:text-black
            hover:opacity-90
            transition
          "
        >
          Analyze
        </button>
      </div>

      {/* Results Placeholder */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-4">
          Analysis Result
        </h3>

        <div
          className="
            p-6 rounded-md
            border border-dashed
            border-gray-300 dark:border-gray-600
            text-gray-500 dark:text-gray-400
          "
        >
          Results will appear here after analysis.
        </div>
      </div>
    </main>
  );
}
