const ROADMAP = {
  phase_1: {
    title: "Core Foundations",
    skills: ["ETL Concepts", "Data Modeling"],
    estimated_weeks: 4,
  },
  phase_2: {
    title: "Strengthen Core Skills",
    skills: [],
    estimated_weeks: 0,
  },
  phase_3: {
    title: "Supporting & Tooling Skills",
    skills: ["Airflow (Basics)", "Git"],
    estimated_weeks: 2,
  },
};

export default function RoadmapPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-4">
        Your Learning Roadmap
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-12">
        Follow this phased roadmap to become job-ready as a Data Engineer.
        Each phase builds on the previous one.
      </p>

      <div className="space-y-8">
        {Object.entries(ROADMAP).map(
          ([phaseKey, phase], index) => (
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

                <span
                  className="
                    text-sm font-medium
                    text-gray-500 dark:text-gray-400
                  "
                >
                  {phase.estimated_weeks} weeks
                </span>
              </div>

              {phase.skills.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {phase.skills.map((skill) => (
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
