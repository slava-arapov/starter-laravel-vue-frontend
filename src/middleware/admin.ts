import router, { MiddlewareDataInterface } from '@/router';

export default function admin({ next, store }: MiddlewareDataInterface): void {
  if (store.getters['auth/isAdmin']) next();
  else router.push({ name: 'notFound' });
}
