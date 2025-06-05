'use client'
import React from 'react'
import {useState} from 'react';
import { addCompany } from '@/types/addUsers';
import { createCompanyService } from '@/services/auth/createCompany';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function useCompanyFormValues() {
    const [containerValues, setContainerValues] = useState<addCompany>({
        companyName: '',
        email: '',
        contactPerson: '',
        password: '',
        phone: ''
    });
    const handleContainerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContainerValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    }
    const handleCompanySubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const createAdminResponse = await createCompanyService(containerValues);
      console.log(createAdminResponse);
      Swal.fire({
        title: "Success",
        text: "Empresa añadida correctamente",
        icon: "success"
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        Swal.fire({
                title: "Error",
                text: error.response?.data.message,
                icon: "error"
            })
      } else {
        console.log("Error desconocido:", error);
      }
    }
  };
  return {containerValues, handleCompanySubmit, handleContainerChange}
}
