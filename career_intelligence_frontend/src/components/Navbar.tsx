"use client"

import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
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
          <div>
            {
              !token ? (
                <Link
                  href={"/login"}
                  className="text-sm font-medium hover:underline"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium hover:underline"
                >
                  Logout
                </button>
              )
            }
          </div>

          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
