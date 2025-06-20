import axios from "axios";

export const updateFreeloadDeviceName = async (id: number, deviceName: string, row: any) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/freeload/device/${id}`,
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

export const updateStateFreeload = async(id:number, state: string) => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/update/freeload/${id}`,
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

export const updateCancelFreeloadState = async(id: number) => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/cancel/state/freeload/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )
  return response.data;
}