import axios from "axios";

export const getToken = async (token) =>{
    const response = await axios.get(`${process.env.REACT_APP_MY_BACKEND_API}/short-link/decodeShortLink/${token}`);

    return response.data;
}