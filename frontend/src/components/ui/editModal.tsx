import { useState, useEffect } from "react";
import ubicacionesData from "../../../locations.json";

export function EditModal({
  row,
  onClose,
  onSave,
}: {
  row: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}) {
  const [form, setForm] = useState({
    bl: row.BL || row.bl || "",
    port: row.port || "",
    destination: row.destination || "",
    ncontainer: row.ncontainer || "",
    fecha: row.fecha?.split("T")[0] || ""
  });

  const ubicaciones = ubicacionesData.ubicaciones;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl min-w-[300px] w-[90%] max-w-[500px]">
        <h2 className="text-lg font-bold mb-4">Editar Datos del Dispositivo</h2>

        <label className="block mb-3">
          <span className="block mb-1 font-medium">Puerto de salida</span>
          <select
            name="port"
            value={form.port}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map((ubicacion, index) => (
              <option key={index} value={ubicacion.nombre}>
                {ubicacion.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-3">
          <span className="block mb-1 font-medium">Puerto de destino</span>
          <select
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map((ubicacion, index) => (
              <option key={index} value={ubicacion.nombre}>
                {ubicacion.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">BL</span>
          <input
            name="bl"
            value={form.bl}
            onChange={handleChange}
            placeholder="BL"
            className="border p-2 w-full"
          />
        </label>
        {row.ncontainer && row.ncontainer.lenght > 0 &&
          <label className="block mb-4">
            <span className="block mb-1 font-medium">N# contenedor</span>
            <input
              name="ncontainer"
              value={form.ncontainer}
              onChange={handleChange}
              placeholder="N# Contenedor"
              className="border p-2 w-full"
            />
          </label>
        }
        <label className="block mb-4">
          <span className="block mb-1 font-medium">Fecha estimada</span>
          <input
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            placeholder="Fecha estimada"
            className="border p-2 w-full"
            type="datetime-local"
          />
        </label>

        <div className="flex justify-between">
          <button
            className="bg-gray-400 px-4 py-2 rounded text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 px-4 py-2 rounded text-white"
            onClick={() => onSave(form)}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
