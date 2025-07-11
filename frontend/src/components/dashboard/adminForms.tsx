"use client";
import React from "react";
import Inputs from "../ui/inputs";
import useAdminFormValues from "@/hooks/dashboard/useAdminForm";

export default function AdminForm() {
  const { adminValues, handleAdminSubmit, handleContainerChange } =
    useAdminFormValues();
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 dark:bg-[#202329] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <h1 className="font-bold text-3xl tracking-wide text-black mb-4 dark:text-white">
        Crear administrador
      </h1>
      <form onSubmit={(e) => handleAdminSubmit(e)}>
        <Inputs
          type="text"
          name="username"
          value={adminValues.username}
          label="Nombre de usuario"
          onChange={(e) => handleContainerChange(e)}
        />
        <Inputs
          type="text"
          name="email"
          value={adminValues.email}
          label="Email"
          onChange={(e) => handleContainerChange(e)}
        />
        <Inputs
          type="text"
          name="password"
          value={adminValues.password}
          label="Contraseña"
          onChange={(e) => handleContainerChange(e)}
        />
        <button
          type="submit"
          className="w-3/4 border p-2.5 text-center bg-[#7495ED] dark:bg-gray-700 dark:border-transparent text-white rounded-lg hover:shadow-lg transition-all after:transition-all duration-300 cursor-pointer"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
