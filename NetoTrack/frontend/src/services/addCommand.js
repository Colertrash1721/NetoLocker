import axios from "axios";

export const addCommand = async (deviceName, commandDescription) => {
  const user = localStorage.getItem("username");
  const response = await axios.post(
    `${process.env.REACT_APP_MY_BACKEND_API}/device/assing-command`,
    { deviceName, commandDescription, user },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
