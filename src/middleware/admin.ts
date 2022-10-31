import { MiddlewareDataInterface } from '@/router';

export default function admin({ next, store }: MiddlewareDataInterface): void {
  if (store.getters['auth/isAdmin']) next();
  else next({ name: 'notFound' });
}
