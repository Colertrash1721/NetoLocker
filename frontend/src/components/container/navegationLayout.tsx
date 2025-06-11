"use client";
import React, { useState } from "react";
import Buttons from "@/components/ui/buttons";
import { handleFacturaClick } from "@/hooks/container/useInvoices";

const className = "flex border-1 border-[#c7c7c7] items-center gap-3 bg-[#f5f5f5] text-black p-2 pl-4 pr-4 hover:scale-105 focus:border-b-2 focus:border-b-[#111870] focus:transform focus:scale-105 focus:shadow-lg transition-all group hover:shadow-lg";

export default function NavegationLayout() {
  const [isLoading, setIsLoading] = useState(false);

  const onGenerateInvoice = async () => {
    setIsLoading(true);
    await handleFacturaClick();
    setIsLoading(false);
  };

  return (
    <section className="flex flex-row items-center">
      <Buttons
        className={`${className} border-r-transparent rounded-l-lg `}
        text="Contenedores"
        link={"/container/"}
        iconsB={<i className="bx bx-receipt group-focus:text-[#111870]"></i>}
      />
      <Buttons
        className={`${className} border-r-transparent border-l-transparent`}
        text="Precintos"
        link={"/container/freeload"}
        iconsB={<i className="bx bx-lock group-focus:text-[#111870]"></i>}
      />
      <Buttons
        className={`${className} border-r-transparent border-l-transparent`}
        text={isLoading ? "Generando..." : "Facturar"}
        iconsB={
          isLoading
            ? <i className="bx bx-loader bx-spin"></i>
            : <i className="bx bx-credit-card group-focus:text-[#111870]"></i>
        }
        onClick={onGenerateInvoice}
        disabled={isLoading}
      />
      <Buttons
        className={`${className} border-l-transparent rounded-r-lg`}
        text="Nuevo"
        link={"/container/addContainer"}
        iconsB={<i className="bx bx-plus group-focus:text-[#111870]"></i>}
      />
    </section>
  );
}
