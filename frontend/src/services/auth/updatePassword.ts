import axios from 'axios';

export const updatePassword = async (username: string, oldPassword: string, newPassword: string) => {
    const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_API}/auth/update/password/${username}`,
        {
            oldPassword,
            newPassword,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
    );
    return response.data;

}