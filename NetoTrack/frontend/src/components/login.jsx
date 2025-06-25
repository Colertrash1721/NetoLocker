import React from "react";
import { LoginFail, LoginSucess } from "./alerts";
import { useLogin } from "../hooks/useLogin";

export function Login() {
  const {
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
  } = useLogin();

  return (
    <div className="login">
      {errorMessage && <LoginFail descripcion={errorMessage} />}
      {success && <LoginSucess descripcion={success} />}

      {!show2FA ? (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="User"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              <span>INICIAR SESIÓN</span>
            </button>
          </form>
        </>
      ) : (
        <div className="qr-section">
          {qrImage && (
            <>
              <h2>Escanea este código con Microsoft Authenticator</h2>
              <img
                src={qrImage}
                alt="QR Code"
                style={{ width: 200, margin: "1em 0" }}
              />
            </>
          )}
          <input
            type="text"
            placeholder="Código 2FA"
            value={code2FA}
            onChange={(e) => setCode2FA(e.target.value)}
            maxLength={6}
          />
          <button onClick={handleVerify2FA}>
            <span>Verificar codigo</span>
          </button>
        </div>
      )}
    </div>
  );
}
