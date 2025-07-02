import React from "react";

type CardProps = {
  title: string;
  value: number | null | string;
  iconC: React.ReactNode;
};

export default function DashboardCard({ iconC, title, value }: CardProps) {
  return (
    <div className="flex flex-col items-center h-full justify-center w-full bg-[#443ce4] dark:bg-[#202329] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-lg shadow-lg text-center min-h-[150px]">
      <i className={`bx ${iconC}`}></i>
      <h4 className="text-sm text-white">{title}</h4>
      <p className="text-2xl font-bold text-whi">{value}</p>
    </div>
  );
}
