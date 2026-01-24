import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4
                      flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black dark:text-white">
          Career Intelligence
        </h1>

        <div className="flex items-center space-x-4">
          <span className="cursor-pointer text-sm
                           text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
            Home
          </span>

          <span className="cursor-pointer text-sm
                           text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
            Analyze
          </span>

          <span className="cursor-pointer text-sm
                           text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
            Roadmap
          </span>

          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
