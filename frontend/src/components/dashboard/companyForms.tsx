"use client";
import React from "react";
import Inputs from "../ui/inputs";
import useCompanyFormValues from "@/hooks/dashboard/useCompanyForm";
export default function CompanyForms() {
  const { containerValues, handleCompanySubmit, handleContainerChange } = useCompanyFormValues();
  return (
    <div className="bg-white shadow-lg dark:bg-[#202329] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-xl p-6 max-h-full overflow-hidden">
      <h1 className="font-bold text-3xl tracking-wide text-black mb-4 dark:text-white">
        Crear empresa
      </h1>
      <form className="overflow-auto h-[90%]" onSubmit={(e) => handleCompanySubmit(e)}>
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
        <Inputs
          type="text"
          name="rnc"
          value={containerValues.rnc}
          label="RNC"
          onChange={(e) => handleContainerChange(e)}
        />
        <div className="relative flex items-center justify-center inputGroup w-3/4 mb-6">
          <select name="type"
            className="peer border border-[#1FB4D0] rounded p-2 w-full outline-none text-black dark:text-white dark:border-black focus:shadow-md transition-all"
            value={containerValues.type}
            onChange={(e) => handleContainerChange(e)}>
            <option value="" className="dark:text-dark">Tipo de empresa</option>
            <option value="Consumidor final" className="dark:text-black">Consumidor final</option>
            <option value="Credito fiscal" className="dark:text-black">Credito fiscal</option>
            <option value="Regimen especial" className="dark:text-black">Regimen especial</option>
          </select>
        </div>
        <Inputs
          type="number"
          name="discount"
          min={0}
          max={15}
          value={containerValues.discount || '0'}
          label="Descuento"
          onChange={(e) => handleContainerChange(e)}
        />
        <button
          type="submit"
          className="w-3/4 border p-2.5 text-center bg-[#7495ED] text-white rounded-lg hover:shadow-lg transition-all after:transition-all duration-300 cursor-pointer dark:bg-gray-600 dark:border-transparent"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
