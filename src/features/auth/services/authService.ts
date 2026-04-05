import axiosInstance from '../../../api/axiosInstance';

export const authService = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
};
