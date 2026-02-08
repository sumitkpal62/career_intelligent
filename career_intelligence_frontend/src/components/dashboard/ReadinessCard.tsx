import { ProgressSummary } from "@/types/dashboard";

export default function ReadinessCard({
  progress,
}: {
  progress: ProgressSummary;
}) {
  return (
    <div className="p-6 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">Readiness</h3>
      <p>{progress.readiness_percentage}% job-ready</p>
      <p>Current phase: {progress.current_phase || "Not started"}</p>
    </div>
  );
}
