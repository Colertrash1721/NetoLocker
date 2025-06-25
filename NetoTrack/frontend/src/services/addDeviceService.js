import Swal from "sweetalert2";

export const createDevice = async (deviceData) => {
  const username = localStorage.getItem("username");
  try {
    const response = await fetch(`${process.env.REACT_APP_MY_BACKEND_API}/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({deviceData, username}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    Swal.fire({
      text: "Dispositivo agregado",
      icon: "success"
    });
    return result;
  } catch (error) {
    Swal.fire({
      text: `Error al agregar el dispositivo: ${error.message}`,
      icon: "error"
    });
    throw error;
  }
};