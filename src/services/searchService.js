import { get, httpRequest } from '../utils/axios-custom';

const getUserSearch = async (q, type = 'less') => {
    const reponse = await httpRequest.get(`/users/search?q=${q}&type=${type}`);
    return reponse.data;
};

export { getUserSearch };
