import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Store } from 'vuex';
import { AuthState } from '@/store/modules/Auth';
import { UserState } from '@/store/modules/User';
import { AdminInterface } from '@/middleware/admin';
import { GuestInterface } from '@/middleware/guest';
import { AuthInterface } from '@/middleware/auth';
import { StoreState } from '@/store';

declare interface Context {
  to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, store: Store<StoreState | AuthState | UserState | Record<string, never>>
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
