"use client";
import React from "react";
import { useState } from "react";
import { addCompany } from "@/types/addUsers";
import { createCompanyService } from "@/services/auth/createCompany";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function useCompanyFormValues() {
  const router = useRouter();
  const [containerValues, setContainerValues] = useState<addCompany>({
    companyName: "",
    email: "",
    contactPerson: "",
    password: "",
    phone: "",
    rnc: "",
    discount: "",
    taxes: "",
    type: "",
  });
  const handleContainerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContainerValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleCompanySubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const createAdminResponse = await createCompanyService(containerValues);
      console.log(createAdminResponse);
      setContainerValues({
        companyName: "",
        email: "",
        contactPerson: "",
        password: "",
        phone: "",
        discount: "",
        rnc: "",
        taxes: "",
        type: "",
      });
      Swal.fire({
        title: "Success",
        text: "Empresa añadida correcta",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          router.refresh(); // recarga los datos en Next.js (alternativa moderna a reload)
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        Swal.fire({
          title: "Error",
          text: error.response?.data.message,
          icon: "error",
        });
      } else {
        console.log("Error desconocido:", error);
      }
    }
  };
  return { containerValues, handleCompanySubmit, handleContainerChange };
}
