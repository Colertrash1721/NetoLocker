import axios from 'axios';

export type Position = {
  id: number;
  deviceId: number;
  latitude: number;
  longitude: number;
  deviceTime: string;
};

export const fetchDevicePositionByName = async (deviceName: string): Promise<Position | null> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/track/${deviceName}`);
  return response.data;
};
