import React from 'react'
import {useState} from 'react';
import { addSeals } from '@/types/addContainer'; 

export default function useSealsValues() {
    const [sealsValues, setSealsValues] = useState<addSeals>({
        port: '',
        destination: '',
        bl: ''
    });

    const handleSealsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSealsValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    }

  return {sealsValues, handleSealsChange}
}
