// hooks/useDeviceRegistration.js
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addOwner } from "../services/addOwner";

export const useDeviceRegistration = (data, onClose) => {
  const [deviceName, setDeviceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data && data.name && data.name.length > 0) {
      setDeviceName(data.name);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deviceName.trim()) {
      setMessage("Por favor ingresa un nombre válido");
      return;
    }

    let usernameToRegister = "";

    const result = await Swal.fire({
      icon: "info",
      text: "¿Desea registrar el dispositivo con este mismo usuario?",
      showCloseButton: true,
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    });

    if (result.isConfirmed) {
      usernameToRegister =
        localStorage.getItem("username") || "Usuario no definido";
      await Swal.fire(`Saved! ${usernameToRegister}`, "", "success");
    } else if (result.isDenied) {
      const { value: customUser } = await Swal.fire({
        title: "Ingrese el nombre del portador",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        confirmButtonText: "Enviar",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "Debe ingresar un nombre";
        },
      });

      if (customUser) {
        usernameToRegister = customUser;
        await Swal.fire(`Saved! ${customUser}`, "", "success");
      } else {
        return; // Usuario canceló
      }
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await addOwner(deviceName, usernameToRegister);
      setMessage("Dispositivo registrado exitosamente");
      setDeviceName("");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al registrar el dispositivo");
      Swal.fire("Error", "No se pudo registrar el dispositivo", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    deviceName,
    setDeviceName,
    isSubmitting,
    message,
    handleSubmit,
  };
};
