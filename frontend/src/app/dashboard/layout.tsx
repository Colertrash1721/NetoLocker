"use client";
import AsideBar from "@/components/layout/asideBar";
import { LoadScript } from "@react-google-maps/api";
import { Comfortaa } from "next/font/google";

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
            className={`grid grid-cols-[18%_82%] w-full h-screen bg-gray-100 `}
          >
            <AsideBar />
            {children}
          </main>
        </LoadScript>
      </body>
    </html>
  );
}
