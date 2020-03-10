import Home from '../components/Home';
import About from '../components/About';
import Setting from '../components/Setting';

const routes = [
  {
    path: '/',
    name: '阅读',
    component: Home,
  },
  {
    path: '/setting',
    name: '设置',
    component: Setting,
  },
  {
    path: '/about',
    name: '关于',
    component: About,
  },
];

export default routes;
