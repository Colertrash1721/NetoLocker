"use client";
import React, { useEffect, useState } from "react";
import Tables from "@/components/ui/tables";
import { fetchAllFreeloads } from "@/services/dashboard/fetchAllFreeload";
import { useDeviceAssignment } from "@/hooks/container/useDeviceAssignment";

// Reemplazamos "Cliente" por "BL"
const headers = ["Ticket", "BL", "Puerto", "Destino", "Estado", "Acciones", "Fecha"];

export default function TableFreeloadLayout() {
  const [data, setData] = useState([]);
  const {handleDeleteClick, handleEstadoClick} = useDeviceAssignment()

  useEffect(() => {
    const getData = async () => {
      try {
        const freeloads = await fetchAllFreeloads();
        const formatted = freeloads.map((item: any) => ({
          ticket: `F-${item.idFreeload}`,
          bl: item.BL || "-", // ahora muestra el campo BL
          puerto: item.port || "-",
          destino: item.destination || "-",
          estado: item.estado?.nombre || "pendiente",
          acciones: item.estado?.nombre === "aceptado" ? "bx bx-map" : "bx bx-trash",
          fecha: item.creationDate?.split("T")[0] || "-",
        }));
        setData(formatted);
      } catch (err) {
        console.error("Error loading freeloads:", err);
      }
    };

    getData();
  }, []);

  return (
    <section className="w-full overflow-auto">
      <Tables
        classNameT="w-full min-w-[850px] border-separate border-spacing-0 overflow-hidden border-gray-200 rounded-lg shadow-lg"
        header={headers}
        data={data}
        classNameH="text-center px-4 py-2 bg-[#FBFCFD] border-b border-t border-gray-200"
        classNameB="text-center px-4 py-2 rounded-lg bg-white"
        classNameButton="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-full text-center"
        classNameIcons="cursor-pointer text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
        onEstadoClick={handleEstadoClick}
        onDeleteClick={handleDeleteClick}
      />
    </section>
  );
}
