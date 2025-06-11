"use client"
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


import { updateContainerDeviceName } from "@/services/container/updateContainerDeviceName";
import { updateFreeloadDeviceName } from "@/services/container/updateFreeloadDeviceName";

import { deleteContainer } from "@/services/container/deletecontainer";
import { deleteFreeload } from "@/services/container/deletefreeload";

export const useDeviceAssignment = () => {
  const router = useRouter();
  const handleEstadoClick = async (estado: string, row: any) => {
    if (estado !== "pendiente") return;

    const confirmResult = await Swal.fire({
      title: "¿Cambiar a 'aceptado'?",
      text: "¿Deseas cambiar el estado a 'aceptado'?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    const inputResult = await Swal.fire({
      title: "Nombre del dispositivo",
      input: "text",
      inputLabel: "Ingresa el nombre del dispositivo",
      inputPlaceholder: "Ej: NETO-123",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un nombre de dispositivo";
        }
        return null;
      },
    });

    if (!inputResult.isConfirmed || !inputResult.value) return;

    try {
      const id = parseInt(row.ticket.split("-")[1]);
      const isFreeload = row.ticket.startsWith("F");

      if (isFreeload) {
        await updateFreeloadDeviceName(id, inputResult.value);
      } else {
        await updateContainerDeviceName(id, inputResult.value);
      }

      Swal.fire({
        title: "Actualizado",
        text: "Estado y dispositivo actualizados correctamente",
        icon: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al actualizar el estado.",
        icon: "error",
      });
    }
  };

  const handleDeleteClick = async (estado: string, row: any) => {
    if (estado !== "pendiente") return;

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el registro permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const id = parseInt(row.ticket.split("-")[1]);
      console.log(id);

      const isFreeload = row.ticket.startsWith("F");

      if (isFreeload) {
        await deleteFreeload(id);
      } else {
        await deleteContainer(id);
      }

      Swal.fire({
        title: "Eliminando...",
        text: "Por favor espera.",
        timer: 2000, // duración del mensaje (en milisegundos)
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          router.refresh(); // recarga los datos en Next.js (alternativa moderna a reload)
        },
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el registro.",
        icon: "error",
      });
    }
  };

  return {
    handleEstadoClick,
    handleDeleteClick,
  };
};
