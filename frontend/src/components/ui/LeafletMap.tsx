"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fijar íconos por defecto
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type LeafletMapProps = {
  lat: number;
  lng: number;
  start?: { lat: string | number | null; lng: string | number | null };
  end?: { lat: string | number | null; lng: string | number | null };
  deviceName?: string;
};

export default function LeafletMap({ lat, lng, start, end, deviceName }: LeafletMapProps) {
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!start?.lat || !start?.lng || !end?.lat || !end?.lng) return;

      const startCoord = `${start.lng},${start.lat}`;
      const endCoord = `${end.lng},${end.lat}`;

      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startCoord};${endCoord}?overview=full&geometries=geojson`
        );
        const data = await res.json();

        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng]
          );
          setRoute(coords);
        }
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };

    fetchRoute();
  }, [start, end]);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Puntos */}
      <Marker position={[lat, lng]}>
        <Popup>
          {deviceName || "Dispositivo"}
        </Popup>
      </Marker>

      {start?.lat && start?.lng && <Marker position={[+start.lat, +start.lng]} />}
      {end?.lat && end?.lng && <Marker position={[+end.lat, +end.lng]} />}

      {/* Ruta calculada */}
      {route.length > 0 && (
        <Polyline positions={route} pathOptions={{ color: "blue" }} />
      )}
    </MapContainer>
  );
}
