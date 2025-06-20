import axios from "axios";

export const deleteCompany = async (username: string) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/auth/company/${username}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
