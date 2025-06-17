"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { fetchTraccarPositions } from "@/services/dashboard/read/fetchTraccarDevices";

const containerStyle = { width: "100%", height: "100%" };
const center = { lat: 18.4861, lng: -69.9312 };

const truckIcon = "https://maps.google.com/mapfiles/kml/shapes/truck.png";
const startIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
const endIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

export default function GoogleMapComponent() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [devicesPositions, setDevicesPositions] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [directions, setDirections] = useState<google.maps.DirectionsResult[]>([]);

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
    if (!routes.length) return;

    const directionsService = new google.maps.DirectionsService();

    routes.forEach((route) => {
      const origin = {
        lat: parseFloat(route.Startlatitud),
        lng: parseFloat(route.Startlongitud),
      };
      const destination = {
        lat: parseFloat(route.Endlatitud),
        lng: parseFloat(route.Endlongitud),
      };

      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections((prev) => [...prev, result]);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    });
  }, [routes]);

  if (!apiKey) return <p>No API key provided.</p>;

  return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Dispositivos (camiones) */}
        {devicesPositions.map((pos) => (
          <Marker
            key={pos.id}
            position={{ lat: pos.latitude, lng: pos.longitude }}
            icon={truckIcon}
            title={`Device ID: ${pos.id}`}
          />
        ))}

        {/* Marcadores de inicio y fin */}
        {routes.map((route, idx) => {
          const start = {
            lat: parseFloat(route.Startlatitud),
            lng: parseFloat(route.Startlongitud),
          };
          const end = {
            lat: parseFloat(route.Endlatitud),
            lng: parseFloat(route.Endlongitud),
          };

          return (
            <React.Fragment key={`route-markers-${idx}`}>
              <Marker position={start} icon={startIcon} title="Inicio de ruta" />
              <Marker position={end} icon={endIcon} title="Fin de ruta" />
            </React.Fragment>
          );
        })}

        {/* Rutas renderizadas */}
        {directions.map((dir, idx) => (
          <DirectionsRenderer key={idx} directions={dir} />
        ))}
      </GoogleMap>
  );
}
