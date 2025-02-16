import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
// layout.tsx
import Footer from "../components/Footer"; // Changed to default import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Insightter | Discover Curated Entertainment",
  description: "Your ultimate hub for discovering top-rated movies, books, and travel destinations. Explore crowd-ranked content, get personalized recommendations, and stay updated with what's trending worldwide. Easy navigation, verified reviews, and constantly updated rankings.",
  openGraph: {
    images: [
      {
        url: "https://api.unsplash.com/search/photos?query=entertainment-hub&client_id=TQ3RVdVpPRXbH5U-_GTJBWR_DmP4FsWH6ObolrjM0hY",
        width: 1200,
        height: 630,
        alt: "Insightter - Movies, Books & Travel Hub",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}