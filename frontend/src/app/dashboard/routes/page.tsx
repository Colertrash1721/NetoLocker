import GoogleMapComponent from '@/components/dashboard/map'
import React from 'react'

export default function page() {
  return (
    <section className='grid grid-rows-[40%_60%] h-screen p-6 gap-2'>
      <div className="w-full h-full">
        <GoogleMapComponent />
      </div>
      <article className="grid grid-cols-[30%_70%] gap-4">
        <section className='bg-red-400 h-full w-full'></section>
        <section className='bg-blue-300 h-full w-[98%]'></section>
      </article>
    </section>
  )
}
