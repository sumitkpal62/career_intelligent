type ProgressBarProps = {
  progress: number;
  completed: number;
  total: number;
};

export default function ProgressBar({
  progress,
  completed,
  total,
}: ProgressBarProps) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
        <span>
          {completed}/{total} skills completed
        </span>
        <span>{progress}%</span>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
        <div
          className="
            h-2 rounded
            bg-black dark:bg-white
            transition-[width] duration-300 ease-out
          "
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
