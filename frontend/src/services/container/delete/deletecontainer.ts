import axios from "axios";

export const deleteContainer = async (id: number) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/container/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
