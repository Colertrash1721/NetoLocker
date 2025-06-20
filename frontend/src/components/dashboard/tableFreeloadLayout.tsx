"use client";
import React, { useEffect, useState } from "react";
import Tables from "@/components/ui/tables";
import { fetchAllFreeloads } from "@/services/dashboard/read/fetchAllFreeload";
import { useDeviceAssignment } from "@/hooks/container/useDeviceAssignment";
import useMapModal from "@/hooks/ui/useMapModal";
import MapModal from "../ui/mapModal";

// Reemplazamos "Cliente" por "BL"
const headers = [
  "Empresa",
  "Ticket",
  "BL",
  "Dispositivo",
  "Puerto",
  "Destino",
  "Estado",
  "Acciones",
  "Fecha",
];

export default function TableFreeloadLayout() {
  const [data, setData] = useState([]);
  const { handleDeleteClick, handleEstadoClick } = useDeviceAssignment();
  const { position, route, setPosition, handleMapClick } = useMapModal();

  useEffect(() => {
    const getData = async () => {
      try {
        const freeloads = await fetchAllFreeloads();
        const formatted = freeloads.map((item: any) => ({
          empresa: item.company.companyName || "N/A",
          ticket: `F-${item.idFreeload}`,
          bl: item.BL || "-", // ahora muestra el campo BL
          dispositivo: item.deviceName || "N/A",
          puerto: item.port || "-",
          destino: item.destination || "-",
          estado: item.estado?.nombre || "pendiente",
          acciones:
            item.estado?.nombre === "aceptado" ? "bx bx-map" : "bx bx-trash",
          fecha: item.estimatedDate?.split("T")[0] || "-",
        }));
        setData(formatted);
      } catch (err) {
        console.error("Error loading freeloads:", err);
      }
    };

    getData();
    const interval = setInterval(() => {
      getData(); // actualiza cada minuto
    }, 60000); // 60,000 ms = 1 minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full overflow-auto">
      <Tables
        classNameT="w-full min-w-[850px] border-separate border-spacing-0 overflow-hidden border-gray-200 rounded-lg shadow-lg dark:shadow-gray-800 dark:shadow-2xl"
        header={headers}
        data={data}
        classNameH="text-center px-4 py-2 bg-[#FBFCFD] border-b border-t border-gray-200 dark:bg-[#2D3137] dark:text-white dark:border-transparent dark:shadow-2xl"
        classNameB="text-center px-4 py-2 rounded-lg bg-white dark:text-white dark:bg-transparent"
        classNameButton="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-full text-center"
        classNameIcons="cursor-pointer text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
        onEstadoClick={handleEstadoClick}
        onDeleteClick={handleDeleteClick}
        onMapClick={handleMapClick}
      />

      {position && (
        <MapModal
          lat={position.lat}
          lng={position.lng}
          start={{ lat: route?.Slat || null, lng: route?.Slng || null }}
          end={{ lat: route?.Elat || null, lng: route?.Elng || null }}
          onClose={() => setPosition(null)}
        />
      )}
    </section>
  );
}
