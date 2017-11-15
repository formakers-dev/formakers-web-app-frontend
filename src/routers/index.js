import Vue from 'vue';
import Router from 'vue-router';
import RegisterProject from '../components/RegisterProject';
import RegisterInterview from '../components/RegisterInterview';
import Login from '../components/Login';
import MyPage from '../components/MyPage';
import { requireAuth } from '../utils/auth';

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
      beforeEnter: requireAuth,
      component: MyPage,
    },
    {
      path: '/register_project',
      name: 'RegisterProject',
      beforeEnter: requireAuth,
      component: RegisterProject,
    },
    {
      path: '/register_interview/:projectId',
      name: 'RegisterInterview',
      beforeEnter: requireAuth,
      component: RegisterInterview,
      props: true,
    },
  ],
});
