import axiosInstance from './axiosInstance';
import apiConfig from './apiConfig';

export const login = async (email, password) => {
  const response = await axiosInstance.post(apiConfig.login, { email, password });
  return response.data;
};