import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Profile';
import HeaderOnly from '~/components/Layout/HeaderOnly';
import Search from '~/pages/Search';
import DefaultLayout from '~/components/Layout/DefaultLayout';

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
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
