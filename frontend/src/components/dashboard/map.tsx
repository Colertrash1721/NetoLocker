// ⏩ File: app/dashboard/OpenStreetMapComponent.tsx

"use client";

import dynamic from "next/dynamic";

// ⏩ Importa tu mapa real solo en cliente:
const ClientMap = dynamic(() => import("./ClientMap"), { ssr: false });

export default function OpenStreetMapComponent() {
  return (
    <ClientMap />
  );
}
