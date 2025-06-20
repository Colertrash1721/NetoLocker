"use client"

import LockerList from '@/components/dashboard/lockerList'
import LockerSelector from '@/components/dashboard/lockerSelector'
import GoogleMapComponent from '@/components/dashboard/map'
import PieChartComponent from '@/components/dashboard/piechart'
import { LockerType, useFetchLockersByDate } from '@/hooks/dashboard/useFetchLockersByDate'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [type, setType] = useState<LockerType>("contenedor");
  const data = useFetchLockersByDate(type);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section className='grid grid-rows-[40%_60%] h-screen p-6 gap-2'>
      <div className="w-full h-full">
        <GoogleMapComponent />
      </div>
      <article className="grid grid-cols-[30%_70%] gap-4">
        <section className='bg-[#f9f9f9] dark:bg-[#13151B] dark:text-white shadow-2xl h-full w-full flex flex-col items-center justify-center'>
          <h1 className='text-black dark:text-white'>Eventos lanzados este último mes</h1>
          <PieChartComponent />
        </section>
        <section className='bg-[#f9f9f9] dark:bg-[#13151B] dark:text-white h-full w-[98%] p-4 rounded-lg shadow-lg'>
          <LockerSelector type={type} onChange={setType} />
          <LockerList type={type} data={data} />
        </section>
      </article>
    </section>
  );
}
