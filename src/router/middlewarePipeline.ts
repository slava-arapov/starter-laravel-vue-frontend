import { NavigationGuardNext, Route } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';
import { AdminInterface } from '@/middleware/admin';
import { GuestInterface } from '@/middleware/guest';
import { AuthInterface } from '@/middleware/auth';

declare interface Context {
  to: Route, from: Route, next: NavigationGuardNext, store: Store<AuthState | UserState | Record<string, never>>
}

export default function middlewarePipeline(context: Context, middleware: Array<(data: AdminInterface | GuestInterface | AuthInterface) => void>, index: number): NavigationGuardNext /* | Promise<Context> */ {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) {
    return context.next;
  }
  return () => {
    nextMiddleware({
      ...context,
      next: middlewarePipeline(context, middleware, index + 1)
    });
  };
}
