"use client";
import { useEffect, useState } from "react";
import Tables from "@/components/ui/tables";
import MapModal from "../ui/mapModal";
import { getContainersByCompany } from "@/services/container/fetchcontainer";
import { getFreeloadsByCompany } from "@/services/container/fetchFreeload";
import { fetchDevicePositionById } from "@/services/track/getDevicePosition";
import { usePathname } from "next/navigation";
import { useDeviceAssignment } from "@/hooks/container/useDeviceAssignment";

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
  const { handleDeleteClick, handleEstadoClick } = useDeviceAssignment();
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
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
      } else {
        alert("No se encontró la posición del dispositivo.");
      }
    } catch (error) {
      console.error("Error al obtener posición:", error);
      alert("Error al buscar la ubicación del dispositivo.");
    }
  };

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
    <section className="w-full overflow-auto">
      <Tables
        classNameT="w-full min-w-[850px] border-separate border-spacing-0 overflow-hidden border-gray-200 rounded-lg shadow-lg"
        header={headers}
        data={filteredData}
        classNameH="text-center px-4 py-2 bg-[#FBFCFD] border-b border-t border-gray-200"
        classNameB="text-center px-4 py-2 rounded-lg"
        classNameButton="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-full text-center"
        classNameIcons="cursor-pointer text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
        onDeleteClick={handleDeleteClick}
        onEstadoClick={handleEstadoClick}
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
