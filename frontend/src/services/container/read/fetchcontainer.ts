import axios from "axios";

export const getContainersByCompany = async (username: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/containers/company/${username}`,
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
