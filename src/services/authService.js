import { get, post } from '~/utils/axios-custom';

const authLogin = async (payload) => {
    const response = await post('/auth/login', payload);
    return response;
};
const authLogout = async () => {
    const response = await post('/auth/logout');
    return response;
};
const getAuth = async () => {
    const response = await get('/auth/me');
    return response.data;
};

export { authLogin, getAuth, authLogout };
