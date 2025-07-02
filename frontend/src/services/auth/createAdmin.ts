import axios from 'axios'

export const createAdminService = async(data: any) => {
    const response = await axios.post(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/auth/create/admin`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
    console.log(response.data);
    return response.data
}