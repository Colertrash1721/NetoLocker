import React from "react";
import { useState } from "react";

export const useValidateInput = () => {
  // This is a customHook to validate the shortLink component
  const [inputValue, setInputValue] = useState({
    deviceName: "",
    expirationDate: "",
    companyName: "",
    link: "",
  });

  // Function to validate the input value
  const validateInput = (e) => {
    const { name, value } = e.target;
    // Update the input value based on the name of the input field
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Check if the input value is empty or contains only whitespace
    if (!e.target.value.trim()) {
      console.log(`El campo no puede estar vacío`);
      return;
    }
    console.log("El campo es válido");
  };
  return { inputValue, validateInput, setInputValue };
};

