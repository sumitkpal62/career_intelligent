"use client";

import { useEffect, useState } from "react";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = sessionStorage.getItem("roadmap");
    const storedCompleted = sessionStorage.getItem("completedSkills");
    if (stored) {
      setRoadmap(JSON.parse(stored));
    }
    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  const toggleSkill = (skill: string) => {
    const updated = {
      ...completed,
      [skill]: !completed[skill],
    };

    setCompleted(updated);
    sessionStorage.setItem(
      "completedSkills",
      JSON.stringify(updated)
    );
  };

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
          ([phaseKey, phase]: any, index) => {
            const totalSkills = phase.skills.length;
            const completedSkills = phase.skills.filter(
              (skill: string) => completed[skill]
            ).length;
            const progress =
              totalSkills === 0
                ? 100
                : Math.round((completedSkills / totalSkills) * 100);
            const isCompleted = progress === 100;
            return (
              <div
                key={phaseKey}
                className={`
                  p-6 rounded-md border
                  transition-colors duration-300
                  ${
                    isCompleted
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  }
                `}
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
                  <ul className="space-y-2">
                    {phase.skills.map((skill: string) => (
                      <li
                        key={skill}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          checked={!!completed[skill]}
                          onChange={() => toggleSkill(skill)}
                          className="
                            h-4 w-4
                            transition-transform duration-150
                            checked:scale-110
                          "
                        />

                        <span
                          className={`
                            transition-colors duration-200 ease-out
                            ${completed[skill] ? "line-through text-gray-400 scale-95 opacity-70" : "scale-100 opacity-100"}
                          `}
                        >
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No skills pending in this phase.
                  </p>
                )}
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
                    <span>{completedSkills}/{totalSkills} skills completed</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
                    <div
                      className="h-2 rounded bg-black dark:bg-white transition-[width] duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </main>
  );
}
