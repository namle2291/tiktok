import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

httpRequest.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response.data;
};

export { get, post, httpRequest };
