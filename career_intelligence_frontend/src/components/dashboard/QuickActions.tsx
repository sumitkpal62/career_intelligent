import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="p-6 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>

      <div className="flex gap-4 mt-3">
        <Link href="/analyze" className="underline">
          Analyze Skills
        </Link>

        <Link href="/roadmap" className="underline">
          View Roadmap
        </Link>
      </div>
    </div>
  );
}
