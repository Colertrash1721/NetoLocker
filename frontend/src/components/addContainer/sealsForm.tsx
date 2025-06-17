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
      <h1 className="font-bold text-3xl tracking-wide">Precintos</h1>

      {/* Dropdown: Puerto de salida */}
      <label className="w-3/4">
        <span className="block mb-1 text-sm font-semibold">Puerto de salida</span>
        <select
          name="port"
          value={sealsValues.port}
          onChange={handleSealsChange}
          className="w-full border border-[#1FB4D0] rounded p-2"
        >
          <option value="">Seleccione una ubicación</option>
          {ubicaciones.map((ubicacion, idx) => (
            <option key={idx} value={ubicacion}>
              {ubicacion}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown: Puerto de destino */}
      <label className="w-3/4 mb-3">
        <span className="block mb-1 text-sm font-semibold">Puerto de destino</span>
        <select
          name="destination"
          value={sealsValues.destination}
          onChange={handleSealsChange}
          className="w-full border p-2 border-[#1FB4D0] rounded"
        >
          <option value="">Seleccione una ubicación</option>
          {ubicaciones.map((ubicacion, idx) => (
            <option key={idx} value={ubicacion}>
              {ubicacion}
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
        className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all after:transition-all duration-300 cursor-pointer"
      >
        Solicitar
      </button>
    </form>
  );
}
