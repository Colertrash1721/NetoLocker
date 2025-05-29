import React from "react";
import { LoginFail, LoginSucess } from "./alerts";
import { useLogin } from "../hooks/useLogin";

export function Login() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    errorMessage,
    success,
  } = useLogin();

  return (
    <div className="login">
      {errorMessage && <LoginFail descripcion={errorMessage} />}
      {success && <LoginSucess descripcion={success} />}

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
    </div>
  );
}
