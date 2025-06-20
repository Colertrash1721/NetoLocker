"use client";
import React from "react";
import Inputs from "../ui/inputs";
import useSealsValues from "@/hooks/addContainer/useSealsValues";
import ubicacionesData from "../../../locations.json"; // ajusta la ruta si cambia

export default function SealsForm() {
  const { sealsValues, handleSealsSubmit, handleSealsChange } =
    useSealsValues();

  const ubicaciones = ubicacionesData.ubicaciones;

  return (
    <form
      className="flex flex-col gap-4 p-4 justify-center items-center w-full h-full"
      onSubmit={handleSealsSubmit}
    >
      <h1 className="font-bold text-3xl tracking-wide dark:text-white">Precintos</h1>

      {/* Dropdown: Puerto de salida */}
      <label className="w-3/4">
        <span className="block mb-1 text-sm font-semibold dark:text-white">Puerto de salida</span>
        <select
          name="port"
          value={sealsValues.port}
          onChange={handleSealsChange}
          className="w-full border border-[#1FB4D0] rounded p-2 dark:text-white dark:placeholder-white dark:border-black"
        >
          <option value="" className="text-black">Seleccione una ubicación</option>
          {ubicaciones.map((ubicacion, idx) => (
            <option key={idx} value={ubicacion.nombre} className="text-black">
              {ubicacion.nombre}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown: Puerto de destino */}
      <label className="w-3/4 mb-3">
        <span className="block mb-1 text-sm font-semibold dark:text-white">Puerto de destino</span>
        <select
          name="destination"
          value={sealsValues.destination}
          onChange={handleSealsChange}
          className="w-full border p-2 border-[#1FB4D0] rounded dark:text-white dark:placeholder-white dark:border-black"
        >
          <option value="" className="text-black">Seleccione una ubicación</option>
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
        label="Bill of lading"
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
        className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all after:transition-all duration-300 cursor-pointer dark:border-transparent dark:bg-[#121F7B]"
      >
        Solicitar
      </button>
    </form>
  );
}
