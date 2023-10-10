import Home from '~/pages/Home/Home';
import Following from '~/pages/Following/Following';
import Profile from '~/pages/Profile/Profile';
import Upload from '~/pages/Profile/Profile';
import Search from '~/pages/Search/Search';

import HeaderOnly from '~/components/Layout/HeaderOnly/HeaderOnly';
import DefaultLayout from '~/components/Layout/DefaultLayout/DefaultLayout';
import Login from '~/pages/Login/Login';
import NotFound from '~/pages/NotFound/NotFound';
import Logout from '~/pages/Logout/Logout';

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
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: '/search',
        component: Search,
        layout: null,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/logout',
        component: Logout,
        layout: HeaderOnly,
    },
    {
        path: '*',
        component: NotFound,
        layout: null,
    },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
