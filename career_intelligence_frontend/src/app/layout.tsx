import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Career Intelligence Platform",
  description: "Skill gap analysis and learning roadmap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="
          bg-white text-black
          dark:bg-gray-900 dark:text-white
          transition-colors duration-200
        "
      >
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
