import { get } from '~/utils/axios-custom';

const getVideoList = async (type = 'for-you', page = 1) => {
    const response = await get(`/videos?type=${type}&page=${page}`);
    return response.data;
};

export { getVideoList };
