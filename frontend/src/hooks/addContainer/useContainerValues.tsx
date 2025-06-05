import React from 'react'
import {useState} from 'react';
import { addContainer } from '@/types/addContainer'

export default function useContainerValues() {
    const [containerValues, setContainerValues] = useState<addContainer>({
        port: '',
        destination: '',
        bl: '',
        ncontainer: ''
    });
    const handleContainerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContainerValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    }
  return {containerValues, handleContainerChange}
}
