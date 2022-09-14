import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';
import { StoreState } from '@/store';

export interface AdminInterface {
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: Store<StoreState | AuthState | UserState | Record<string, never>>
}

export default function admin({ next, store }: AdminInterface): void {
  if (store.getters['auth/isAdmin']) next();
  else next({ name: 'notFound' });
}
