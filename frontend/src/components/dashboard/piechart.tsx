"use client";
import { getEvents } from "@/services/dashboard/fetchAllEvents";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

type eventData = {
  eventType: string;       // Tipo de evento
  total: number | string;   // Total por tipo (puede venir como string)
};

export default function PieChartComponent() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events: eventData[] = await getEvents();
        
        // Asegurarse de que el valor sea un número
        const formattedData = events.map((event) => ({
          name: event.eventType,
          value: Number(event.total), // Convertir a número explícitamente
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("Datos actualizados:", data);
  }, [data]);

  return (
    <ResponsiveContainer width={400} height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={20}
          outerRadius={90}
          fill="#82ca9d"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}