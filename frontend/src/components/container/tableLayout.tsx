"use client";
import { useEffect, useState } from "react";
import Tables from "@/components/ui/tables";
import MapModal from "../ui/mapModal";
import { getContainersByCompany } from "@/services/container/fetchcontainer";
import { getFreeloadsByCompany } from "@/services/container/fetchFreeload";
import { fetchDevicePositionById } from "@/services/track/getDevicePosition";
import { usePathname } from "next/navigation";
import { useDeviceAssignment } from "@/hooks/container/useDeviceAssignment";

import useMapModal from "@/hooks/ui/useMapModal";

const headers = [
  "Ticket",
  "BL",
  "Puerto",
  "Destino",
  "Estado",
  "Acciones",
  "Fecha",
];

export default function TableLayout({ filter }: { filter: any }) {
  const pathname = usePathname();
  const [data, setData] = useState([]);
  
  const {handleMapClick, setPosition, position, route} = useMapModal();
  const { handleDeleteClick, handleEstadoClick } = useDeviceAssignment();

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;

      let result = [];
      if (pathname.includes("/freeload")) {
        result = await getFreeloadsByCompany(username);
        setData(
          result.map((item: any) => ({
            ticket: `F-${item.idFreeload}`,
            deviceName: item.deviceName,
            bl: item.BL || "N/A",
            puerto: item.port,
            destino: item.destination,
            estado: item.estado?.nombre || "pendiente",
            acciones:
              item.estado?.nombre === "aceptado" ? "bx bx-map" : "bx bx-trash",
            fecha: item.creationDate?.split("T")[0],
          }))
        );
      } else {
        result = await getContainersByCompany(username);
        setData(
          result.map((item: any) => ({
            ticket: `C-${item.idContainer}`,
            deviceName: item.deviceName,
            bl: item.BL || "N/A",
            puerto: item.port,
            destino: item.destination,
            estado: item.estado?.nombre || "pendiente",
            acciones:
              item.estado?.nombre === "aceptado" ? "bx bx-map" : "bx bx-trash",
            fecha: item.creationDate?.split("T")[0],
          }))
        );
      }
    };
    fetchData();
  }, [pathname]);

  // 🔍 Aplica los filtros al data original
  const filteredData = data.filter((item: any) => {
    return (
      (!filter.ticket ||
        item.ticket.toLowerCase().includes(filter.ticket.toLowerCase())) &&
      (!filter.bl || item.bl.toLowerCase().includes(filter.bl.toLowerCase())) &&
      (!filter.port ||
        item.puerto.toLowerCase().includes(filter.port.toLowerCase())) &&
      (!filter.destination ||
        item.destino
          .toLowerCase()
          .includes(filter.destination.toLowerCase())) &&
      (!filter.state ||
        item.estado.toLowerCase().includes(filter.state.toLowerCase())) &&
      (!filter.date || item.fecha === filter.date)
    );
  });

  return (
    <section className="w-full overflow-x-auto px-2">
      <div className="min-w-[850px] w-full">
        <Tables
          classNameT="w-full border-separate border-spacing-0 overflow-hidden border-gray-200 rounded-lg shadow-lg"
          header={headers}
          data={filteredData}
          classNameH="text-xs sm:text-sm text-center px-2 sm:px-4 py-2 bg-[#FBFCFD] border-b border-t border-gray-200"
          classNameB="text-xs sm:text-sm text-center px-2 sm:px-4 py-2 rounded-lg"
          classNameButton="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-full text-center text-xs sm:text-sm"
          classNameIcons="cursor-pointer text-xl sm:text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onDeleteClick={handleDeleteClick}
          onEstadoClick={handleEstadoClick}
          onMapClick={handleMapClick}
        />
      </div>

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
