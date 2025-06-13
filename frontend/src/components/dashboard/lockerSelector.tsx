"use client"
// components/dashboard/LockerSelector.tsx
import React from "react";
import { LockerType } from "@/hooks/dashboard/useFetchLockersByDate";

type Props = {
  type: LockerType;
  onChange: (value: LockerType) => void;
};

export default function LockerSelector({ type, onChange }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <label htmlFor="selectType" className="text-lg text-black">
        Tipo de búsqueda:
      </label>
      <select
        id="selectType"
        value={type}
        onChange={(e) => onChange(e.target.value as LockerType)}
        className="px-3 py-1 rounded text-black"
      >
        <option value="contenedor">Contenedor</option>
        <option value="freeload">Carga libre</option>
      </select>
    </div>
  );
}
