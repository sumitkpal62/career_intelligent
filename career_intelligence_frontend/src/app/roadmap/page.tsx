"use client";

import { useEffect, useState } from "react";
import RoadmapPhaseCard from "@/components/roadmap/RoadmapPhaseCard";

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
          Start by analyzing your skills to generate a personalized
          learning roadmap tailored to your current level.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-4">
        Your Learning Roadmap
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
        This roadmap breaks your journey into clear phases.
        Focus on completing one phase at a time to steadily move
        toward Data Engineer readiness.
      </p>

      <div className="space-y-8">
        {Object.entries(roadmap).map(
          ([_, phase]: any, index) => (
            <RoadmapPhaseCard
              key={phase.title}
              index={index}
              title={phase.title}
              skills={phase.skills}
              estimatedWeeks={phase.estimated_weeks}
              completed={completed}
              onToggleSkill={toggleSkill}
            />
          )
        )}
      </div>
    </main>
  );
}
