import axios from "axios";

export const addOwner = async (deviceName, usernameToRegister) => {
  const user = localStorage.getItem("username");
  const response = await axios.post(
    `${process.env.REACT_APP_MY_BACKEND_API}/device/owner`,
    {
      deviceName: deviceName,
      owner: usernameToRegister,
      user
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
