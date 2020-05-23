/**
 * @todo
 * 1. 动态解析 pages 下文件
 * 2. 动态加载组件
 * 3. 加载loading
 * 4. 路由守卫, 切换路由动画
 */

import Login from './pages/Login';
import SelectRegion from './pages/SelectRegion';
import NotFound from './pages/NotFound';
import MonacoEditor from './components/Monaco';
import Welcome from './pages/Welcome';
import EventListener from './pages/EventListener/EventHook';

const routes = [
  {
    path: '/',
    component: Welcome,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/editor',
    component: MonacoEditor,
  },
  {
    path: '/region',
    component: SelectRegion,
  },
  // {
  //   path: '/event',
  //   component: EventListener,
  // },
  {
    component: NotFound,
  },
];

export default routes;
