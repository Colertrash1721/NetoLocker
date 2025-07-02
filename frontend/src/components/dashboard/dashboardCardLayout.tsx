'use client'
import React from 'react'
import DashboardCard from '../ui/dashboardCard'
import useUsers from '@/hooks/dashboard/useUsers'

export default function DashboardCardLayout() {
  const {companies, admins, activeUsers, loading, error} = useUsers();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full'>
        <DashboardCard iconC="bx-user text-5xl" title="Empresas Totales" value={companies} />
        <DashboardCard iconC="bxs-check-circle text-5xl" title="Usuarios activos" value={activeUsers} />
        <DashboardCard iconC="bxs-lock text-5xl" title="Usuarios administradores" value={admins} />
    </section>
  )
}
