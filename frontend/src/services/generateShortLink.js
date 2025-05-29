import axios from "axios";

export const generateShortLink = async (inputValue) => {
  const response = await axios.post(
    `${process.env.REACT_APP_MY_BACKEND_API}/short-link/generateShortLink`,
    {
      deviceName: inputValue.deviceName,
      expirationTime: inputValue.expirationDate,
      companyName: inputValue.companyName,
      username: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response.data;
};
