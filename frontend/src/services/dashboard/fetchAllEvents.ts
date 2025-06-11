import axios from 'axios';

const endpoint = `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/events`

export const getEvents = async () =>{
    const events = await axios.get(`${endpoint}`)
    console.log(events.data);
    return events.data
}