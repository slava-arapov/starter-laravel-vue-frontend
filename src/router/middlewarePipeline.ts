import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Store } from 'vuex';
import { StoreState } from '@/store';
import { MiddlewareDataInterface } from '@/router/index';

export interface Context {
  to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, store: Store<StoreState>
}

export default function middlewarePipeline(context: Context, middleware: Array<(data: MiddlewareDataInterface) => void>, index: number): NavigationGuardNext {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1
    );

    nextMiddleware({
      ...context,
      next: nextPipeline
    });
  };
}
