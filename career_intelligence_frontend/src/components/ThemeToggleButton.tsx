"use client";

import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initial theme resolution
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex items-center justify-center
        w-9 h-9 rounded-md
        border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-900
        text-lg
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-all duration-200 ease-out
        active:scale-95
      "
    >
      <span
        className="
          transition-transform duration-300
          rotate-0 dark:rotate-180
        "
      >
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
