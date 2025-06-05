import React from "react";
import NavegationLayout from "@/components/container/navegationLayout";
import FiltersLayout from "@/components/container/filtersLayout";
import TableLayout from "@/components/container/tableLayout";

export default function page() {
  return (
    <div className="bg-[#ffffff]">
      <section className=" flex flex-col h-full text-black p-6 gap-8">
        <NavegationLayout />
        <FiltersLayout />
        <TableLayout />
      </section>
    </div>
  );
}
