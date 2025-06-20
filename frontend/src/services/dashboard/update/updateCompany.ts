import axios from "axios";

export const updateCompany = async (username: string, row: any) => {
    console.log(row);
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/auth/company/${username}`, 
      {row: row},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    
    return response.data;
};
