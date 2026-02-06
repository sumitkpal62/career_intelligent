import { Roadmap } from "@/types/analyze";

export default function RoadmapPreview({roadmap}: {roadmap: Roadmap}) {
    return (
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

            {Object.entries(roadmap).map(
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
    );
}