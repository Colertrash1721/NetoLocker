import Link from 'next/link';
import React from 'react'

type Props = {
  className?: string;
  text?: string;
  iconsB?: any;
  iconsA?: any;
  link?: any;
  disabled?: any;
  onClick?: () => void;
}

export default function Buttons({link, className, text, iconsB, iconsA, disabled, onClick} : Props) {
  return (
    <Link href={link || '#'} className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={onClick}>{iconsB} {text} {iconsA}</Link>
  )
}
