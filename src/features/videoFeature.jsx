const { createSlice } = require('@reduxjs/toolkit');

const initialState = JSON.parse(localStorage.getItem('videoCurrent')) || {
    infoVideoCurrent: {},
};

const videoSlice = createSlice({
    name: 'videoDetail',
    initialState,
    reducers: {
        setVideoDetail: (state, action) => {
            state.infoVideoCurrent = action.payload;
            localStorage.setItem('videoCurrent', JSON.stringify(state));
        },
    },
});

export const { setVideoDetail } = videoSlice.actions;

export default videoSlice.reducer;
