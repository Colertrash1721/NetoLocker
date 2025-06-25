"use client";
import React from "react";
import ubicacionesData from "../../../locations.json";

const baseClass =
  "border border-gray-100 rounded-lg p-2 placeholder-black text-center shadow-lg transition-all dark:bg-[#2D3137] dark:text-white dark:border-transparent dark:placeholder-white";

export default function FiltersLayout({
  filter,
  onFilterChange,
}: {
  filter: any;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  const ubicaciones = ubicacionesData.ubicaciones;

  return (
    <section className="flex flex-wrap gap-4 w-full justify-start dark:text-white">
      <input
        type="text"
        placeholder="Ticket"
        name="ticket"
        className={`${baseClass} w-full sm:w-[45%] md:w-[20%] lg:w-[10%]`}
        onChange={onFilterChange}
        value={filter.ticket || ""}
      />
      <input
        type="text"
        placeholder="BL"
        name="bl"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[10%]`}
        onChange={onFilterChange}
        value={filter.bl || ""}
      />

      {/* Puerto (Dropdown) */}
      <select
        name="port"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[18%]`}
        value={filter.port || ""}
        onChange={onFilterChange}
      >
        <option value="">Puerto</option>
        {ubicaciones.map((ubicacion, index) => (
          <option key={index} value={ubicacion.nombre} className="text-black">
            {ubicacion.nombre}
          </option>
        ))}
      </select>

      {/* Destino (Dropdown) */}
      <select
        name="destination"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[18%]`}
        value={filter.destination || ""}
        onChange={onFilterChange}
      >
        <option value="">Destino</option>
        {ubicaciones.map((ubicacion, index) => (
          <option key={index} value={ubicacion.nombre} className="text-black">
            {ubicacion.nombre}
          </option>
        ))}
      </select>

      <select
        name="state"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[18%]`}
        value={filter.state || ""}
        onChange={onFilterChange}
      >
        <option value="">Estado</option>
        <option value="pendiente">Pendiente</option>
        <option value="aceptado">En curso</option>
        <option value="cancelado">Cancelado</option>
        <option value="finalizado">Finalizado</option>
      </select>

      <input
        type="date"
        placeholder="Fecha"
        name="date"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[18%] appearance-none`}
        onChange={onFilterChange}
        value={filter.date || ""}
      />
    </section>
  );
}
