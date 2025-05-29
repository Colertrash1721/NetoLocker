import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccessText] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_MY_BACKEND_API}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUser: {
            NameUser: username,
            emailUser: email,
            passwordUser: password,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessText("Se pudo registrar correctamente");
        setTimeout(() => navigate('/'), 3000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Error en el registro");
    }
  };

  // Verifica si el usuario ya existe
  useEffect(() => {
    if (username.trim() === "") return;
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MY_BACKEND_API}/auth/${username}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        if (!response.ok) {
          setMessage("");
        } else {
          setMessage("Este usuario ya existe, intente otro");
        }
      } catch (error) {
        setMessage(""); // Usuario disponible
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccessText(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    handleRegister,
    errorMessage,
    success,
    message,
  };
}
