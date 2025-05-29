import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addCommand } from "../services/addCommand";

export const useCommandAssignment = (selectedDevice) => {
  const [command, setCommand] = useState("");
  const [devicesSelected, setDevicesSelected] = useState("");

  useEffect(() => {
    if (selectedDevice && Object.keys(selectedDevice).length !== 0) {
      if (selectedDevice?.data?.name) {
        setDevicesSelected(selectedDevice.data.name);
      } else if (selectedDevice?.name) {
        setDevicesSelected(selectedDevice.name);
      }
    }
  }, [selectedDevice]);

  const assignCommand = async (e) => {
    e.preventDefault();
    try {
      await addCommand(devicesSelected, command);
      Swal.fire({
        title: "Éxito",
        text: "Comando agregado exitosamente",
        icon: "success",
      });
      setCommand("");
      setDevicesSelected("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al agregar comando";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  return {
    command,
    setCommand,
    devicesSelected,
    setDevicesSelected,
    assignCommand,
  };
}
