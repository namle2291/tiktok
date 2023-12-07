const { createSlice } = require('@reduxjs/toolkit');

const initialState = JSON.parse(localStorage.getItem('setting')) || {
    playing: false,
    volume: 0,
};

const setting = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setPlaying: (state, action) => {
            state.playing = action.payload;
            localStorage.setItem('setting', JSON.stringify(state));
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            localStorage.setItem('setting', JSON.stringify(state));
        },
    },
});

export const { setPlaying, setVolume } = setting.actions;

export default setting.reducer;
