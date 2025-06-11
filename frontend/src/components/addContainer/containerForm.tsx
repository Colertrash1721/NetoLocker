"use client";
import React from "react";
import Inputs from "../ui/inputs";
import ubicacionesData from "../../../locations.json"; // <-- ajusta el path según tu estructura
import useContainerValues from "@/hooks/addContainer/useContainerValues";

export default function ContainerForm() {
  const { containerValues, handleSubmitContainer, handleContainerChange } =
    useContainerValues();

  const ubicaciones = ubicacionesData.ubicaciones;

  return (
    <form
      className="flex flex-col gap-4 p-4 justify-center items-center w-full h-full"
      onSubmit={handleSubmitContainer}
    >
      <h1 className="font-bold text-3xl tracking-wide">Contenedor</h1>

      {/* Dropdown: Puerto de salida */}
      <label className="w-3/4">
        <span className="block mb-1 text-sm font-semibold">Puerto de salida</span>
        <select
          name="port"
          value={containerValues.port}
          onChange={handleContainerChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Seleccione una ubicación</option>
          {ubicaciones.map((ubicacion, index) => (
            <option key={index} value={ubicacion}>
              {ubicacion}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown: Puerto de destino */}
      <label className="w-3/4">
        <span className="block mb-1 text-sm font-semibold">Puerto de destino</span>
        <select
          name="destination"
          value={containerValues.destination}
          onChange={handleContainerChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Seleccione una ubicación</option>
          {ubicaciones.map((ubicacion, index) => (
            <option key={index} value={ubicacion}>
              {ubicacion}
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

      <button
        type="submit"
        className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        Solicitar
      </button>
    </form>
  );
}
