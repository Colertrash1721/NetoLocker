"use client";
import React from "react";
import Inputs from "../ui/inputs";
import Buttons from "../ui/buttons";
import useCompanyFormValues from "@/hooks/dashboard/useCompanyForm";
export default function CompanyForms() {
  const { containerValues, handleCompanySubmit,handleContainerChange } = useCompanyFormValues();
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h1 className="font-bold text-3xl tracking-wide text-black mb-4">
        Crear empresa
      </h1>
      <form onSubmit={(e)=> handleCompanySubmit(e)}>
        <Inputs
          type="text"
          name="companyName"
          value={containerValues.companyName}
          label="Nombre de la empresa"
          onChange={(e) => handleContainerChange(e)}
        />
        <Inputs
          type="text"
          name="email"
          value={containerValues.email}
          label="Email"
          onChange={(e) => handleContainerChange(e)}
        />
        <Inputs
          type="password"
          name="password"
          value={containerValues.password}
          label="Contraseña"
          onChange={(e) => handleContainerChange(e)}
        />
        <Inputs
          type="text"
          name="contactPerson"
          value={containerValues.contactPerson}
          label="Persona de contacto"
          onChange={(e) => handleContainerChange(e)}
        />
        <Inputs
          type="number"
          name="phone"
          value={containerValues.phone}
          label="Numero de telefóno"
          onChange={(e) => handleContainerChange(e)}
        />
        <button
          type="submit"
          className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all after:transition-all duration-300 cursor-pointer"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
