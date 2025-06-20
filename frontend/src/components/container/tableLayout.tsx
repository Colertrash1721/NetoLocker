"use client";
/* IMPORTS */
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

/* COMPONENTS AND HOOK */
import Tables from "@/components/ui/tables";
import MapModal from "../ui/mapModal";
import { usePathname } from "next/navigation";
import { useDeviceAssignment } from "@/hooks/container/useDeviceAssignment";
import { EditModal } from "../ui/editModal";
import useMapModal from "@/hooks/ui/useMapModal";

/* SERVICES */
import { getContainersByCompany } from "@/services/container/read/fetchcontainer";
import { getFreeloadsByCompany } from "@/services/container/read/fetchFreeload";
import { updateContainer } from "@/services/container/update/updateContainer";
import { updateFreeload } from "@/services/container/update/updateFreeload";
import Swal from "sweetalert2";


dayjs.extend(utc);
dayjs.extend(timezone);


const headers = [
  "Ticket",
  "BL",
  "Puerto",
  "Destino",
  "Estado",
  "Acciones",
  "Fecha",
  "Editar"
];

export default function TableLayout({ filter }: { filter?: any }) {
  const pathname = usePathname();
  const [data, setData] = useState<any[]>([]);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { handleMapClick, setPosition, position, route } = useMapModal();
  const { handleDeleteClick, handleCancelButton } = useDeviceAssignment();

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;

      let result: any[] = [];
      if (pathname.includes("/freeload")) {
        result = await getFreeloadsByCompany(username);
      } else {
        result = await getContainersByCompany(username);
      }

      const now = dayjs();
      const mappedData = result.map((item: any) => {
        const estimatedDate = item.estimatedDate ? dayjs(item.estimatedDate) : null;
        const hoursToDeparture = estimatedDate ? estimatedDate.diff(now, "hour", true) : null;

        // Mostrar el modal si cumple condiciones
        const shouldShowModal =
          item.estado?.nombre === "pendiente" &&
          hoursToDeparture !== null &&
          hoursToDeparture <= 12 &&
          hoursToDeparture >= 2;

        if (shouldShowModal && !showEditModal) {
          setEditRow(item);
          setShowEditModal(true);
        }

        return {
          ticket: pathname.includes("/freeload")
            ? `F-${item.idFreeload}`
            : `C-${item.idContainer}`,
          deviceName: item.deviceName,
          bl: item.BL || "N/A",
          puerto: item.port,
          destino: item.destination,
          estado: item.estado?.nombre || "pendiente",
          acciones:
            item.estado?.nombre === "aceptado"
              ? "bx bx-map"
              : item.estado?.nombre === "cancelado" || item.estado?.nombre === "finalizado"
                ? "-"
                : "Cancelar",
          fecha: item.estimatedDate?.split("T")[0] || "N/A",
          editar: item.estado?.nombre === "pendiente" ? "bx bxs-pencil" : "-"
        };
      });

      setData(mappedData);
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [pathname]);

  // 🔍 Filtro
  const filteredData = data.filter((item: any) => {
    return (
      (!filter?.ticket || item.ticket.toLowerCase().includes(filter.ticket.toLowerCase())) &&
      (!filter?.bl || item.bl.toLowerCase().includes(filter.bl.toLowerCase())) &&
      (!filter?.port || item.puerto.toLowerCase().includes(filter.port.toLowerCase())) &&
      (!filter?.destination || item.destino.toLowerCase().includes(filter.destination.toLowerCase())) &&
      (!filter?.state || item.estado.toLowerCase().includes(filter.state.toLowerCase())) &&
      (!filter?.date || item.fecha === filter.date)
    );
  });

  return (
    <section className="w-full overflow-x-auto px-2">
      <div className="min-w-[850px] w-full">
        <Tables
          classNameT="w-full border-separate border-spacing-0 overflow-hidden border-gray-200 rounded-lg shadow-lg dark:shadow-gray-800 dark:shadow-2xl"
          header={headers}
          data={filteredData}
          classNameH="text-xs sm:text-sm text-center px-2 sm:px-4 py-2 bg-[#FBFCFD] border-b border-t border-gray-200 dark:bg-[#2D3137] dark:text-white dark:border-transparent dark:shadow-2xl"
          classNameB="text-xs sm:text-sm text-center px-2 sm:px-4 py-2 rounded-lg dark:text-white"
          classNameButton="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-full text-center text-xs sm:text-sm"
          classNameIcons="cursor-pointer text-xl sm:text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
          classNameButtonCancel="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200 w-full text-center text-xs sm:text-sm"
          onDeleteClick={handleDeleteClick}
          onMapClick={handleMapClick}
          onCancelState={handleCancelButton}
          onEditRow={(row) => {
            setEditRow(row);
            setShowEditModal(true);
          }}
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

      {/* Modal de Edición */}
      {showEditModal && editRow && (
        <EditModal
          row={editRow}
          onClose={() => setShowEditModal(false)}
          onSave={async (updated) => {
            try {
              if (pathname.includes("/freeload")) {
                await updateFreeload(editRow.idFreeload, updated);
              } else {
                await updateContainer(editRow.idContainer, updated);
              }

              Swal.fire({
                title: "Actualizado correctamente",
                text: "Datos actualizados correctamente",
                icon: "success"
              })
              setShowEditModal(false);
              window.location.reload();
            } catch (error) {
              Swal.fire({
                title: "Error",
                text: "Error actualizando los datos:",
                icon: "error"
              })
              console.error("Error actualizando los datos:", error);
            }
          }}
        />
      )}


    </section>
  );
}
