import { MiddlewareDataInterface } from '@/router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function guest({ to, next, store }: MiddlewareDataInterface): void {
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
