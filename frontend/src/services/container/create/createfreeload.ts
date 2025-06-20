import axios from "axios";

export const freeload = async (formValue: any, username: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/create/freeload`,
    { CreateFrealoadDto: formValue,
      companyName: username },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }
  );
  return response.data
};
