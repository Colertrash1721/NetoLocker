'use client'
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Buttons from "../ui/buttons";
import useLogout from "@/hooks/auth/useLogout";

export default function AsideBar() {
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Botón menú visible solo en móviles */}
      <button
        className="fixed top-5 left-4 z-500 text-black text-3xl md:hidden lg:hidden"
        onClick={toggleMenu}
      >
        <i className="bx bx-menu"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "fixed" : "hidden"
        } z-40 top-0 left-0 h-screen w-full dark:bg-[#13151B] dark:text-gray-500 bg-[#050D68] 
        text-white md:block md:w-64 md:relative`}
      >
        <nav
          aria-label="Main Navigation"
          className="flex flex-col justify-between h-full p-4"
        >
          <div className="space-y-4">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <Image
                  src="/assets/download(1).png"
                  width={180}
                  height={60}
                  alt="Logo image"
                />
                {/* Botón cerrar en móviles */}
                <button
                  className="text-3xl md:hidden"
                  onClick={closeMenu}
                >
                  <i className="bx bx-x"></i>
                </button>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#333E8E] dark:hover:text-white dark:hover:bg-gray-800 rounded"
                  onClick={closeMenu}
                >
                  <i className="bx bx-home"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/routes"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#333E8E] dark:hover:text-white dark:hover:bg-gray-800 rounded"
                  onClick={closeMenu}
                >
                  <i className="bx bx-map"></i>
                  <span>Routes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/users"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#333E8E] dark:hover:text-white dark:hover:bg-gray-800 rounded"
                  onClick={closeMenu}
                >
                  <i className="bx bx-lock"></i>
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <Buttons
              text="Cerrar sesi&oacute;n"
              className="flex gap-2 items-center justify-center p-2 rounded-lg bg-[#715BD5] cursor-pointer hover:bg-red-500 transition-all duration-400 hover:gap-5 w-full dark:text-white dark:bg-gray-800"
              iconsB={<i className="bx bx-door-open text-2xl"></i>}
              onClick={() => {
                closeMenu();
                logout();
              }}
            />
          </div>
        </nav>
      </aside>
    </>
  );
}
