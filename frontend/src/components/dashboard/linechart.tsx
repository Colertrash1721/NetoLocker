"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCompaniesByMonth } from "@/services/dashboard/fetchUsers";

type CompanyChartData = {
  name: string;
  cantidad: number;
};

export default function SimpleBarChart() {
  const [data, setData] = useState<CompanyChartData[]>([]); 

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getCompaniesByMonth();

        const orderedMonths = [
          "Ene", "Feb", "Mar", "Abr", "May", "Jun",
          "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];

        const monthMap: Record<string, number> = {};
        companies.forEach((c: any) => {
          monthMap[c.mes] = c.cantidad;
        });

        const formatted = orderedMonths.map((mes) => ({
          name: mes,
          cantidad: monthMap[mes] || 0,
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error loading companies by month", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#7495ED" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
