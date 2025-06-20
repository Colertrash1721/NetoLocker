import axios from "axios";

export const fetchAllContainers = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/container`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  console.log(response.data);
  return response.data;
};
