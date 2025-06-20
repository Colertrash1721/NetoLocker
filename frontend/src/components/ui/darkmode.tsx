'use client'
import useDarkmode from '@/hooks/ui/useDarkmode';
import React, { useEffect } from 'react'

export function Darkmode() {

  const { applyTheme } = useDarkmode();

  const btnclass = "flex border-1 border-[#c7c7c7] items-center gap-3 bg-white text-black p-3 pl-4 pr-4 hover:scale-105 focus:border-b-2 focus:border-b-[#111870] text-xl focus:transform focus:scale-105 focus:shadow-lg transition-all group hover:shadow-lg rounded-lg"
  return (
    <div className='flex gap-2'>
      <button className={btnclass} onClick={() => applyTheme('light')}><i className="bx bxs-sun"></i></button>
      <button className={btnclass} onClick={() => applyTheme('dark')}><i className="bx bxs-moon"></i></button>
    </div>
  )
}

export function OneButtonDarkMode() {

  const { oneButtonapplyTheme } = useDarkmode();

  return (
    <button className="flex border-1 border-[#c7c7c7] items-center gap-3 bg-white text-black p-3 pl-4 pr-4 hover:scale-105 text-xl focus:transform focus:scale-105 focus:shadow-lg transition-all group hover:shadow-lg rounded-full dark:text-white dark:bg-[#2D3137]" onClick={oneButtonapplyTheme}>
      <i className="bx bxs-sun"></i>
    </button>
  )
}
