import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store/index';
import auth from '@/middleware/auth';
import admin from '@/middleware/admin';
import guest from '@/middleware/guest';
import middlewarePipeline from '@/router/middlewarePipeline';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { middleware: [auth] },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { middleware: [auth] },
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: { middleware: [auth, admin] },
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isAdmin']) next();
      else next(false);
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () =>
      import(/* webpackChunkName: "reset-password" */ '../views/ResetPassword.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    meta: { layout: 'default-centered', middleware: [guest] },
    component: () =>
      import(/* webpackChunkName: "forgot-password" */ '../views/ForgotPassword.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    meta: { layout: 'default-centered' },
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta?.middleware;
  const context = { to, from, next, store };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
