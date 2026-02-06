import { AnalysisSummary } from "@/types/analyze";

export default function AnalysisResult( {result}: {result: AnalysisSummary} ) {
    return (
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
              {result.readiness_percentage}% (
              {result.readiness_level})
            </div>

            <div className="mb-2">
              <strong>Missing Skills:</strong>{" "}
              {result.missing_skills.join(", ") || "None"}
            </div>

            <div className="mb-2">
              <strong>Weak Skills:</strong>{" "}
              {result.weak_skills.join(", ") || "None"}
            </div>

            <div>
              <strong>Strong Skills:</strong>{" "}
              {result.strong_skills.join(", ") || "None"}
            </div>
          </div>
    );
}