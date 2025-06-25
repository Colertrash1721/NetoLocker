import { useState, useEffect } from "react";
import { loginUser, createQR, verify2FA } from "../services/loginService";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code2FA, setCode2FA] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [qrImage, setQrImage] = useState(null);
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

      // Solicita el QR para 2FA
      const qr = await createQR(data.user.name);
      setQrImage(qr.qrCodeDataURL);
      setShow2FA(true); // muestra campo para ingresar código
    } catch (error) {
      setErrorMessage(error.message || "Credenciales incorrectas");
    }
  };

  const handleVerify2FA = async () => {
    setErrorMessage(""); // limpia antes
    try {
      const result = await verify2FA(username, password, code2FA);
      console.log(result);
      
      if (!result || !result.message) {
        throw new Error("Respuesta inválida del servidor");
      }

      if (result.message.includes("exitosa")) {
        setSuccessText("✅ Autenticación completa");
        setTimeout(() => navigate("/dashboardmain"), 2000);
      } else {
        throw new Error("❌ Código 2FA incorrecto");
      }
    } catch (error) {
      console.error("Error al verificar 2FA:", error); // para depuración
      setSuccessText(""); // limpia cualquier éxito previo
      setErrorMessage(error.message || "❌ Error al verificar el código 2FA");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccessText(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return {
    username,
    password,
    code2FA,
    setUsername,
    setPassword,
    setCode2FA,
    handleLogin,
    handleVerify2FA,
    errorMessage,
    success,
    qrImage,
    show2FA,
  };
}
