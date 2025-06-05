'use client'
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Buttons from "../ui/buttons";
import useLogout from "@/hooks/auth/useLogout";

export default function AsideBar() {
  const logout = useLogout();
  return (
    <aside className="top-0 left-0 h-full w-full bg-[#050D68] text-white">
      <nav
        aria-label="Main Navigation"
        className="flex flex-col justify-between w-64 h-full bg-[#050D68] text-white"
      >
        <div className="space-y-4 p-4">
          <ul className="space-y-4">
            <li>
              <Image
                src="/assets/download(1).png"
                width={200}
                height={200}
                alt="Logo image"
              ></Image>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-[#333E8E] rounded"
              >
                <i className="bx bx-home"></i> Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/routes"
                className="block px-4 py-2 hover:bg-[#333E8E] rounded"
              >
                <i className="bx bx-map"></i> Routes
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/lockers"
                className="block px-4 py-2 hover:bg-[#333E8E] rounded"
              >
                <i className="bx bx-lock"></i> Lockers
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 flex justify-center w-full">
          <Buttons
            text="Cerrar sesi&oacute;n"
            className="flex gap-1 items-center justify-center p-2 rounded-lg bg-[#715BD5] cursor-pointer hover:bg-red-500 transition-all duration-400 hover:gap-5 w-full"
            iconsB={<i className="bx bx-door-open text-2xl"></i>}
            onClick={logout}
          ></Buttons>
        </div>
      </nav>
    </aside>
  );
}
