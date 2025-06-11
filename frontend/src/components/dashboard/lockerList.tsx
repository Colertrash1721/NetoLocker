'use client'
import React from "react";
import { LockerType } from "@/hooks/dashboard/useFetchLockersByDate";

type Props = {
  type: LockerType;
  data: any[];
};

export default function LockerList({ type, data }: Props) {
  console.log(data);

  return (
    <ul className="bg-white p-3 rounded overflow-y-auto max-h-[80%] shadow-inner">
      {data.length === 0 ? (
        <li className="text-center text-gray-500">No hay registros recientes</li>
      ) : (
        data.map((item, index) => (
          <li
            key={index}
            className="mb-2 p-2 border-b border-gray-200 flex justify-between items-center"
          >
            <span className="font-bold text-gray-700">
              {item.company.companyName}
            </span>
            <span className="text-sm text-gray-700">{item?.creationDate?.split("T")[0] || "Sin fecha"}</span>
            <span className="text-sm text-blue-800">{item?.estado?.nombre || "Sin estado"}</span>
          </li>
        ))
      )}
    </ul>
  );
}
