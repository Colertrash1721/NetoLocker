import React from 'react';
import { useState } from 'react';
import { addContainer } from '@/types/addContainer';
import { container } from '@/services/container/Createcontainer';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';

export default function useContainerValues() {
  const [containerValues, setContainerValues] = useState<addContainer>({
    port: '',
    destination: '',
    bl: '',
    ncontainer: ''
  });

  const handleContainerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContainerValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmitContainer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    try {
      const response = await container(containerValues, username!);
      console.log("container response", response);

      Swal.fire({
        title: "Éxito",
        text: "Contenedor solicitado correctamente",
        icon: "success"
      });

      setTimeout(() => {
        redirect('/container/')
      }, 2000);
    } catch (error: any) {
      console.error("Error al crear contenedor", error);

      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Error desconocido",
        icon: "error"
      });
    }
  };

  return { containerValues, handleSubmitContainer, handleContainerChange };
}
