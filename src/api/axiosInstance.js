import axios from 'axios';
import { store } from '../redux/store';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10), // Set timeout from environment variable
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

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timed out:', error);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;