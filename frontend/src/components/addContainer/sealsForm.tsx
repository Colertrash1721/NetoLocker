import React from "react";
import Inputs from "../ui/inputs";
import Buttons from "../ui/buttons";
import useSealsValues from "@/hooks/addContainer/useSealsValues";

export default function SealsForm() {
  const { sealsValues, handleSealsChange } = useSealsValues();
  return (
    <form className="flex flex-col gap-4 p-4 justify-center items-center w-full h-full">
      <h1 className="font-bold text-3xl tracking-wide">Precintos</h1>
      <Inputs
        type="text"
        value={sealsValues.port}
        name="port"
        label="Puerto de salida"
        onChange={(e) => handleSealsChange(e)}
      />
      <Inputs
        type="text"
        value={sealsValues.destination}
        name="destination"
        label="Puerto de destino"
        onChange={(e) => handleSealsChange(e)}
      />
      <Inputs
        type="text"
        value={sealsValues.bl}
        name="bl"
        label="Bill of lading"
        onChange={(e) => handleSealsChange(e)}
      />
      <Buttons
        text="Solicitar"
        className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all after:transition-all duration-300 cursor-pointer"
      />
    </form>
  );
}
