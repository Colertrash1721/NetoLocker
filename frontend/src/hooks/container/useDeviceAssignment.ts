"use client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  updateCancelContainerState,
  updateContainerDeviceName,
  updateStateContainer,
} from "@/services/container/update/updateContainerState";
import {
  updateCancelFreeloadState,
  updateFreeloadDeviceName,
  updateStateFreeload,
} from "@/services/container/update/updateFreeloadDeviceState";

import { deleteContainer } from "@/services/container/delete/deletecontainer";
import { deleteFreeload } from "@/services/container/delete/deletefreeload";
import { deleteCompany } from "@/services/dashboard/delete/deleteCompany";

import ModalEditCompany from "@/components/dashboard/modalEditCompany";
import { updateCompany } from "@/services/dashboard/update/updateCompany";

export const useDeviceAssignment = () => {
  const router = useRouter();
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
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
          willClose: () => {
            router.refresh();
            window.location.reload();
          },
        });

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
        ? await updateFreeloadDeviceName(id, inputResult.value, row)
        : await updateContainerDeviceName(id, inputResult.value, row);

      Swal.fire({
        title: "Actualizado",
        text: "Estado y dispositivo actualizados correctamente",
        icon: "success",
        willClose: () => {
          window.location.reload();
        },
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
    if (estado == "aceptado") return;

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
          window.location.reload();
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

  const handleCancelButton = async (row: any) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cancelará el pedido.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const id = parseInt(row.ticket.split("-")[1]);
      console.log(id);

      const isFreeload = row.ticket.startsWith("F");

      if (isFreeload) {
        await updateCancelFreeloadState(id);
      } else {
        await updateCancelContainerState(id);
      }
      Swal.fire({
        title: "Cancelando",
        text: "Por favor espera.",
        timer: 2000, // duración del mensaje (en milisegundos)
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          router.refresh(); // recarga los datos en Next.js (alternativa moderna a reload)
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo cancelar el registro.",
        icon: "error",
      });
    }
  };

  const handleDeleteCompany = async (row: any) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la compañia permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const username = row.nombre;

      console.log(username);

      await deleteCompany(username);
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
          window.location.reload();
        },
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la compañia",
        icon: "error",
      });
    }
  };
  const handleUpdateCompany = async (row: any) => {
    setEditingCompany(row);
    setModalVisible(true);
  };

  const handleSaveUpdateCompany = async (updatedCompany: any) => {
    // Aquí deberías llamar al backend para guardar los cambios
    const username = updatedCompany.nombre;
    const row = {
      name: updatedCompany.nombre,
      email: updatedCompany.email,
      contactPerson: updatedCompany.persona_de_contacto,
      rnc: updatedCompany.rnc,
      cellphone: updatedCompany.telefono,
      companyType: updatedCompany.tipo_de_empresa,
    };
    await updateCompany(username, row);
    Swal.fire({
      title: "Editando...",
      text: "Por favor espera.",
      timer: 2000, // duración del mensaje (en milisegundos)
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        router.refresh(); // recarga los datos en Next.js (alternativa moderna a reload)
        window.location.reload();
      },
    });
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingCompany(null);
  };

  return {
    modalVisible,
    editingCompany,
    handleEstadoClick,
    handleDeleteClick,
    handleDeleteCompany,
    handleUpdateCompany,
    handleSaveUpdateCompany,
    handleCloseModal,
    handleCancelButton,
  };
};
