"use client";
import React, { useEffect } from "react";
import Inputs from "../ui/inputs";
import ubicacionesData from "../../../locations.json";
import useContainerValues from "@/hooks/addContainer/useContainerValues";

export default function ContainerForm() {
  const { containerValues, handleSubmitContainer, handleContainerChange } =
    useContainerValues();

  const ubicaciones = ubicacionesData.ubicaciones;

  useEffect(() => {
    
    console.log(ubicaciones);
    
  }, [])
  
  return (
    <form
      className="flex flex-col gap-4 p-4 justify-center items-center w-full h-full"
      onSubmit={handleSubmitContainer}
    >
      <h1 className="font-bold text-3xl tracking-wide dark:text-white">Contenedor</h1>

      {/* Dropdown: Puerto de salida */}
      <label className="w-3/4">
        <span className="block mb-1 text-sm font-semibold dark:text-white">Puerto de salida</span>
        <select
          name="port"
          value={containerValues.port}
          onChange={handleContainerChange}
          className="w-full border border-[#1FB4D0] rounded p-2 dark:text-white dark:placeholder-white dark:border-black"
        >
          <option value="" className="text-black">Seleccione una ubicación</option>
          {ubicaciones.map((ubicacion, index) => (
            <option key={index} value={ubicacion?.nombre} className="text-black">
              {ubicacion?.nombre}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown: Puerto de destino */}
      <label className="w-3/4 mb-3">
        <span className="block mb-1 text-sm font-semibold dark:text-white">Puerto de destino</span>
        <select
          name="destination"
          value={containerValues.destination}
          onChange={handleContainerChange}
          className="w-full border border-[#1FB4D0] rounded p-2 dark:text-white dark:placeholder-white dark:border-black"
        >
          <option value="" className="text-black">Seleccione una ubicación</option>
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
  );
}
