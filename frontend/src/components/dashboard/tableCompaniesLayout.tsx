"use client";
import React, { useEffect, useState } from "react";
import Tables from "@/components/ui/tables";

import { useDeviceAssignment } from "@/hooks/container/useDeviceAssignment";
import { fetchAllCompanies } from "@/services/dashboard/read/fetchAllCompanies";
import ModalEditCompany from "./modalEditCompany";

const headers = [
  "Nombre",
  "Email",
  "Rnc",
  "Tipo_de_empresa",
  "Telefono",
  "Persona_de_contacto",
  "Fecha",
  "Eliminar",
  "Editar"
];

export default function TableCompaniesLayout() {
  const [data, setData] = useState([]);
  const {
    modalVisible,
    editingCompany,
    handleDeleteCompany,
    handleUpdateCompany,
    handleSaveUpdateCompany,
    handleCloseModal
  } = useDeviceAssignment();
  
  

  useEffect(() => {
    const getData = async () => {
      try {
        const company = await fetchAllCompanies();
        const formatted = company.map((item: any) => ({
          nombre: item.companyName || "N/A",
          email: item.email,
          rnc: item.rnc || "N/A",
          tipo_de_empresa: item.type || "N/A",
          telefono: item.phone || "N/A",
          persona_de_contacto: item.contactPerson || "N/A",
          fecha: item.creationDate.split('T', 1) || "pendiente",
          eliminar: "bx bx-trash",
          editar: "bx bxs-pencil"
        }));
        setData(formatted);
      } catch (err) {
        console.error("Error loading containers:", err);
      }
    };

    getData();
    
  }, []);

  return (
    <section className="w-full overflow-auto text-black">
      <Tables
        classNameT="w-full min-w-[850px] border-separate border-spacing-0 overflow-hidden border-gray-200 rounded-lg shadow-lg"
        header={headers}
        data={data}
        classNameH="text-center px-4 py-2 bg-[#FBFCFD] border-b border-t border-gray-200"
        classNameB="text-center px-4 py-2 rounded-lg bg-white"
        classNameButton="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-full text-center"
        classNameIcons="cursor-pointer text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
        onDeleteCompany={handleDeleteCompany}
        onUpdateCompany={handleUpdateCompany}
      />
      {modalVisible && editingCompany && (
        <ModalEditCompany
          visible={modalVisible}
          company={editingCompany}
          onClose={handleCloseModal}
          onSave={handleSaveUpdateCompany}
        />
      )}
    </section>
  );
}
