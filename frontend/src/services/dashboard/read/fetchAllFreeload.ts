import axios from "axios";

export const fetchAllFreeloads = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/freeload`,
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
