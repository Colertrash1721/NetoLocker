// hooks/useUsers.tsx
'use client'
import React, { useState, useEffect } from 'react';
import {
  getAllCompanies,
  getAllAdmins,
  getActiveUsers,
} from '@/services/dashboard/read/fetchUsers';

export default function useUsers() {
  const [companies, setCompanies] = useState<number | null>(null);
  const [admins, setAdmins] = useState<number | null>(null);
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesCount, adminsCount, active] = await Promise.all([
          getAllCompanies(),
          getAllAdmins(),
          getActiveUsers(),
        ]);
        console.log(companiesCount, adminsCount, activeUsers);
        
        setCompanies(companiesCount);
        setAdmins(adminsCount);
        setActiveUsers(active);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    companies,
    admins,
    activeUsers,
    loading,
    error,
  };
}
