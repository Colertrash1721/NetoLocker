// services/traccar/fetchPositions.ts
import axios from "axios";

export const fetchTraccarPositions = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/devices`);
  return response.data;
};
