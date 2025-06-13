'use client'
import React from 'react'
import DashboardCard from '../ui/dashboardCard'
import useUsers from '@/hooks/dashboard/useUsers'

export default function DashboardCardLayout() {
  const {companies, admins, activeUsers, loading, error} = useUsers();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className='flex h-[30%] justify-around gap-8 p-6'>
        <DashboardCard iconC="bx-user text-5xl" title="Empresas Totales" value={companies} />
        <DashboardCard iconC="bxs-check-circle text-5xl" title="Usuarios activos" value={activeUsers} />
        <DashboardCard iconC="bxs-lock text-5xl" title="Usuarios administradores" value={admins} />
    </section>
  )
}
