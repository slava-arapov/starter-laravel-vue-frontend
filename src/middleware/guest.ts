import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';
import { StoreState } from '@/store';

export interface GuestInterface {
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: Store<StoreState | AuthState | UserState | Record<string, never>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function guest({ to, next, store }: GuestInterface): void {
  const storageItem = window.localStorage.getItem('guest');
  if (storageItem === 'isNotGuest' && !store.getters['auth/authUser']) {
    store.dispatch('auth/getAuthUser').then(() => {
      if (store.getters['auth/authUser']) {
        next({ name: 'dashboard' });
      } else {
        store.dispatch('auth/setGuest', { value: 'isGuest' }).then(() => { next(); });
      }
    });
  } else {
    next();
  }
}
