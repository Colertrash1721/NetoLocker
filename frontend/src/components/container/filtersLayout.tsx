'use client'
import React from 'react'
import Filters from '@/components/ui/filters'
import useLogicFilter from '@/hooks/container/useLogicFilter'

const className = 'border border-gray-100 rounded-lg p-2 placeholder-black text-center shadow-lg transition-all w-1/1/10'

export default function FiltersLayout() {
    const { filter, handleFilterChange } = useLogicFilter();
  return (
    <section className='flex flex-row flex-wrap gap-4 w-full lg:justify-between  justify-start'>
        <Filters 
        type='text'
        text='Ticket'
        name={'ticket'}
        className={className}
        onChange={(e) => handleFilterChange(e)}
        value={filter.ticket || ''}
        />
        <Filters 
        type='text'
        text='Cliente'
        name={'client'}
        className={className}
        onChange={(e) => handleFilterChange(e)}
        value={filter.client || ''}
        />
        <Filters 
        type='text'
        text='Puerto'
        name={'port'}
        className={className}
        onChange={(e) => handleFilterChange(e)}
        value={filter.port || ''}
        />
        <Filters 
        type='text'
        text='Destino'
        name={'destination'}
        className={className}
        onChange={(e) => handleFilterChange(e)}
        value={filter.destination || ''}
        />
        <Filters 
        type='text'
        text='Estado'
        name={'state'}
        className={className}
        onChange={(e) => handleFilterChange(e)}
        value={filter.state || ''}
        />
        <Filters 
        type='date'
        text='Fecha'
        name={'date'}
        className={`${className}appearance-none min-w-1/10 max-w-1/1`}
        onChange={(e) => handleFilterChange(e)}
        value={filter.date || ''}
        />
    </section>
  )
}
