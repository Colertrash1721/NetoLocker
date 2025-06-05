import React from "react";

type CardProps = {
  title: string;
  value: number | string;
  iconC: React.ReactNode;
};

export default function DashboardCard({ iconC, title, value }: CardProps) {
  return (
    <div className="flex flex-col items-center h-full justify-center w-full bg-[#443ce4] rounded-lg shadow-lg text-center">
      <i className={`bx ${iconC}`}></i>
      <h4 className="text-sm text-white">{title}</h4>
      <p className="text-2xl font-bold text-whi">{value}</p>
    </div>
  );
}
