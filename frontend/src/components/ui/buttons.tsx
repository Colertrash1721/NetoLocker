import Link from 'next/link';
import React from 'react'

type Props = {
  className?: string;
  text?: string;
  iconsB?: any;
  iconsA?: any;
  link?: any;
  onClick?: () => void;
}

export default function Buttons({link, className, text, iconsB, iconsA, onClick} : Props) {
  return (
    <Link href={link || '#'} className={className} onClick={onClick}>{iconsB} {text} {iconsA}</Link>
  )
}
