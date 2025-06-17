import { useState } from "react";

export const useHandleOptions = () =>{
    const [option, setoption] = useState("")
    const handleOption = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        const value = e.currentTarget.innerText
        setoption(value.toLowerCase())
        e.preventDefault();
    }
    return {handleOption, option}
}
