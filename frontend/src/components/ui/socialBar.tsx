"use client";
import { useState } from "react";

const icons = [
  { className: "bx bx-home", link: "https://netotrack.com", text: "Netotrack.com", action: "link" },
  { className: "bx bxl-whatsapp", link: "+18093721028", text: "809-372-1028", action: "whatsapp" },
  { className: "bx bxl-gmail", link: "info@netotrack.com", text: "info@netotrack.com", action: "copy" },
];

export default function SocialIcons() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleClick = async (item: typeof icons[0]) => {
    if (item.action === "link") {
      window.open(item.link, "_blank");
    } else if (item.action === "copy") {
      await navigator.clipboard.writeText(item.link);
      setCopied(item.text);
      setTimeout(() => setCopied(null), 2000);
    } else if (item.action === "whatsapp") {
      const url = `https://api.whatsapp.com/send?phone=${item.link}&text=Buenas `;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="absolute right-0 top-1/4 hidden md:flex lg:flex flex-col justify-center items-center gap-6 py-6">
      {icons.map((item, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(item)}
          className={`group p-4 relative bg-white text-3xl text-black flex items-center justify-center 
            shadow-[0_10px_15px_rgba(0,0,0,0.2)] rounded-full
            transition-all duration-300 hover:-translate-y-1 
            hover:shadow-[0_15px_25px_rgba(0,0,0,0.3)] 
            ${item.className === "bx bx-home"
              ? "hover:bg-black hover:text-white"
              : item.className === "bx bxl-whatsapp"
                ? "hover:bg-green-500 hover:text-white"
                : "hover:bg-red-500 hover:text-white"}`}
        >
          <i className={item.className}></i>

          {/* Tooltip */}
          <div className="absolute right-[110%] hidden group-hover:block dark:text-white text-black bg-white rounded-lg dark:bg-gray-800 text-sm px-3 py-1 shadow-md whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <span>{copied === item.text ? "Copiado!" : item.text}</span>
            <div className="absolute top-1/2 left-full transform -translate-y-1/2">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white dark:border-l-[#1f2937]"></div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
