'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useLogout from "@/hooks/auth/useLogout";

export default function Header() {
  const [username, setusername] = useState("");
  const logout = useLogout();

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) {
      setusername(stored);
    }
  }, []);

  return (
    <header className="flex justify-center sm:justify-between items-center text-white bg-[#213388] h-full pr-2.5 pl-2.5 sm:pr-4.5 sm:pl-4.5 md:pr-6 md:pl-6 px-2">
      <Image
        src="/assets/download(1).png"
        alt="Logo"
        width={300}
        height={300}
        className="w-60 sm:h-12 md:w-60 md:h-16 lg:w-60 lg:h-12  object-contain"
        priority
      />
      <div className="flex flex-row items-center gap-1">
        <h1 className="text-lg hidden md:block sm:text-2xl md:text-3xl">
          {username ? username : "admin"}
        </h1>
        <i className="bx bx-door-open text-3xl cursor-pointer" onClick={logout}></i>
      </div>
    </header>
  );
}
