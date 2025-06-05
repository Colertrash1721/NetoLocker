import React from 'react'
import DashboardCard from '../ui/dashboardCard'

export default function DashboardCardLayout() {
  return (
    <section className='flex h-[30%] justify-around gap-8 p-6'>
        <DashboardCard iconC="bx-user text-5xl" title="Usuarios Totales" value={30} />
        <DashboardCard iconC="bxs-check-circle text-5xl" title="Usuarios activos" value={10} />
        <DashboardCard iconC="bxs-lock text-5xl" title="Usuarios administradores" value={4} />
    </section>
  )
}
