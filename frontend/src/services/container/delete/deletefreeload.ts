import axios from "axios";

export const deleteFreeload = async (id: number) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/freeload/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
