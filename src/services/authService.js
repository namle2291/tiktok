import { get, post } from '~/utils/axios-custom';

const authLogin = async (payload, action = 'login') => {
    if (action === 'register') payload.type = 'email';
    const response = await post(`/auth/${action}`, payload);
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
