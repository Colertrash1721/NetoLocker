import React from "react";
import "../style/main.css";

export default function Botones({onClick, id, name, icon}) {
  // Botones component that renders a button with an onClick event handler and an id
  return <button onClick={onClick} id={id}><i className={icon} ></i> {name}</button>;
}
