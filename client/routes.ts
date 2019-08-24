import Login from './pages/Login';
import SelectRegion from './pages/SelectRegion';
import NotFound from './pages/NotFound';

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: SelectRegion,
  },
  // {
  //   path: '/',
  //   component: Welcome,
  //   // routes: [
  //   //   {
  //   //     path: '/region',
  //   //     component: SelectRegion,
  //   //   },
  //   // ],
  // },
  {
    component: NotFound,
  },
];

export default routes;
