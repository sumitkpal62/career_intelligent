export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Career Intelligence
        </h1>

        <div className="space-x-6 text-sm font-medium text-gray-600">
          <span className="cursor-pointer hover:text-black">
            Home
          </span>
          <span className="cursor-pointer hover:text-black">
            Analyze
          </span>
          <span className="cursor-pointer hover:text-black">
            Roadmap
          </span>
        </div>
      </div>
    </nav>
  );
}
