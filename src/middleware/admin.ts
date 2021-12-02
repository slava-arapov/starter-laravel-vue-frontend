import { NavigationGuardNext } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';

export interface AdminInterface {
  next: NavigationGuardNext,
  store: Store<AuthState | UserState | Record<string, never>>
}

export default function admin({ next, store }: AdminInterface): void {
  if (store.getters['auth/isAdmin']) next();
  else next({ name: 'notFound' });
}
