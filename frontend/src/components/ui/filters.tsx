import React from "react";

type Props = {
  className?: string;
  text?: string;
  value?: string;
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Filters({ className, text, value, type, name, onChange }: Props) {
  // This component renders a section with an input field for filtering items.

  return (
    <input
      type={type}
      className={className}
      name={name}
      placeholder={text}
      value={value}
      onChange={onChange}
    />
  );
}
