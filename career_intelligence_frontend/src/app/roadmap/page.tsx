"use client";

import { useEffect, useState } from "react";
import RoadmapPhaseCard from "@/components/roadmap/RoadmapPhaseCard";
import { authFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const {token} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!token) {
      router.push("/login")
    }
  }, [token])

  useEffect(() => {
    const loadProgress = async () => {
      const res = await authFetch(
        "http://127.0.0.1:8000/progress"
      );
      const data = await res.json();
      setCompleted(data.completed_skills || {});
    };

    const storedRoadmap = sessionStorage.getItem("roadmap");
    if (storedRoadmap) {
      setRoadmap(JSON.parse(storedRoadmap));
    }

    loadProgress();
  }, []);


  const toggleSkill = async (skill: string) => {
    const updated = {
      ...completed,
      [skill]: !completed[skill],
    };

    setCompleted(updated);

    await authFetch("http://127.0.0.1:8000/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "demo-user",
        completed_skills: updated,
      }),
    });
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
