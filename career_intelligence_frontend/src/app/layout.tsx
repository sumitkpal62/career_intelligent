import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
