import Vue from 'vue';
import Router from 'vue-router';
import RegisterProject from '../components/RegisterProject';
import Login from '../components/Login';
import MyPage from '../components/MyPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/my_page',
      name: 'MyPage',
      component: MyPage,
    },
    {
      path: '/register_project',
      name: 'RegisterProject',
      component: RegisterProject,
    },
  ],
});
