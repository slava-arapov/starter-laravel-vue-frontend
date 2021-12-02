import { NavigationGuardNext } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';

export interface GuestInterface {
  next: NavigationGuardNext,
  store: Store<AuthState | UserState | Record<string, never>>
}

export default function guest({ next, store }: GuestInterface): void {
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
