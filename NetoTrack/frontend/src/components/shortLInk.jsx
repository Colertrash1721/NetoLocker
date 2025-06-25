import React, { useEffect } from "react";
import "../style/main.css";
import Botones from "./botones";
import { useParams } from "react-router-dom";
import { useValidateInput } from "../hooks/useValidateInput";
import { generateShortLink } from "../services/generateShortLink";
import { getToken } from "../services/getToken";
import Swal from "sweetalert2";

export default function ShortLink({ deviceName, close }) {
  // ShortLink component that renders a form for creating a short link
  // It includes input fields for device name, expiration date, and link
  // It also includes buttons for generating the short link and copying it
  // The component uses a custom Botones component for rendering buttons
  const protocol = window.location.protocol;
  const host = window.location.host;
  const url = `${protocol}://${host}`;
  
  const { token } = useParams();

  const { inputValue, validateInput, setInputValue } = useValidateInput();

  const generateLink = async () => {
    try {
      const token = await generateShortLink(inputValue);
      const shortLink = `${url}/shortLink/token/${token}`;
      console.log(shortLink);
      console.log(inputValue);
      setInputValue((prev) => ({ ...prev, link: shortLink }));
      console.log(inputValue);

      Swal.fire({
        title: "Éxito",
        text: "Enlace generado correctamente",
        icon: "success",
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      const getTokenResponse = async () => {
        try {
          const tokenResponse = await getToken(token);
          console.log(tokenResponse);
        } catch (error) {
          console.log(error);
        }
      };
    }
  }, [useParams]);

  useEffect(() => {
    console.log('DeviceName changed:', deviceName);
    setInputValue(prev => ({
      ...prev,
      deviceName: deviceName || ''
    }));
  }, [deviceName, setInputValue]);

  return (
    <div className="shortContainer">
      <i
        className="bx  bx-link"
        style={{
          color: "black",
          fontSize: "24px",
          display: "flex",
          cursor: "pointer",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        onClick={(e) => close(e)}
      ></i>
      <div className="shortContent">
        <div className="shortCard">
          shortLink
          <div
            className={`input-group ${
              inputValue.deviceName ? "hadContent" : ""
            }`}
          >
            <input
              name="deviceName"
              type="text"
              value={inputValue.deviceName}
              onChange={(e) => validateInput(e)}
            />
            <span>DeviceName</span>
          </div>
          <div className="input-group hadContent">
            <input
              name="expirationDate"
              type="date"
              value={inputValue.expirationDate}
              onChange={(e) => validateInput(e)}
            />
            <span>Caducidad</span>
          </div>
          <div
            className={`input-group ${
              inputValue.companyName ? "hadContent" : ""
            }`}
          >
            <input
              name="companyName"
              type="text"
              value={inputValue.companyName}
              onChange={(e) => validateInput(e)}
            />
            <span>Empresa</span>
          </div>
          <div className={`input-group ${inputValue.link ? "hadContent" : ""}`}>
            <input
              name="link"
              type="text"
              value={inputValue.link}
              onChange={(e) => validateInput(e)}
            />
            <span>Enlace</span>
          </div>
          <Botones
            onClick={() => {
              const input = document.querySelector('input[name="link"]');
              if (input && input.value) {
                input.select();
                input.setSelectionRange(0, 99999); // Para móviles
                const exito = document.execCommand("copy");
                if (exito) {
                  Swal.fire({
                    title: "Éxito",
                    text: "Enlace copiado al portapapeles",
                    icon: "success",
                  });
                } else {
                  Swal.fire({
                    title: "Error",
                    text: "No se pudo copiar el enlace",
                    icon: "error",
                  });
                }
              } else {
                Swal.fire({
                  title: "Error",
                  text: "No hay enlace para copiar",
                  icon: "error",
                });
              }
            }}
            id="copiarShort"
            name="Copiar"
            icon="bx bx-link"
          />
        </div>
        <div className="shortButtons">
          <Botones
            onClick={() => {
              console.log("Cancelar");
            }}
            id="cancelarShort"
            name="Cancelar"
          />
          <Botones
            onClick={() => {
              generateLink();
            }}
            id="generarShort"
            name="Generar"
            icon="bx bx-link"
          />
        </div>
      </div>
    </div>
  );
}
