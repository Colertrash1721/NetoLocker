'use client'
import { useState } from "react";
import { fetchDevicePositionById } from "@/services/track/getDevicePosition";

export default function useMapModal() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [route, setRoute] = useState<{
    Slat: number | string | null;
    Slng: number | string | null;
    Elat: number | string | null;
    Elng: number | string | null;
  } | null>(null);

  const handleMapClick = async (row: any) => {
    const id: number = row?.ticket.split("-")[1];
    try {
      const result = await fetchDevicePositionById(id);

      if (result) {
        setPosition({
          lat: result.positions[0].latitude,
          lng: result.positions[0].longitude,
        });
        setRoute({
          Slat: result.route.Startlatitud,
          Slng: result.route.Startlongitud,
          Elat: result.route.Endlatitud,
          Elng: result.route.Endlongitud,
        });
      } 
    } catch (error) {
      console.error("Error al obtener posición:", error);
    }
  };

  return { position, route, setPosition, handleMapClick };
}
