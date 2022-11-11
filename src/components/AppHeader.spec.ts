import matchers from '@testing-library/jest-dom';
import AppHeader from './AppHeader.vue';
import { describe, expect, test, vi } from 'vitest';
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

  test('Hides dashboard, users, user menu, settings, logout buttons for guest', async () => {
    const store = createStore<StoreState>({
      state: {
        route: null
      } as StoreState,
      getters: {
        'auth/authUser': () => undefined,
        'auth/isAdmin': () => false
      }
    });

    const { queryByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    expect(queryByTestId('dashboard-button')).not.toBeInTheDocument();
    expect(queryByTestId('users-button')).not.toBeInTheDocument();
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
  
  test('Displays users button for admin', async () => {
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
          isAdmin: true,
          avatar: null
        }),
        'auth/isAdmin': () => true
      }
    });

    const { getByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    expect(getByTestId('users-button')).toBeInTheDocument();
  });

  test('Hides users button for not admins', async () => {
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
        }),
        'auth/isAdmin': () => false
      }
    });

    const { queryByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    expect(queryByTestId('users-button')).not.toBeInTheDocument();
  });
  
  test('Displays avatar for authorized user', async () => {
    const avatarPath = '/path/to/avatar.jpg';
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
          avatar: avatarPath
        }),
        'auth/isAdmin': () => false
      }
    });

    const { getByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    const userAvatarElem = getByTestId('user-avatar');

    const imgElem = userAvatarElem.querySelector('img');

    const imgSrc = process.env['VITE_APP_API_URL'] + avatarPath;

    expect(getByTestId('user-avatar')).toBeInTheDocument();
    expect(imgElem?.src).toBe(imgSrc);
  });

  test('Hides avatar for user without avatar', async () => {
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
        }),
        'auth/isAdmin': () => false
      }
    });

    const { queryByTestId } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    expect(queryByTestId('user-avatar')).not.toBeInTheDocument();
  });
  
  test('Displays authorized user name', async () => {
    const userName = 'John Doe';

    const store = createStore<StoreState>({
      state: {
        route: null
      } as StoreState,
      getters: {
        'auth/authUser': () => ({
          id: 5,
          name: userName,
          email: 'jd@gmail.com',
          email_verified_at: '123',
          isAdmin: false,
          avatar: null
        }),
        'auth/isAdmin': () => false
      }
    });

    const { getByText } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    expect(getByText(userName)).toBeInTheDocument();
  });
  
  test('Logouts by clicking Logout button', async () => {
    const logout = vi.fn(() => 0);

    const store = createStore<StoreState>({
      state: {
        route: null
      } as StoreState,
      actions: {
        'auth/logout': logout
      },
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

    const { getByTestId, } = render(AppHeaderWrapped, {
      global: {
        plugins: [[store, key], router, vuetify]
      }
    });

    const menuButtonElement = getByTestId('user-menu-button');

    await fireEvent.click(menuButtonElement);

    const logoutButtonElement = getByTestId('logout-button');

    await fireEvent.click(logoutButtonElement);

    expect(logout).toBeCalled();
  });
});

// Elements to test
/*
  + v-if="authUser"
  + v-if="isAdmin"
  + v-if="authUser?.avatar"
  + :src="apiUrl+authUser?.avatar"
  + authUser?.name
  + @click="logout"
 */
