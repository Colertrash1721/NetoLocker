"use client";
import React from "react";
import Inputs from "../ui/inputs";
import Buttons from "../ui/buttons";
import useContainerValues from "@/hooks/addContainer/useContainerValues";

export default function ContainerForm({}) {
  const { containerValues, handleContainerChange } = useContainerValues();
  return (
    <form className="flex flex-col gap-4 p-4 justify-center items-center w-full h-full">
      <h1 className="font-bold text-3xl tracking-wide">Contenedor</h1>
      <Inputs
        type="text"
        name="port"
        value={containerValues.port}
        label="Puerto de salida"
        onChange={(e) => handleContainerChange(e)}
      />
      <Inputs
        type="text"
        name="destination"
        value={containerValues.destination}
        label="Puerto de destino"
        onChange={(e) => handleContainerChange(e)}
      />
      <Inputs
        type="text"
        name="bl"
        value={containerValues.bl}
        label="Bill of lading"
        onChange={(e) => handleContainerChange(e)}
      />
      <Inputs
        type="text"
        name="ncontainer"
        value={containerValues.ncontainer}
        label="N# Contenedor"
        onChange={(e) => handleContainerChange(e)}
      />
      <Buttons
        text="Solicitar"
        className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all after:transition-all duration-300 cursor-pointer"
      />
    </form>
  );
}
