"use client";
import React from "react";
import ContainerForm from "@/components/addContainer/containerForm";
import Wall from "@/components/ui/wall";
import useFormToggle from "@/hooks/addContainer/useFormToggle";
import SealsForm from "./sealsForm";

export default function FormLayout() {
  const { showContainerForm, showSealsForm, stopAnimation, toggleForm } =
    useFormToggle();
  const [wallExpanded, setWallExpanded] = React.useState(false);

  const toggleWall = () => {
    setWallExpanded(!wallExpanded);
  };

  return (
    <div className="forms text-black w-4/5 md:w-3/4 h-4/5 lg:w-3/4 bg-white rounded-lg shadow-md gap-4 overflow-hidden relative dark:bg-[#2D3137]">
      <i 
        className='bx bx-menu absolute top-5 left-5 md:text-[0px] cursor-pointer z-20 text-2xl'
        onClick={toggleWall}
      ></i>
      <div className="absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-in-out z-10">
        <Wall
          className={`absolute
            bg-[#7495ED] dark:bg-[#121F7B]
            ${showContainerForm && !wallExpanded ? "rounded-r-[10rem]" : ""}
            text-white
            flex flex-col items-center justify-center gap-2
            h-full ${wallExpanded ? "w-full" : "w-1/2 hidden md:flex"} transition-all duration-500 ease-in-out z-10
            ${stopAnimation ? "w-full rounded-l-none rounded-r-none" : ""}
            ${showSealsForm && !wallExpanded ? "right-0 rounded-l-[10rem]" : ""}
          `}
          content={
            <>
              <h2 className="text-black text-2xl dark:text-white">
                {showContainerForm
                  ? "Para carga suelta"
                  : "Para contenedor"}
              </h2>
              <button
                onClick={toggleForm}
                className="group overflow-hidden relative border p-2 px-4 rounded-lg after:absolute after:left-[-100%] after:top-0 after:bg-black after:rounded-lg after:w-full after:h-full after:content-[''] after:z-[1] hover:border-black hover:after:left-0 transition-all after:transition-all duration-300 cursor-pointer text-xl dark:text-white"
              >
                <span className="relative z-10 text-black group-hover:text-white dark:text-white">
                  Presione aquí
                </span>
              </button>
            </>
          }
        />
        {showContainerForm && !wallExpanded && (
          <div className="absolute top-0 right-0 h-full md:w-1/2 w-full transition-opacity duration-500 ease-in-out">
            <ContainerForm />
          </div>
        )}
        {showSealsForm && !wallExpanded && (
          <div className="absolute top-0 left-0 h-full md:w-1/2 w-full transition-opacity duration-500 ease-in-out">
            <SealsForm />
          </div>
        )}
      </div>
    </div>
  );
}