export const loginUser = async (credentials) => {
  const response = await fetch(
    `${process.env.REACT_APP_MY_BACKEND_API}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: credentials,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return await response.json();
};

export const createQR = async (username) => {
  const response = await fetch(
    `${process.env.REACT_APP_MY_BACKEND_API}/auth/2fa/setup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el QR");
  }

  return await response.json();
}

export const verify2FA = async (username, password, code) => {
  const response = await fetch(
    `${process.env.REACT_APP_MY_BACKEND_API}/auth/2fa/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, code }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al verificar el código 2FA");
  }

  return await response.json();
};