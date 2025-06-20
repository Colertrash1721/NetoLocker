import axios from "axios";

export async function updateContainer(id: number, data: any) {
  return await axios.put(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/container/${id}`, data);
}