import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { store } from '@/store/index.ts';
import auth, { AuthInterface } from '@/middleware/auth';
import admin, { AdminInterface } from '@/middleware/admin';
import guest, { GuestInterface } from '@/middleware/guest';
import middlewarePipeline from '@/router/middlewarePipeline';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { middleware: [auth] },
    component: () =>
      import('../views/Dashboard.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { middleware: [auth] },
    component: () => import('../views/User.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: { middleware: [auth, admin] },
    component: () => import('../views/Users.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isAdmin']) next();
      else next(false);
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () =>
      import('../views/Register.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () =>
      import('../views/ResetPassword.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () =>
      import('../views/ForgotPassword.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    meta: { layout: 'default-centered' },
    component: () =>
      import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta?.middleware;
  const context = { to, from, next, store };

  store.commit('SET_ROUTE', to.matched[0].name);

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    middleware?: Array<(data: AdminInterface | GuestInterface | AuthInterface) => void>
  }
}
