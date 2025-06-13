import axios from "axios";

export const container = async (formValue: any, username: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/create/container`,
    {
      CreateContainerDto: formValue,
      companyName: username
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  return response.data;
};
