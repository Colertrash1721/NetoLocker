"use client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import {
  updateContainerDeviceName,
  updateStateContainer,
} from "@/services/container/updateContainerState";
import {
  updateFreeloadDeviceName,
  updateStateFreeload,
} from "@/services/container/updateFreeloadDeviceState";

import { deleteContainer } from "@/services/container/deletecontainer";
import { deleteFreeload } from "@/services/container/deletefreeload";

export const useDeviceAssignment = () => {
  const router = useRouter();
  const handleEstadoClick = async (estadoActual: string, row: any) => {
    const id = parseInt(row.ticket.split("-")[1]);
    const isFreeload = row.ticket.startsWith("F");

    let nuevoEstado = "";
    let mensajeConfirm = "";
    let mensajeExito = "";

    if (estadoActual === "pendiente") {
      nuevoEstado = "aceptado";
      mensajeConfirm = "¿Deseas cambiar el estado a 'aceptado'?";
      mensajeExito =
        "Estado cambiado a aceptado. Ahora ingresa el nombre del dispositivo.";
    } else if (estadoActual === "aceptado") {
      nuevoEstado = "finalizado";
      mensajeConfirm = "¿Deseas finalizar este registro?";
      mensajeExito = "Registro finalizado correctamente.";
    } else {
      return; // Si ya está finalizado, no hacemos nada
    }

    const confirmResult = await Swal.fire({
      title: `Cambiar a '${nuevoEstado}'`,
      text: mensajeConfirm,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const state = isFreeload
        ? await updateStateFreeload(id, estadoActual)
        : await updateStateContainer(id, estadoActual);

      if (nuevoEstado === "finalizado") {
        await Swal.fire({
          title: "Finalizado",
          text: mensajeExito,
          icon: "success",
        });
        router.refresh()
        return;
      }

      // Si fue aceptado, pedimos el nombre del dispositivo
      const inputResult = await Swal.fire({
        title: "Nombre del dispositivo",
        input: "text",
        inputLabel: "Ingresa el nombre del dispositivo",
        inputPlaceholder: "Ej: NETO-123",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value) return "Debes ingresar un nombre de dispositivo";
          return null;
        },
      });

      if (!inputResult.isConfirmed || !inputResult.value) return;

      // Guardamos el nombre del dispositivo
      isFreeload
        ? await updateFreeloadDeviceName(id, inputResult.value)
        : await updateContainerDeviceName(id, inputResult.value);

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
