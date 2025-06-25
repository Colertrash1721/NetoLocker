import React from "react";

export default function QrModal({ qrData, onClose }) {
  if (!qrData) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
          aria-label="Cerrar"
        >
          ✖
        </button>
        <h3 style={{ marginBottom: "1rem" }}>
          Escanea este código con Microsoft Authenticator
        </h3>
        <img
          src={qrData}
          alt="QR Code"
          style={{ width: "250px", height: "250px" }}
        />
      </div>
    </div>
  );
}
