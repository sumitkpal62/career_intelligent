"use client";

import { useEffect, useState } from "react";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("roadmap");
    if (stored) {
      setRoadmap(JSON.parse(stored));
    }
  }, []);

  if (!roadmap) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">
          No roadmap found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please analyze your skills first to generate a roadmap.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-4">
        Your Learning Roadmap
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-12">
        This roadmap is generated based on your current skill analysis.
      </p>

      <div className="space-y-8">
        {Object.entries(roadmap).map(
          ([phaseKey, phase]: any, index) => (
            <div
              key={phaseKey}
              className="
                p-6 rounded-md
                border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800
              "
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">
                  Phase {index + 1}: {phase.title}
                </h3>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {phase.estimated_weeks} weeks
                </span>
              </div>

              {phase.skills.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {phase.skills.map((skill: string) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No skills pending in this phase.
                </p>
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
}
