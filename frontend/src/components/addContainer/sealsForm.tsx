"use client";
import React from "react";
import Inputs from "../ui/inputs";
import useSealsValues from "@/hooks/addContainer/useSealsValues";
import ubicacionesData from "../../../locations.json"; // ajusta la ruta si cambia

export default function SealsForm() {
  const { sealsValues, handleSealsSubmit, handleSealsChange } =
    useSealsValues();

  // Copiamos y ordenamos las ubicaciones por nombre alfabéticamente
  const ubicaciones = [...ubicacionesData.ubicaciones].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4 pt-4">
        <h1 className="text-3xl font-bold tracking-wide mb-2 dark:text-white text-center">
          Carga suelta
        </h1>
      </div>

      <form
        onSubmit={handleSealsSubmit}
        className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4 items-center"
      >
        {/* Dropdown: Puerto de salida */}
        <label className="w-3/4">
          <span className="block mb-1 text-sm font-semibold dark:text-white">
            Punto de salida
          </span>
          <select
            name="port"
            value={sealsValues.port}
            onChange={handleSealsChange}
            className="w-full border border-[#1FB4D0] rounded p-2 dark:text-white dark:border-black"
          >
            <option value="" className="text-black">
              Seleccione una ubicación
            </option>
            {ubicaciones.map((ubicacion, idx) => (
              <option key={idx} value={ubicacion.nombre} className="text-black">
                {ubicacion.nombre}
              </option>
            ))}
          </select>
        </label>

        {/* Dropdown: Puerto de destino */}
        <label className="w-3/4">
          <span className="block mb-1 text-sm font-semibold dark:text-white">
            Punto de destino
          </span>
          <select
            name="destination"
            value={sealsValues.destination}
            onChange={handleSealsChange}
            className="w-full border p-2 border-[#1FB4D0] rounded dark:text-white dark:border-black"
          >
            <option value="" className="text-black">
              Seleccione una ubicación
            </option>
            {ubicaciones.map((ubicacion, idx) => (
              <option key={idx} value={ubicacion.nombre} className="text-black">
                {ubicacion.nombre}
              </option>
            ))}
          </select>
        </label>

        <Inputs
          type="text"
          value={sealsValues.bl}
          name="bl"
          label="Bill of lading / Guía aérea"
          onChange={handleSealsChange}
        />
        <Inputs
          type="datetime-local"
          name="estimatedDate"
          value={sealsValues.estimatedDate}
          onChange={handleSealsChange}
        />

        <button
          type="submit"
          className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer dark:border-transparent dark:bg-[#121F7B]"
        >
          Solicitar
        </button>
      </form>
    </div>
  );
}
