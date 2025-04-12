import axios from 'axios';
import { store } from '../redux/store';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;