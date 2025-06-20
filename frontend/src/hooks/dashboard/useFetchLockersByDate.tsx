import { useEffect, useState } from 'react';
import { fetchContainersByDate, fetchFreeloadsByDate } from '@/services/dashboard/read/fetchbyDate';

export type LockerType = 'contenedor' | 'freeload';

export const useFetchLockersByDate = (type: LockerType) => {
  const [data, setData] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchByDate = async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const format = (d: Date) => d.toISOString().split("T")[0];
      const dates = [format(today), format(yesterday)];

      const fetchFunc = type === "contenedor" ? fetchContainersByDate : fetchFreeloadsByDate;

      const results = await Promise.all(dates.map(date => fetchFunc(date)));
      setData(results.flat());
    };

    fetchByDate();
  }, [type, isMounted]);

  return data;
};
