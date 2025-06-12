import axios from 'axios';

export const fetchDevicePositionById = async (id: number): Promise<any | null> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/device/${id}`);
  return response.data;
};
