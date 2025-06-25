import React from "react";
import { LoginFail, LoginSucess } from "./alerts";
import { useRegister } from "../hooks/useRegister";

export function Register() {
  const {
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
  } = useRegister();

  return (
    <div className="register">
      {errorMessage && <LoginFail descripcion={errorMessage} />}
      {success && <LoginSucess descripcion={success} />}

      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>{message}</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          <span>Registrarse</span>
        </button>
      </form>
    </div>
  );
}
