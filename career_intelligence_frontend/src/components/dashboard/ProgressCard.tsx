import { ProgressSummary } from "@/types/dashboard";

export default function ProgressCard({
  progress,
}: {
  progress: ProgressSummary;
}) {
  return (
    <div className="p-6 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">Progress</h3>
      <p>Completed skills: {progress.completed_skills}</p>
      <p>Remaining skills: {progress.remaining_skills}</p>
    </div>
  );
}
