import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import Swal from "sweetalert2";

export default function Itemlist({
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

  const navigate = useNavigate();

  const handleDeleteRoute = async (e, deviceName, deviceId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Mostrar confirmación antes de borrar
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar la ruta del dispositivo ${deviceName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        if (onDeleteRoute) {
          await onDeleteRoute(deviceName, deviceId);
          Swal.fire(
            "¡Eliminado!",
            "La ruta ha sido eliminada correctamente.",
            "success"
          );
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo eliminar la ruta: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  };

  const calculateTimeSinceLastUpdate = (lastUpdateTime) => {
    if (!lastUpdateTime) return "Sin datos";
    const currentTime = new Date();
    const minutes = Math.floor((currentTime - lastUpdateTime) / (1000 * 60));

    const days = Math.round(minutes / (60 * 24));

    if (days > 0) {
      return `${days} días`;
    } else {
      return `${minutes} minutos`;
    }
  };

  useEffect(() => {
    if (eventChange) {
      setDeviceEvents((prev) => ({
        ...prev,
        [eventChange.deviceName]: eventChange.data,
      }));
    }
  }, [eventChange]);

  useEffect(() => {
    if (eventChange) {
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

  // Ordenar dispositivos: primero los que tienen eventos
  const sortedDevices = [...device].sort((a, b) => {
    const hasEventA = deviceEvents[a.name] ? 1 : 0;
    const hasEventB = deviceEvents[b.name] ? 1 : 0;
    return hasEventB - hasEventA;
  });

  const handleCommandClick = (e, deviceName) => {
    e.preventDefault();
    e.stopPropagation(); // Evita que se propague el evento
    if (handleBoardSelection) {
      handleBoardSelection("commands", deviceName); // Cambia a la pestaña de comandos
    }
  };

  const handleDriverClick = (e, deviceName) => {
    e.preventDefault();
    e.stopPropagation(); // Evita que se propague el evento
    if (handleBoardSelection) {
      handleBoardSelection("drivers"); // Cambia a la pestaña de conductores
    }
    if (onDeviceSelect) {
      onDeviceSelect(deviceName); // Pasa el nombre del dispositivo al padre
    }
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
    console.log(e.target.value);
    console.log("Tipo:", type);
    console.log("Valor seleccionado:", value);
    setOptionSelections((prev) => {
      const currentSelection = prev[deviceId] || {};
      const currentType = currentSelection[type] || [];

      if (currentType.includes(value)) {
        return prev; // No hacer nada si el valor ya está seleccionado
      }

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
        handleSendEvent(device.id, optionSelections[device.id])
        setOptionSelections((prev) => {
          return {
            ...prev,
            [device.id]: {
              salida: [],
              entrada: [],
            },
          };
        } );
        Swal.fire(
          "¡Enviado!",
          "El evento ha sido enviado correctamente.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error al enviar el evento:", error);
    }
  };
  return (
    <>
      {sortedDevices.map((devices) => {
        const drivers = driver[devices.name] || { name: "Sin conductor" };
        const batteryLevel = batteryLevels[devices.name] || "Sin datos";
        const latitude = lat[devices.name] || "Sin datos";
        const longitud = lon[devices.name] || "Sin datos";
        const lastUpdate = lastUpdateTime[devices.name];
        const timeSinceLastUpdate = calculateTimeSinceLastUpdate(lastUpdate);
        const events = formatEvent(event[devices.name]);
        const alarms = alarm[devices.name];

        return (
          <div
            key={devices.uniqueId}
            className={
              rotateCard[devices.uniqueId] ? `GPSCardRotate` : `GPSCard`
            }
          >
            <div className={`alertGPS`}>
              <div
                className={`imgAlert ${
                  devices.status === "online" ? "true " : "false "
                } ${batteryLevel < 30 && batteryLevel > 10 ? "warning" : ""} ${
                  batteryLevel < 10 ? "danger" : ""
                }`}
              >
                <Link
                  to={`/dashboardmain/${devices.name}/${devices.id}`}
                  onClick={(e) => handleClick(e, devices.name, devices.id)}
                >
                  <i
                    className="bx bx-car"
                    style={{ color: "white", fontSize: "34px" }}
                  ></i>
                </Link>
                <i
                  className="bx bxs-plane-alt"
                  style={{
                    color: "white",
                    fontSize: "34px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleDriverClick(e, devices.name)}
                ></i>
                <i
                  className="bx bx-log-in-circle bx-fade-right-hover"
                  style={{
                    color: "white",
                    fontSize: "34px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleCommandClick(e, devices.name)}
                ></i>
              </div>

              <div className="nameAlert">
                <h2>
                  {devices.name}-{devices.id}
                  <i
                    className={`bx ${
                      deviceEvents[devices.name]
                        ? "bxs-bell bx-tada"
                        : "bx-bell"
                    }`}
                    style={{
                      color: deviceEvents[devices.name] ? "red" : "gray",
                      cursor: "pointer",
                    }}
                    onClick={(e) => handleRotateCard(e, devices.uniqueId)}
                  ></i>
                </h2>
              </div>

              <div className="address">
                <p>
                  Portador <br />
                  dirección <br />
                  <br />
                  Nombre del conductor
                </p>
              </div>

              <div className="direccion">
                <p>
                  {!devices?.attributes?.portador ||
                  devices.attributes.portador.trim() === ""
                    ? "Sin portador"
                    : devices.attributes.portador}
                  {latitude === "" && <br />}
                  <br />
                  {latitude}
                  <br />
                  {longitud}
                  <br />
                  {drivers.name && drivers.name}
                </p>
              </div>

              <div className="lastEvent">
                <p>Último evento:</p>
              </div>

              <div className="dataEvent">
                <p>
                  {deviceEvents[devices.name] ||
                    (events === "alarm" ? alarms : events)}
                </p>
              </div>

              <div className="distancia">
                <p>
                  Estado:{" "}
                  {devices.status === "online"
                    ? "Encendido"
                    : timeSinceLastUpdate === "Sin datos"
                    ? "Apagado"
                    : `Apagado hace ${timeSinceLastUpdate}`}
                </p>
              </div>

              <div className="carga">
                <div className="cargaDate">
                  <p>Carga: {batteryLevel} %</p>
                  <i
                    className={`bx ${
                      batteryLevel > 30
                        ? "bxs-battery"
                        : batteryLevel < 10
                        ? "bxs-battery-empty"
                        : "bxs-battery-low"
                    }`}
                    style={{
                      color: batteryLevel < 10 ? "red" : "green",
                      fontSize: "24px",
                      display: "flex",
                    }}
                  ></i>
                </div>
                <div className="trashIcon">
                  <i
                    className={`bx bx-trash`}
                    style={{
                      color: "gray",
                      fontSize: "24px",
                      display: "flex",
                      cursor: "pointer",
                    }}
                    onClick={(e) =>
                      handleDeleteRoute(e, devices.name, devices.id)
                    }
                  ></i>
                </div>
              </div>
            </div>
            <div className="alertGPSback">
              <div className="nameAlert">
                <h2>
                  {devices.name}-{devices.id}
                </h2>
                <i
                  className={`bx ${
                    deviceEvents[devices.name] ? "bxs-bell bx-tada" : "bx-bell"
                  }`}
                  style={{
                    color: deviceEvents[devices.name] ? "red" : "gray",
                    cursor: "pointer",
                    fontSize: "25px",
                  }}
                  onClick={(e) => handleRotateCard(e, devices.uniqueId)}
                ></i>
              </div>
              <div className="options">
                <form onSubmit={(e) => handleSubmitEvent(e, devices)}>
                  <div className="selectOptions">
                    <div className="selectExit">
                      {optionSelections[devices.id]?.salida?.length > 0 && (
                        <div className="selectedOptions">
                          {optionSelections[devices.id]?.salida?.map(
                            (option, index) => (
                              <div key={index} className="selectedOption">
                                {option}
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeleteSelection(
                                      "salida",
                                      option,
                                      devices.id
                                    );
                                  }}
                                >
                                  x
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      <select
                        name="salida evento"
                        id=""
                        onChange={(e) =>
                          handleSelectionChange(
                            e,
                            devices.id,
                            "salida",
                            e.target.value
                          )
                        }
                      >
                        <option>Evento</option>
                        <option value={`geofenceEnter`}>Entrada a la geofence</option>
                        <option value={`geofenceExit`}>Salida de la geofence</option>
                        <option value={`alarm`}>Bateria baja</option>
                      </select>
                    </div>
                    <div className="selectEnter">
                      {optionSelections[devices.id]?.entrada?.length > 0 && (
                        <div className="selectedOptions">
                          {optionSelections[devices.id]?.entrada?.map(
                            (option, index) => (
                              <div key={index} className="selectedOption">
                                <p>{option}</p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeleteSelection(
                                      "entrada",
                                      option,
                                      devices.id
                                    );
                                  }}
                                >
                                  x
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      <select
                        name="entrada evento"
                        id=""
                        onChange={(e) =>
                          handleSelectionChange(
                            e,
                            devices.id,
                            "entrada",
                            e.target.value
                          )
                        }
                      >
                        <option>Tipo de evento</option>
                        <option value={`web`}>Web</option>
                        <option value={`sms`}>SMS</option>
                        <option value={`email`}>Email</option>
                      </select>
                    </div>
                  </div>
                  <div className="optionsButton">
                    <button type="submit">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
