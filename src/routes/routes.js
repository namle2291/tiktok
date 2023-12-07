import Home from '~/pages/Home/Home';
import Following from '~/pages/Following/Following';
import Profile from '~/pages/Profile/Profile';
import Upload from '~/pages/Upload/Upload';
import Search from '~/pages/Search/Search';

import HeaderOnly from '~/components/Layout/HeaderOnly/HeaderOnly';
import DefaultLayout from '~/components/Layout/DefaultLayout/DefaultLayout';
import NotFound from '~/pages/NotFound/NotFound';
import Logout from '~/pages/Logout/Logout';
import Video from '~/pages/Video/Video';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/@:nickname',
        component: Profile,
        layout: DefaultLayout,
    },
    {
        path: '/@:nickname/video/:id',
        component: Video,
        layout: null,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: '/search',
        component: Search,
        layout: DefaultLayout,
    },
    {
        path: '/logout',
        component: Logout,
        layout: HeaderOnly,
    },
    {
        path: '*',
        component: NotFound,
        layout: DefaultLayout,
    },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
