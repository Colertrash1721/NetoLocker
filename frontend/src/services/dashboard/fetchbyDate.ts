// services/lockerService.ts
import axios from 'axios';

const endpoint = `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers`;


export const fetchContainersByDate = async (date: string) => {
  const res = await axios.get(`${endpoint}/container/search-by-date?date=${date}`);
  return res.data || [];
};

export const fetchFreeloadsByDate = async (date: string) => {
  const res = await axios.get(`${endpoint}/freeload/search-by-date?date=${date}`);
  return res.data || [];
};
