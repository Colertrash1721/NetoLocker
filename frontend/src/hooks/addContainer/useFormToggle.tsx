"use client";
import { useState, useEffect } from "react";

export default function useFormToggle() {
  const [showContainerForm, setShowContainerForm] = useState(true);
  const [stopAnimation, setStopAnimation] = useState(false);
  const [showSealsForm, setShowSealsForm] = useState(false);

  const toggleForm = () => {
    // Empezamos la animación
    setStopAnimation(true);

    // Cambiar entre formularios visuales
    setTimeout(() => {
      setShowContainerForm((prev) => !prev);
    }, 500);

    // Esperar a que termine la animación (ej. 500ms)
    setTimeout(() => {
      setShowSealsForm((prev) => !prev);
      setStopAnimation(false); // Reset animación
    }, 500);
  };

  return { showContainerForm, showSealsForm, stopAnimation, toggleForm };
}
