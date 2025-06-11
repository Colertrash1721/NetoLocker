"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import NavegationLayout from "@/components/container/navegationLayout";
import FiltersLayout from "@/components/container/filtersLayout";
import TableLayout from "@/components/container/tableLayout";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAddContainer = pathname.includes("addContainer");

  const [filter, setFilter] = useState({
    ticket: "",
    bl: "",
    port: "",
    destination: "",
    state: "",
    date: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <body className="bg-[#FFFDF6]">
      <main className="grid grid-rows-[10%_90%] h-screen">
        <Header />
        {isAddContainer ? (
          children
        ) : (
          <div className="bg-[#ffffff]">
            <section className="flex flex-col h-full text-black p-6 gap-8">
              <NavegationLayout />
              <FiltersLayout filter={filter} onFilterChange={handleFilterChange} />
              <TableLayout filter={filter} />
            </section>
          </div>
        )}
      </main>
    </body>
  );
}
