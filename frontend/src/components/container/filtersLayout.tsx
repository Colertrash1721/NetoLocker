"use client";
import React from "react";
import Filters from "@/components/ui/filters";

const className =
  "border border-gray-100 rounded-lg p-2 placeholder-black text-center shadow-lg transition-all w-1/1/10";

export default function FiltersLayout({
  filter,
  onFilterChange,
}: {
  filter: any;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <section className="flex flex-row flex-wrap gap-4 w-full lg:justify-between justify-start">
      <Filters
        type="text"
        text="Ticket"
        name="ticket"
        className={className}
        onChange={onFilterChange}
        value={filter.ticket || ""}
      />
      <Filters
        type="text"
        text="BL"
        name="bl"
        className={className}
        onChange={onFilterChange}
        value={filter.bl || ""}
      />
      <Filters
        type="text"
        text="Puerto"
        name="port"
        className={className}
        onChange={onFilterChange}
        value={filter.port || ""}
      />
      <Filters
        type="text"
        text="Destino"
        name="destination"
        className={className}
        onChange={onFilterChange}
        value={filter.destination || ""}
      />
      <Filters
        type="text"
        text="Estado"
        name="state"
        className={className}
        onChange={onFilterChange}
        value={filter.state || ""}
      />
      <Filters
        type="date"
        text="Fecha"
        name="date"
        className={`${className} appearance-none min-w-1/10 max-w-1/1`}
        onChange={onFilterChange}
        value={filter.date || ""}
      />
    </section>
  );
}
