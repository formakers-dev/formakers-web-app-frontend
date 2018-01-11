import Vue from 'vue';
import Router from 'vue-router';
import RegisterProject from '../components/RegisterProject';
import UpdateProject from '../components/UpdateProject';
import UpdateInterview from '../components/UpdateInterview';
import RegisterInterview from '../components/RegisterInterview';
import CompleteProjectRegistration from '../components/CompleteProjectRegistration';
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
    {
      path: '/update_project/:projectId',
      name: 'UpdateProject',
      beforeEnter: requireAuth,
      component: UpdateProject,
      props: true,
    },
    {
      path: '/update_interview/:projectId/:interviewSeq',
      name: 'UpdateInterview',
      beforeEnter: requireAuth,
      component: UpdateInterview,
      props: true,
    },
    {
      path: '/complete_project_registration',
      name: 'CompleteProjectRegistration',
      beforeEnter: requireAuth,
      component: CompleteProjectRegistration,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
