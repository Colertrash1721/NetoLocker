import axios from "axios";

export const updateContainerDeviceName = async (id: number, deviceName: string) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/container/device/${id}`,
    { deviceName },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const updateStateContainer = async(id:number, state: string) => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/update/container/${id}`,
    {state},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )
  return response.data;
}