"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Datos de ejemplo
const data = [
  { name: "Ene", ventas: 400 },
  { name: "Feb", ventas: 300 },
  { name: "Mar", ventas: 200 },
  { name: "Abr", ventas: 278 },
  { name: "May", ventas: 189 },
  { name: "Jun", ventas: 150 },
  { name: "Jul", ventas: 220 },
  { name: "Ago", ventas: 340 },
  { name: "Sep", ventas: 295 },
  { name: "Oct", ventas: 310 },
  { name: "Nov", ventas: 280 },
  { name: "Dic", ventas: 360 },
];


export default function SimpleBarChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ventas" fill="#7495ED" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
