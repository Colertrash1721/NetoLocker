// services/traccar/fetchPositions.ts
import axios from "axios";

export type PositionType = {
  id: number;
  deviceId: number;
  latitude: number;
  longitude: number;
  deviceTime: string;
};

export const fetchTraccarPositions = async (): Promise<PositionType[]> => {
  const token = process.env.NEXT_PUBLIC_MY_TOKEN_PASSWORD;
  const baseUrl = process.env.NEXT_PUBLIC_MY_API_URL;

  const resp = await axios.get(`${baseUrl}/positions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};
