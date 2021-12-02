import { NavigationGuardNext, Route } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';

export interface AuthInterface {
  to: Route,
  next: NavigationGuardNext,
  store: Store<AuthState | UserState | Record<string, never>>
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
