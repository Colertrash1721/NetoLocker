"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchTraccarPositions, PositionType } from "@/services/dashboard/fetchTraccarDevices";

const containerStyle = { width: "100%", height: "100%" };
const center = { lat: 18.4861, lng: -69.9312 };

export default function GoogleMapComponent() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [positions, setPositions] = useState<PositionType[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetchTraccarPositions();
        setPositions(resp.filter((p) => p.latitude && p.longitude));
      } catch (e) {
        console.error("Error fetching positions:", e);
      }
    };

    load();
    // Puedes usar setInterval(load, tiempo) para actualizar cada X segundos
  }, []);

  if (!apiKey) return <p>No API key provided.</p>;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {positions.map((pos) => (
          <Marker
            key={pos.id}
            position={{ lat: pos.latitude, lng: pos.longitude }}
            title={`Device ${pos.deviceId}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
