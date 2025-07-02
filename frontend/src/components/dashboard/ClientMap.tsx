"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchTraccarPositions } from "@/services/dashboard/read/fetchTraccarDevices";

// ICONOS
const truckIcon = new L.Icon({
  iconUrl: "/icons/truck.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
const startIcon = new L.Icon({
  iconUrl: "/icons/start.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
const endIcon = new L.Icon({
  iconUrl: "/icons/end.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const center: [number, number] = [18.4861, -69.9312];

export default function ClientMap() {
  const [devicesPositions, setDevicesPositions] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [routeLines, setRouteLines] = useState<[number, number][][]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetchTraccarPositions();
        const validPositions = resp.devicesLocations.filter(
          (p: any) => p.latitude !== 0 && p.longitude !== 0
        );
        setDevicesPositions(validPositions);
        setRoutes(resp.routes || []);
      } catch (e) {
        console.error("Error fetching map data:", e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!routes.length) return;

      const lines: [number, number][][] = [];

      for (const route of routes) {
        const origin = [parseFloat(route.Startlatitud), parseFloat(route.Startlongitud)];
        const destination = [parseFloat(route.Endlatitud), parseFloat(route.Endlongitud)];

        try {
          const resp = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
          );
          const data = await resp.json();

          if (data.routes && data.routes[0]) {
            const coordinates: [number, number][] = data.routes[0].geometry.coordinates.map(
              ([lng, lat]: [number, number]) => [lat, lng]
            );
            lines.push(coordinates);
          }
        } catch (err) {
          console.error("OSRM error:", err);
        }
      }

      setRouteLines(lines);
    };

    fetchRoutes();
  }, [routes]);

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {devicesPositions.map((pos) => (
        <Marker
          key={pos.id}
          position={[pos.latitude, pos.longitude]}
          icon={truckIcon}
        >
          <Popup>{`Device ID: ${pos.id}`}</Popup>
        </Marker>
      ))}

      {routes.map((route: any, idx: number) => {
        const start: [number, number] = [
          parseFloat(route.Startlatitud),
          parseFloat(route.Startlongitud),
        ];
        const end: [number, number] = [
          parseFloat(route.Endlatitud),
          parseFloat(route.Endlongitud),
        ];

        return (
          <div key={`route-markers-${idx}`}>
            <Marker position={start} icon={startIcon}>
              <Popup>Inicio de ruta</Popup>
            </Marker>
            <Marker position={end} icon={endIcon}>
              <Popup>Fin de ruta</Popup>
            </Marker>
          </div>
        );
      })}

      {routeLines.map((line, idx) => (
        <Polyline key={`line-${idx}`} positions={line} pathOptions={{ color: "blue" }} />
      ))}
    </MapContainer>
  );
}
