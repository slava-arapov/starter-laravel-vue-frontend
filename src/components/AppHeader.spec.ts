import matchers from '@testing-library/jest-dom';
import AppHeader from './AppHeader.vue';
import { describe, expect, test } from 'vitest';
import { fireEvent, render } from '@testing-library/vue';
import { key, StoreState } from '@/store';
import vuetify from '@/plugins/vuetify';
import { createStore } from 'vuex';
import { VApp } from 'vuetify/components';
import router from '@/router';

expect.extend(matchers);

const AppHeaderWrapped = {
  template: `
  <v-app>
    <AppHeader />
  </v-app>
  `,
  components: {
    VApp,
    AppHeader
  }
};

describe('AppHeader', async () => {
  test('Displays dashboard, user menu, settings, logout buttons for authorized user', async () => {
    const store = createStore<StoreState>({
      state: {
        route: null
      } as StoreState,
      getters: {
        'auth/authUser': () => ({
          id: 5,
          name: 'John Doe',
          email: 'jd@gmail.com',
          email_verified_at: '123',
          isAdmin: false,
          avatar: null
        })
      }
    });

    const { getByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    const menuButtonElement = getByTestId('user-menu-button');

    await fireEvent.click(menuButtonElement);

    expect(getByTestId('dashboard-button')).toBeInTheDocument();
    expect(getByTestId('user-menu-button')).toBeInTheDocument();
    expect(getByTestId('settings-button')).toBeInTheDocument();
    expect(getByTestId('logout-button')).toBeInTheDocument();
  });

  test('Hides dashboard, user menu, settings, logout buttons for guest', async () => {
    const store = createStore<StoreState>({
      state: {
        route: null
      } as StoreState,
      getters: {
        'auth/authUser': () => undefined
      }
    });

    const { queryByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    expect(queryByTestId('dashboard-button')).not.toBeInTheDocument();
    expect(queryByTestId('user-menu-button')).not.toBeInTheDocument();
    expect(queryByTestId('settings-button')).not.toBeInTheDocument();
    expect(queryByTestId('logout-button')).not.toBeInTheDocument();
  });

  test('Displays login button for guest', async () => {
    const store = createStore<StoreState>({
      state: {
        route: null
      } as StoreState,
      getters: {
        'auth/authUser': () => undefined
      }
    });

    const { queryByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    expect(queryByTestId('login-button')).toBeInTheDocument();
  });
});

// Elements to test
/*
  + v-if="authUser"
  - v-if="isAdmin"
  - v-if="authUser?.avatar"
  - :alt="authUser?.name + ' avatar'"
  - :src="apiUrl+authUser?.avatar"
  - authUser?.name
  - @click="logout"
  - :icon="mdiIcons.mdiLogout"
 */
