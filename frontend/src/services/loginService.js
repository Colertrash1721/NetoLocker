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