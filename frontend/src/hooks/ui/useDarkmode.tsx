'use client'
import {useEffect, useState} from 'react'

export default function useDarkmode(){
    const [theme, setTheme] = useState('light')

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }, [])

    const applyTheme = (mode: 'light' | 'dark') =>{
        setTheme(mode);
        localStorage.setItem('theme',mode)
        document.documentElement.classList.toggle('dark', mode === 'dark')
    }
    const oneButtonapplyTheme = () =>{
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    return {setTheme,applyTheme, oneButtonapplyTheme}
    
}