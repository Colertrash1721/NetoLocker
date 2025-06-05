'use client'
import React from "react";
import { useState, useEffect } from "react";
import { Filter } from "@/types/filter";

export default function useLogicFilter() {
  // This hook is intended to manage the logic for filtering items in a list.
    const [filter, setFilter] = useState<Filter>({
        ticket: "",
        client: "",
        port: "",
        destination: "",
        state: "",
        date: "",
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };
    // Optionally, you can add a useEffect to handle side effects when the filter changes
    useEffect(() => {
        // This could be used to fetch filtered data or perform other actions
        console.log("Filter changed:", filter);
    }, [filter]);

  return {filter, handleFilterChange};
}
