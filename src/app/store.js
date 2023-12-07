import { configureStore } from '@reduxjs/toolkit';

import videoReducer from '~/features/videoFeature';
import settingReducer from '~/features/settingPlayFeature';

export const store = configureStore({
    reducer: {
        videoDetail: videoReducer,
        setting: settingReducer,
    },
});
