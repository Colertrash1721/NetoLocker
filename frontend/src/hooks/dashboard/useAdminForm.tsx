"use client";
import React from "react";
import { useState } from "react";
import { addAdmin } from "@/types/addUsers";
import { createAdminService } from "@/services/auth/createAdmin";
import Swal from "sweetalert2";
import axios from "axios";

export default function useAdminFormValues() {
  const [adminValues, setadminValues] = useState<addAdmin>({
    username: "",
    email: "",
    password: "",
  });
  const handleContainerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setadminValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleAdminSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const createAdminResponse = await createAdminService(adminValues);
      console.log(createAdminResponse);
      Swal.fire({
        title: "Success",
        text: "Administrador añadido correctamente",
        icon: "success"
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        Swal.fire({
                title: "Error",
                text: error.response?.data.message,
                icon: "error"
            })
      } else {
        console.log("Error desconocido:", error);
      }
    }
  };
  return { adminValues, handleAdminSubmit, handleContainerChange };
}
