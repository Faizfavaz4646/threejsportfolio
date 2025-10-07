import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout"; // client-side layout

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata for SEO
export const metadata = {
  title: "Faiz Favaz Portfolio",
  description: "Interactive portfolio with 3D cubes, dark mode, and stars",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ✅ Added Tailwind dark mode support on html tag */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500`}
      >
        {/* ✅ Wrapped children in ClientLayout to manage theme toggling */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
