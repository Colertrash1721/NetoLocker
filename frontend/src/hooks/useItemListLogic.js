import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TraccarMap from "../pages/gueest";

export function useItemlistLogic({
  batteryLevels,
  device,
  lat,
  lon,
  lastUpdateTime,
  event,
  alarm,
  driver,
  eventChange,
  handleBoardSelection,
  onDeviceSelect,
  onDeleteRoute,
  handleSendEvent,
}) {
  const [mapEvent, setMapEvent] = useState({});
  const [deviceEvents, setDeviceEvents] = useState({});
  const [rotateCard, setRotateCard] = useState({});
  const [optionSelections, setOptionSelections] = useState({});
  const [showShortLink, setshowShortLink] = useState(false)
  const [shortName, setshortName] = useState('');
  const navigate = useNavigate();

  const handleDeleteRoute = async (e, deviceName, deviceId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar la ruta del dispositivo ${deviceName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed && onDeleteRoute) {
        await onDeleteRoute(deviceName, deviceId);
        Swal.fire("¡Eliminado!", "La ruta ha sido eliminada correctamente.", "success");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo eliminar la ruta: " + (error.response?.data?.message || error.message),
        "error"
      );
    }
  };

  const calculateTimeSinceLastUpdate = (lastUpdateTime) => {
    if (!lastUpdateTime) return "Sin datos";
    const currentTime = new Date();
    const minutes = Math.floor((currentTime - lastUpdateTime) / (1000 * 60));
    const days = Math.round(minutes / (60 * 24));
    return days > 0 ? `${days} días` : `${minutes} minutos`;
  };

  useEffect(() => {
    if (eventChange) {
      setDeviceEvents((prev) => ({
        ...prev,
        [eventChange.deviceName]: eventChange.data,
      }));
      setMapEvent(eventChange);
    }
  }, [eventChange]);

  const formatEvent = (event) => {
    if (!event) return "Sin evento";
    return event.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const handleClick = (e, deviceName, deviceId) => {
    e.preventDefault();
    navigate(`/dashboardmain/${deviceName}/${deviceId}`);
  };

  const handleCommandClick = (e, deviceName) => {
    e.preventDefault();
    e.stopPropagation();
    handleBoardSelection?.("commands", deviceName);
  };

  const handleDriverClick = (e, deviceName) => {
    e.preventDefault();
    e.stopPropagation();
    handleBoardSelection?.("drivers");
    onDeviceSelect?.(deviceName);
  };

  const handleRotateCard = (e, devicesId) => {
    e.preventDefault();
    setRotateCard((prev) => ({
      ...prev,
      [devicesId]: !prev[devicesId],
    }));
  };

  const handleSelectionChange = (e, deviceId, type, value) => {
    e.preventDefault();
    setOptionSelections((prev) => {
      const currentSelection = prev[deviceId] || {};
      const currentType = currentSelection[type] || [];

      if (currentType.includes(value)) return prev;

      return {
        ...prev,
        [deviceId]: {
          ...currentSelection,
          [type]: [...currentType, value],
        },
      };
    });
  };

  const handleDeleteSelection = (type, value, deviceId) => {
    setOptionSelections((prev) => {
      const currentSelection = prev[deviceId] || {};
      const currentType = currentSelection[type] || [];

      return {
        ...prev,
        [deviceId]: {
          ...currentSelection,
          [type]: currentType.filter((item) => item !== value),
        },
      };
    });
  };

  const handleSubmitEvent = async (e, device) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas enviar el evento al dispositivo ${device.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, enviar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        handleSendEvent(device.id, optionSelections[device.id]);
        setOptionSelections((prev) => ({
          ...prev,
          [device.id]: { salida: [], entrada: [] },
        }));
        Swal.fire("¡Enviado!", "El evento ha sido enviado correctamente.", "success");
      }
    } catch (error) {
      console.error("Error al enviar el evento:", error);
    }
  };

  const sortedDevices = [...device].sort((a, b) => {
    const hasEventA = deviceEvents[a.name] ? 1 : 0;
    const hasEventB = deviceEvents[b.name] ? 1 : 0;
    return hasEventB - hasEventA;
  });

  const handleShowShortLink = (e, deviceName) =>{
    e.preventDefault();
    setshowShortLink(!showShortLink);
    setshortName(deviceName);
    
  }

  return {
    mapEvent,
    deviceEvents,
    rotateCard,
    optionSelections,
    sortedDevices,
    batteryLevels,
    lat,
    lon,
    lastUpdateTime,
    event,
    alarm,
    driver,
    showShortLink,
    shortName,
    formatEvent,
    calculateTimeSinceLastUpdate,
    handleClick,
    handleCommandClick,
    handleDriverClick,
    handleRotateCard,
    handleSelectionChange,
    handleDeleteSelection,
    handleSubmitEvent,
    handleDeleteRoute,
    handleShowShortLink,
  };
}