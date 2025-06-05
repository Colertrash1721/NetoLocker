"use client";
import React from "react";
import Buttons from "@/components/ui/buttons";

const className ="flex border-1 border-[#c7c7c7] items-center gap-3 bg-[#f5f5f5] text-black p-2 pl-4 pr-4 hover:scale-105 focus:border-b-2 focus:border-b-[#111870] focus:transform focus:scale-105 focus:shadow-lg transition-all group hover:shadow-lg";

export default function NavegationLayout() {
  return (
    <section className="flex flex-row">
      <Buttons
        className={`${className}
          border-r-transparent
          rounded-l-lg `}
        text="Contenedores"
        iconsB={<i className="bx bx-receipt group-focus:text-[#111870]"></i>}
        onClick={() => console.log("Home clicked")}
      />
      <Buttons
        className={`${className}
        border-r-transparent border-l-transparent`}
        text="Precintos"
        iconsB={<i className="bx bx-lock group-focus:text-[#111870]"></i>}
        onClick={() => console.log("Home clicked")}
      />
      <Buttons
        className={`${className} border-l-transparent rounded-r-lg`}
        text="Nuevo"
        iconsB={<i className="bx bx-plus group-focus:text-[#111870]"></i>}
        link={"/container/addContainer"}
        onClick={() => console.log("Home clicked")}
      />
    </section>
  );
}
