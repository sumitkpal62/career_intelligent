import ProgressBar from "./ProgressBar";

type RoadmapPhaseCardProps = {
  index: number;
  title: string;
  skills: string[];
  estimatedWeeks: number;
  completed: Record<string, boolean>;
  onToggleSkill: (skill: string) => void;
};

export default function RoadmapPhaseCard({
  index,
  title,
  skills,
  estimatedWeeks,
  completed,
  onToggleSkill,
}: RoadmapPhaseCardProps) {
  const totalSkills = skills.length;
  const completedSkills = skills.filter(
    (skill) => completed[skill]
  ).length;

  const progress =
    totalSkills === 0
      ? 100
      : Math.round((completedSkills / totalSkills) * 100);

  const isComplete = progress === 100;

  return (
    <div
      className={`
        p-6 rounded-md border
        transition-colors duration-300
        ${
          isComplete
            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">
          Phase {index + 1}: {title}
        </h3>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {estimatedWeeks} weeks
        </span>
      </div>

      <ProgressBar
        progress={progress}
        completed={completedSkills}
        total={totalSkills}
      />

      <ul className="mt-4 space-y-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <li
              key={skill}
              className="flex items-center space-x-3"
            >
              <input
                type="checkbox"
                checked={!!completed[skill]}
                onChange={() => onToggleSkill(skill)}
                className="
                  h-4 w-4
                  transition-transform duration-150
                  checked:scale-110
                "
              />

              <span
                className={`
                  transition-all duration-200 ease-out
                  ${
                    completed[skill]
                      ? "line-through text-gray-400 scale-95 opacity-70"
                      : "scale-100 opacity-100"
                  }
                `}
              >
                {skill}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No skills pending in this phase.
          </p>
        )}
      </ul>
    </div>
  );
}
