"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type MapModalProps = {
  lat?: number;
  lng?: number;
  start?: { lat: string | number | null; lng: string | number | null };
  end?: { lat: string | number | null; lng: string | number | null };
  onClose: () => void;
};

// ✅ Import dinámico: Leaflet solo en cliente
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export default function MapModal({
  lat,
  lng,
  start,
  end,
  onClose,
}: MapModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-3xl">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>

        <div className="w-full h-[500px]">
          <LeafletMap lat={lat!} lng={lng!} start={start} end={end} />
        </div>
      </div>
    </div>
  );
}
