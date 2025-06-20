import { useState } from "react"

export const useDropdown = () => {
    const [showOptions, setshowOptions] = useState(false)
    const handleShowOptions = ()=>{
        setshowOptions(!showOptions)
        
    }

    return {showOptions, handleShowOptions}
}