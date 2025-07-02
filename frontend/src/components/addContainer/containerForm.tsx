"use client";
import React, { useEffect } from "react";
import Inputs from "../ui/inputs";
import ubicacionesData from "../../../locations.json";
import useContainerValues from "@/hooks/addContainer/useContainerValues";

export default function ContainerForm() {
  const { containerValues, handleSubmitContainer, handleContainerChange } =
    useContainerValues();

   const ubicaciones = [...ubicacionesData.ubicaciones].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  useEffect(() => {
    console.log(ubicaciones);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4 pt-4">
        <h1 className="text-3xl font-bold tracking-wide mb-2 dark:text-white text-center">
          Contenedor
        </h1>
      </div>

      <form
        onSubmit={handleSubmitContainer}
        className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4 items-center"
      >
        {/* Dropdown: Puerto de salida */}
        <label className="w-3/4">
          <span className="block mb-1 text-sm font-semibold dark:text-white">
            Punto de salida
          </span>
          <select
            name="port"
            value={containerValues.port}
            onChange={handleContainerChange}
            className="w-full border border-[#1FB4D0] rounded p-2 dark:text-white dark:border-black"
          >
            <option value="" className="text-black">
              Seleccione una ubicación
            </option>
            {ubicaciones.map((ubicacion, index) => (
              <option key={index} value={ubicacion?.nombre} className="text-black">
                {ubicacion?.nombre}
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
            value={containerValues.destination}
            onChange={handleContainerChange}
            className="w-full border border-[#1FB4D0] rounded p-2 dark:text-white dark:border-black"
          >
            <option value="" className="text-black">
              Seleccione una ubicación
            </option>
            {ubicaciones.map((ubicacion, index) => (
              <option key={index} value={ubicacion?.nombre} className="text-black">
                {ubicacion?.nombre}
              </option>
            ))}
          </select>
        </label>

        {/* Otros campos */}
        <Inputs
          type="text"
          name="bl"
          value={containerValues.bl}
          label="Bill of lading"
          onChange={handleContainerChange}
        />
        <Inputs
          type="text"
          name="ncontainer"
          value={containerValues.ncontainer}
          label="N# Contenedor"
          onChange={handleContainerChange}
        />
        <Inputs
          type="datetime-local"
          name="estimatedDate"
          value={containerValues.estimatedDate}
          onChange={handleContainerChange}
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
