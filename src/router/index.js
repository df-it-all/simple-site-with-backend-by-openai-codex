import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import WelcomePage from '../pages/WelcomePage.vue';
import AboutPage from '../pages/AboutPage.vue';

const base = import.meta.env.VITE_CONTEXT_PATH || import.meta.env.CONTEXT_PATH || '/';

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    { path: '/', name: 'login', component: LoginPage },
    { path: '/welcome', name: 'welcome', component: WelcomePage, meta: { requiresAuth: true } },
    { path: '/about', name: 'about', component: AboutPage }
  ]
});

router.beforeEach((to) => {
  const token = window.localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !token) {
    return { name: 'login' };
  }
  return true;
});

export default router;
