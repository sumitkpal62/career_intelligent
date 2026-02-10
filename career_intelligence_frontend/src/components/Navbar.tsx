"use client"

import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { token, logout, hydrated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login")
  }

  if (!hydrated) {
    return null;
  }

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4
                      flex items-center justify-between">
        <Link href={"/"} className="text-xl font-semibold text-black dark:text-white">
          Career Intelligence
        </Link>

        <div className="flex items-center space-x-4">
          <div className="cursor-pointer text-sm">
            {token ? (
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>

                <Link href="/analyze" className="hover:underline">
                  Analyze
                </Link>

                <Link href="/roadmap" className="hover:underline">
                  Roadmap
                </Link>

                <button
                  onClick={logout}
                  className="hover:underline text-gray-600 dark:text-gray-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/login" className="hover:underline">
                  Login
                </Link>

                <Link href="/signup" className="hover:underline">
                  Signup
                </Link>
              </div>
            )}

          </div>

          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
