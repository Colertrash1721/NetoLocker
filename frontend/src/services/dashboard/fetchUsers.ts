import axios from 'axios'

const endpoint = `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/auth/count`

export const getAllCompanies = async () =>{
    const companies = await axios.get(`${endpoint}/companies`)
    return companies.data
}

export const getAllAdmins = async () =>{
    const admins = await axios.get(`${endpoint}/admins`)
    return admins.data
}

export const getActiveUsers = async () => {
    const allUsers = await axios.get(`${endpoint}/allActive`)
    return allUsers.data
}

export const getCompaniesByMonth = async () => {
  const response = await axios.get(`${endpoint}/companies-by-month`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  console.log(response.data);
  return response.data;
};