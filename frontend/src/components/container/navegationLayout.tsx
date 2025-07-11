"use client";
import React, { useState } from "react";
import Buttons from "@/components/ui/buttons";
import { handleFacturaClick } from "@/hooks/container/useInvoices";
import {Darkmode} from "../ui/darkmode";
import changePass from "@/hooks/auth/updatePass";

const className = "flex border-1 border-[#c7c7c7] items-center gap-3 bg-[#f5f5f5] text-black p-2 pl-4 pr-4 hover:scale-105 focus:border-b-2 focus:border-b-[#111870] focus:transform focus:scale-105 focus:shadow-lg transition-all group hover:shadow-lg dark:bg-[#2D3137] dark:text-white dark:border-transparent dark:shadow-2xl";

export default function NavegationLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const changePassHandler = changePass();

  // const onGenerateInvoice = async () => {
  //   setIsLoading(true);
  //   await handleFacturaClick();
  //   setIsLoading(false);
  // };

  return (
    <div className="flex justify-between">
    <section className="flex flex-row items-center">
      <Buttons
        className={`${className} border-r-transparent rounded-l-lg `}
        text="Contenedores"
        link={"/container/"}
        iconsB={<i className="bx bx-receipt group-focus:text-[#111870]"></i>}
      />
      <Buttons
        className={`${className} border-r-transparent border-l-transparent`}
        text="Carga suelta"
        link={"/container/freeload"}
        iconsB={<i className="bx bx-lock group-focus:text-[#111870]"></i>}
      />
      <Buttons
        className={`${className} border-r-transparent border-l-transparent`}
        text={isLoading ? "Generando..." : "Contraseña"}
        iconsB={
          isLoading
            ? <i className="bx bx-loader bx-spin"></i>
            : <i className="bx bx-lock group-focus:text-[#111870]"></i>
        }
        onClick={changePassHandler}
        disabled={isLoading}
      />
      <Buttons
        className={`${className} border-l-transparent rounded-r-lg`}
        text="Nuevo"
        link={"/container/addContainer"}
        iconsB={<i className="bx bx-plus group-focus:text-[#111870]"></i>}
      />
    </section>
    <section>
      <Darkmode />
    </section>
    </div>
  );
}
