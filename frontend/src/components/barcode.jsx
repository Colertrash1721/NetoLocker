import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const DeviceNameInput = ({ onClose, data }) => {
  const [deviceName, setDeviceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!deviceName.trim()) {
      setMessage("Por favor ingresa un nombre válido");
      return;
    }
  
    let usernameToRegister = '';
  
    const result = await Swal.fire({
      icon: "info",
      text: "¿Desea registrar el dispositivo con este mismo usuario?",
      showCloseButton: true,
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    });
  
    if (result.isConfirmed) {
      usernameToRegister = localStorage.getItem("username") || 'Usuario no definido';
      await Swal.fire(`Saved! ${usernameToRegister}`, "", "success");
    } else if (result.isDenied) {
      const { value: customUser } = await Swal.fire({
        title: "Ingrese el nombre del portador",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        confirmButtonText: "Enviar",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return 'Debe ingresar un nombre';
        }
      });
      
      if (customUser) {
        usernameToRegister = customUser;
        await Swal.fire(`Saved! ${customUser}`, "", "success");
      } else {
        return; // Usuario canceló
      }
    }
  
    setIsSubmitting(true);
    setMessage("");
    console.log(process.env.REACT_APP_MY_BACKEND_API);
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MY_BACKEND_API}/device/owner`,
        {
          deviceName: deviceName,
          owner: usernameToRegister
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
  
      setMessage("Dispositivo registrado exitosamente");
      setDeviceName("");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al registrar el dispositivo");
      Swal.fire("Error", "No se pudo registrar el dispositivo", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data && data.name && data.name.length > 0) {
      setDeviceName(data.name); // Use the setter function instead of direct assignment
    }
  }, [data]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#2c3e50",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        zIndex: 1000,
        width: "350px",
        maxWidth: "90vw",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: 0 }}>Registrar Dispositivo</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
            }}
          >
            Nombre del dispositivo:
          </label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            style={{
              width: "calc(100% - 20px)",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
            placeholder="Ej: Dispositivo Sala Principal"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !deviceName.trim()}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor:
              isSubmitting || !deviceName.trim() ? "#7f8c8d" : "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor:
              isSubmitting || !deviceName.trim() ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {isSubmitting ? "Enviando..." : "Registrar Dispositivo"}
        </button>
      </form>

      {message && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: message.includes("exitosamente")
              ? "rgba(46, 204, 113, 0.2)"
              : "rgba(231, 76, 60, 0.2)",
            color: message.includes("exitosamente") ? "#2ecc71" : "#e74c3c",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};
