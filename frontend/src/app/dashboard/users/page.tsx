'use client'
import AdminForm from "@/components/dashboard/adminForms";
import CompanyForms from "@/components/dashboard/companyForms";
import DashboardCardLayout from "@/components/dashboard/dashboardCardLayout";
import React from "react";

export default function page() {
  return (
    <div className="h-screen">
      <DashboardCardLayout />
      <section className="grid grid-cols-2 gap-3 p-2 h-2/4">
        <CompanyForms />
        <AdminForm />
      </section>
    </div>
  );
}
