'use client'
import AdminForm from "@/components/dashboard/adminForms";
import CompanyForms from "@/components/dashboard/companyForms";
import DashboardCardLayout from "@/components/dashboard/dashboardCardLayout";
import TableCompaniesLayout from "@/components/dashboard/tableCompaniesLayout";
import { useHandleOptions } from "@/hooks/dashboard/useHandleOptions";
import { useDropdown } from "@/hooks/ui/useDropdown";
import React from "react";

export default function page() {
  const { showOptions, handleShowOptions } = useDropdown();
  const {option, handleOption} = useHandleOptions();
  return (
    <div className="min-h-screen">
      <DashboardCardLayout />
      <div className="flex w-full relative texl-lg justify-end p-2">
        <button className="cursor-pointer p-4 w-3xs rounded-lg bg-gradient-to-br from-[#a65eff] via-[#7E88FF] to-[#58A7FF] text-white flex justify-between items-center dark:from-[#1a1c1e] dark:via-[#2a2d31] dark:to-[#1a1c1e]" onClick={handleShowOptions}>
          Actions
          {showOptions ? <i className="bx bx-chevron-up"></i> : <i className="bx bx-chevron-down"></i>}
        </button>
        <div className={`flex flex-col gap-2 text-lg text-white absolute bg-gradient-to-br from-[#a65eff] via-[#7E88FF] to-[#58A7FF] top-[150%] w-3xs p-2 rounded-lg z-50 transform transition-all duration-300 ease-in-out ${showOptions ? 'opacity-100 translate-y-[-50%] pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'} dark:bg-[#202329] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:from-[#1a1c1e] dark:via-[#2a2d31] dark:to-[#1a1c1e]`}>
          <a className="block pl-2 pr-2 cursor-pointer hover:bg-white/40 rounded-lg" onClick={(e)=>handleOption(e)}>Agregar</a>
          <a className="block pl-2 pr-2 cursor-pointer hover:bg-white/40 rounded-lg" onClick={(e)=>handleOption(e)}>Listar</a>
        </div>
      </div>
      {option === "listar" ? 
        <TableCompaniesLayout />
      : (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2 h-auto">
        <CompanyForms />
        <AdminForm />
      </section>
      )}
    </div>
  );
}
