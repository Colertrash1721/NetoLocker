import axios from "axios";

export const updateContainerDeviceName = async (id: number, deviceName: string, row: any) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/container/device/${id}`,
    { deviceName, row },
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

export const updateCancelContainerState = async(id: number) => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/cancel/state/container/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )
  return response.data;
}