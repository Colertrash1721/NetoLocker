// components/Commands.jsx
import React from "react";
import {useCommandAssignment} from "../hooks/useCommandAssigment";

export default function Commands({ devices = [], selectedDevice = {}, Allcommands = [] }) {
  console.log(Allcommands + "comandos");
  
  const {
    command,
    setCommand,
    devicesSelected,
    setDevicesSelected,
    assignCommand,
  } = useCommandAssignment(selectedDevice);

  return (
    <div className="assignCommand">
      <form onSubmit={assignCommand}>
        <p>Asignar comando</p>
        <select
          name="commands"
          onChange={(e) => setCommand(e.target.value)}
          value={command}
          required
        >
          <option value="">Selecciona un comando</option>
          {Allcommands.map((command) => (
            <option key={command.id} value={command.description}>
              {command.description}
            </option>
          ))}
        </select>
        <select
          name="devices"
          onChange={(e) => setDevicesSelected(e.target.value)}
          value={devicesSelected}
          required
        >
          <option value="">Selecciona un dispositivo</option>
          {devices.map((device) => (
            <option key={device.id} value={device.name}>
              {device.name}
            </option>
          ))}
        </select>
        <button type="submit">Asignar</button>
      </form>
    </div>
  );
}
// This code defines a React component that allows users to assign commands to devices.