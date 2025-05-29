import React from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { useItemlistLogic } from "../hooks/useItemListLogic";
import ShortLink from "./shortLInk";

export default function ItemlistView({
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
  const {
    mapEvent,
    deviceEvents,
    rotateCard,
    optionSelections,
    sortedDevices,
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
  } = useItemlistLogic({
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
  });

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
            {showShortLink && <ShortLink deviceName={shortName} close={(e) => handleShowShortLink(e,devices.name)}/>}
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
                <div className="link">
                < i 
                  className='bx  bx-link'
                  style={{
                    color: "gray",
                    fontSize: "24px",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleShowShortLink(e, devices.name)}
                    
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