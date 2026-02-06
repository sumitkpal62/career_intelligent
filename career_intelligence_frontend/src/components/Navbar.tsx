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

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4
                      flex items-center justify-between">
        <Link href={"/"} className="text-xl font-semibold text-black dark:text-white">
          Career Intelligence
        </Link>

        <div className="flex items-center space-x-4">
          <Link href={"/"} className="cursor-pointer text-sm
                           text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
            Home
          </Link>

          <Link href={"/analyze"} className="cursor-pointer text-sm
                           text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
            Analyze
          </Link>

          <Link href={"/roadmap"} className="cursor-pointer text-sm
                           text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
            Roadmap
          </Link>
          <div className="cursor-pointer text-sm">
            {!token && hydrated ? (
              <div className="space-x-4">
                <Link href="/login" className="hover:underline text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
                  Login
                </Link>
                <Link href="/signup" className="hover:underline text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
                  Signup
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="hover:underline text-gray-600 dark:text-gray-300
                           hover:text-black dark:hover:text-white">
                Logout
              </button>
            )}
          </div>

          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
