import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { addSeals } from "@/types/addContainer";
import { freeload } from "@/services/container/create/createfreeload";
import { redirect } from "next/navigation";

export default function useSealsValues() {
  const [sealsValues, setSealsValues] = useState<addSeals>({
    port: "",
    destination: "",
    bl: "",
    estimatedDate: ""
  });

  const handleSealsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSealsValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSealsSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLSelectElement>) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    try {
      const freeloadResponse = await freeload(sealsValues, username!);
      Swal.fire({
        title: "Logrado",
        text: "Precinto solicitado de manera correcta",
        icon: "success",
      });
      setTimeout(() => {
        redirect('/container/')
      }, 2000);
      return freeloadResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        Swal.fire({
          title: "Error",
          text: error.response?.data.message,
          icon: "error",
        });
        setTimeout(() => {
          redirect('/container/')
        }, 2000);
      } else {
        console.log("Error desconocido:", error);
        Swal.fire({
          title: "Error",
          text: "Error desconocido",
          icon: "error",
        });
      }
    }
  };

  return { sealsValues, handleSealsSubmit, handleSealsChange };
}
