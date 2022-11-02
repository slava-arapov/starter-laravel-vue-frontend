import router, { MiddlewareDataInterface } from '@/router';

export default function auth({ to, next, store }: MiddlewareDataInterface): void {
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } };

  if (store.getters['auth/authUser']) {
    next();
  } else {
    store.dispatch('auth/getAuthUser').then(() => {
      if (!store.getters['auth/authUser']) router.push(loginQuery);
      else { next(); }
    });
  }
}
