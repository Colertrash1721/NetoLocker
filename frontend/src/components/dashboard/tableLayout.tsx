import React from "react";
import Tables from "@/components/ui/tables";

const headers = ["Ticket", "Cliente", "Puerto", "Destino", "Estado", "Acciones", "Fecha"];
const data = [
  {
    ticket: "12345",
    cliente: "John Doe",
    puerto: "NYC",
    destino: "LA",
    estado: `Open`,
    acciones: "bx bx-map",
    fecha: "2023-10-01",
  },
  {
    ticket: "12346",
    cliente: "Jane Smith",
    puerto: "SFO",
    destino: "NYC",
    estado: "Closed",
    acciones: "bx bx-trash",
    fecha: "2023-10-02",
  },
  {
    ticket: "12347",
    cliente: "Alice Johnson",
    puerto: "CHI",
    destino: "MIA",
    estado: "In Progress",
    acciones: "bx bx-trash",
    fecha: "2023-10-03",
  },
  {
    ticket: "12348",
    cliente: "Bob Brown",
    puerto: "HOU",
    destino: "SEA",
    estado: "Pending",
    acciones: "bx bx-trash",
    fecha: "2023-10-04",
  },
];

export default function TableLayout() {
  return (
    <section className="w-full overflow-auto">
      <Tables
        classNameT="w-full min-w-[850px] border-separateborder-spacing-0 overflow-hidden border-gray-200 rounded-lg shadow-lg"
        header={headers}
        data={data}
        classNameH="text-center px-4 py-2 bg-[#FBFCFD] border-b border-t border-gray-200"
        classNameB="text-center px-4 py-2 rounded-lg bg-white"
        classNameButton="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200 w-full text-center"
        classNameIcons="cursor-pointer text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
      />
    </section>
  );
}
