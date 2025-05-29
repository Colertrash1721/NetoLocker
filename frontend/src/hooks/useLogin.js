// hooks/useLogin.js
import { useState, useEffect } from "react";
import {loginUser} from "../services/loginService";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccessText] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const data = await loginUser(formData);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", username);
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("password", password);

      setSuccessText("Usuario logeado correctamente");
      setTimeout(() => navigate("/dashboardmain"), 2000);
    } catch (error) {
      setErrorMessage(error.message || "Credenciales incorrectas");
    }
  };

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
    password,
    setUsername,
    setPassword,
    handleLogin,
    errorMessage,
    success,
  };
}
