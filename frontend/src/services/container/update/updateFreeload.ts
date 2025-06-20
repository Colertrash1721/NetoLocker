import axios from "axios";

export async function updateFreeload(id: number, data: any) {
  return await axios.put(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/freeload/${id}`, data);
}
