import { get } from '../utils/axios-custom';

const getUserSearch = async (q, type = 'less') => {
    const reponse = await get(`/users/search?q=${q}&type=${type}`);
    return reponse.data;
};

export { getUserSearch };
