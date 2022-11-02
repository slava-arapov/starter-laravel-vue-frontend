import { describe, expect, test, vi } from 'vitest';
import { MiddlewareDataInterface } from '@/router/index';
import middlewarePipeline, { Context } from '@/router/middlewarePipeline';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { createStore } from 'vuex';
import { StoreState } from '@/store';

describe('middlewarePipeline', () => {
  const to: RouteLocationNormalized = {
    fullPath: '/to',
    hash: '',
    matched: [],
    meta: {},
    redirectedFrom: undefined,
    path: '/to',
    query: {},
    name: 'to',
    params: {}
  };

  const from: RouteLocationNormalized = {
    fullPath: '/from',
    hash: '',
    matched: [],
    meta: {},
    redirectedFrom: undefined,
    path: '/from',
    query: {},
    name: 'from',
    params: {}
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const next: NavigationGuardNext = vi.fn(() => { });

  const store = createStore<StoreState>({
    state: {
      route: null
    } as StoreState
  });

  const context: Context = { to, from, next, store };

  let lastMiddlewareExecuted = '';

  function okMiddleware1({ next }: MiddlewareDataInterface): void {
    lastMiddlewareExecuted = 'okMiddleware1';
    next();
  }

  function okMiddleware2({ next }: MiddlewareDataInterface): void {
    lastMiddlewareExecuted = 'okMiddleware2';
    next();
  }

  function redirectMiddleware(): void {
    lastMiddlewareExecuted = 'redirectMiddleware';
  }

  beforeEach(() => {
    vi.resetAllMocks();
    lastMiddlewareExecuted = '';
  });

  test('next() is called if no middleware passed', () => {
    middlewarePipeline(context, [], 0)();

    expect(next).toHaveBeenCalled();
  });

  test('next() is called if all middleware executed successfully', () => {
    middlewarePipeline(context, [okMiddleware1, okMiddleware2], 0)();

    expect(lastMiddlewareExecuted).toBe('okMiddleware2');
    expect(next).toHaveBeenCalled();
  });

  test('Middleware without next() call stops the pipeline execution', () => {
    middlewarePipeline(context, [okMiddleware1, redirectMiddleware, okMiddleware2], 0)();

    expect(lastMiddlewareExecuted).toBe('redirectMiddleware');
    expect(next).not.toHaveBeenCalled();
  });
});
