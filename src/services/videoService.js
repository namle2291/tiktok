const { get, post } = require('~/utils/axios-custom');

const createVideo = async (payload) => {
    const response = await post('/videos', payload);
    return response;
};

export { createVideo };
