import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { store, StoreState } from '@/store';
import auth from '@/middleware/auth';
import admin from '@/middleware/admin';
import guest from '@/middleware/guest';
import middlewarePipeline from '@/router/middlewarePipeline';
import { Store } from 'vuex';

export interface MiddlewareDataInterface {
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: Store<StoreState>
}

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
    component: () => import('../views/Users.vue')
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
    path: '/:pathMatch(.*)*',
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
  store.commit('SET_LOADING', true);

  if (middleware) {
    next = middlewarePipeline(context, middleware, 0);
  }

  return next();
});

router.afterEach((to, from) => {
  store.commit('SET_LOADING', false);
});

export default router;

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    middleware?: Array<(data: MiddlewareDataInterface) => void>
  }
}
