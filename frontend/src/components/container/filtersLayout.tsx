"use client";
import React from "react";
import Filters from "@/components/ui/filters";

const baseClass =
  "border border-gray-100 rounded-lg p-2 placeholder-black text-center shadow-lg transition-all dark:bg-[#2D3137] dark:text-white dark:border-transparent dark:placeholder-white";

export default function FiltersLayout({
  filter,
  onFilterChange,
}: {
  filter: any;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <section className="flex flex-wrap gap-4 w-full justify-start dark:text-white">
      <Filters
        type="text"
        text="Ticket"
        name="ticket"
        className={`${baseClass} w-full sm:w-[45%] md:w-[20%] lg:w-[10%]`}
        onChange={onFilterChange}
        value={filter.ticket || ""}
      />
      <Filters
        type="text"
        text="BL"
        name="bl"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[10%]`}
        onChange={onFilterChange}
        value={filter.bl || ""}
      />
      <Filters
        type="text"
        text="Puerto"
        name="port"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[18%]`}
        onChange={onFilterChange}
        value={filter.port || ""}
      />
      <Filters
        type="text"
        text="Destino"
        name="destination"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[18%]`}
        onChange={onFilterChange}
        value={filter.destination || ""}
      />
      <Filters
        type="text"
        text="Estado"
        name="state"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[15%]`}
        onChange={onFilterChange}
        value={filter.state || ""}
      />
      <Filters
        type="date"
        text="Fecha"
        name="date"
        className={`${baseClass} w-full sm:w-[45%] md:w-[30%] lg:w-[18%] appearance-none`}
        onChange={onFilterChange}
        value={filter.date || ""}
      />
    </section>
  );
}
