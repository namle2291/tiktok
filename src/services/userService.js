const { get } = require('~/utils/axios-custom');

const getUserInfo = async (nickname) => {
    const response = await get(`/users/@${nickname}`);
    return response.data;
};

const getUserSuggested = async (page = 1, per_page = 5) => {
    const response = await get(`/users/suggested?page=${page}&per_page=${per_page}`);
    return response.data;
};

export { getUserInfo, getUserSuggested };
