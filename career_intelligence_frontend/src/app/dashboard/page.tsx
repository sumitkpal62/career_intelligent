"use client";

import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/hooks/useDashboard";
import UserCard from "@/components/dashboard/UserCard";
import ReadinessCard from "@/components/dashboard/ReadinessCard";
import ProgressCard from "@/components/dashboard/ProgressCard";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const { token, hydrated } = useAuth();
  const { user, progress, loading } = useDashboard(token);

  if (!hydrated) return null;
  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-6">
      {user && <UserCard user={user} />}

      {progress && (
        <div className="grid md:grid-cols-2 gap-6">
          <ReadinessCard progress={progress} />
          <ProgressCard progress={progress} />
        </div>
      )}

      <QuickActions />
    </main>
  );
}
