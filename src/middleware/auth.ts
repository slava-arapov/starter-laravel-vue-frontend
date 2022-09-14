import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';
import { StoreState } from '@/store';

export interface AuthInterface {
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: Store<StoreState | AuthState | UserState | Record<string, never>>
}

export default function auth({ to, next, store }: AuthInterface): void {
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } };

  if (!store.getters['auth/authUser']) {
    store.dispatch('auth/getAuthUser').then(() => {
      if (!store.getters['auth/authUser']) next(loginQuery);
      else next();
    });
  } else {
    next();
  }
}
