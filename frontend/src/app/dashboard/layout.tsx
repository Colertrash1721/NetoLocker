"use client";
import { LoadScript } from "@react-google-maps/api";
import { Comfortaa } from "next/font/google";

import { OneButtonDarkMode } from '@/components/ui/darkmode'
import AsideBar from "@/components/layout/asideBar";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  return (
    <html lang="en">
      <body className={`${comfortaa.className}`}>
        <LoadScript googleMapsApiKey={apiKey}>
          <main
            className={`grid grid-cols-[18%_82%] w-full h-screen bg-gray-100 dark:bg-[#1A1D21]`}
          >
            <AsideBar />
            {children}
            <div className="absolute top-2 right-4 h-10 w-10">
              <OneButtonDarkMode />
            </div>
          </main>
        </LoadScript>
      </body>
    </html>
  );
}
