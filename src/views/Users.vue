<template>
  <div class="p-5">
    <v-row
      justify="space-between"
      class="mb-2"
    >
      <div>
        <transition name="fade">
          <FlashMessage
            v-if="error || message"
            key="error"
            :message="message"
            :error="error"
          />
        </transition>
      </div>
      <UserFormDialog
        action="create"
        @userCreated="getUsers(route); showMessage('User created')"
      />
    </v-row>
    <transition
      name="fade"
      mode="out-in"
    >
      <FlashMessage
        v-if="loading && (!users || !users.length)"
        key="loading"
        message="loading..."
      />
      <v-table
        class="mb-2"
        v-else
      >
        <thead>
          <tr>
            <th class="text-left">
              User
            </th>
            <th class="text-left">
              Email
            </th>
            <th class="text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td>
              <v-avatar
                class="ma-3 d-sm-and-up-none"
                size="32"
              >
                <v-img
                  v-if="user.avatar"
                  :alt="user.name + ' avatar'"
                  :src="apiUrl+user.avatar"
                  aspect-ratio="1"
                  class="shrink grey lighten-2 rounded-circle"
                  cover
                  max-height="32"
                  max-width="32"
                />
                <v-icon
                  v-else
                  :icon="mdiIcons.mdiAccountCircle"
                  size="32"
                />
              </v-avatar> {{ user.name }}
            </td>
            <td>
              <v-icon
                :icon="mdiIcons.mdiEmail"
                :color="user.email_verified_at ? 'teal darken-2' : 'secondary'"
              />
              {{ user.email }}
            </td>
            <td>
              <UserFormDialog
                action="update"
                :user="user"
                button-size="small"
                @userUpdated="getUsers(route); showMessage('User updated')"
              />
              <v-btn
                color="red"
                size="small"
                @click="deleteUser(user.id)"
              >
                Delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </transition>
    <transition name="fade">
      <BasePagination
        v-if="meta && meta.last_page > 1"
        v-model="meta.current_page"
        path="users"
        :links="links"
        :meta="meta"
        action="user/paginateUsers"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import FlashMessage from '@/components/FlashMessage.vue';
import BasePagination from '@/components/BasePagination.vue';
import { RouteLocationNormalized, useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import type { Ref } from 'vue';
import { mdiAccountCircle, mdiEmail } from '@mdi/js';
import { Meta } from '@/interfaces/Meta';
import { User } from '@/interfaces/User';
import UserFormDialog from '@/components/UserFormDialog.vue';

const store = useStore();
const route = useRoute();

const mdiIcons = {
  mdiAccountCircle,
  mdiEmail
};

const apiUrl: Ref<string | null> = import.meta.env.VITE_APP_API_URL;

const loading = computed(() => store.getters['user/loading']);
const error = computed(() => store.getters['user/error']);
const message = computed(() => store.getters['user/message']);
const users = computed((): User[] | null => store.getters['user/users']);
const meta = computed((): Meta | null => store.getters['user/meta']);
const links = computed(() => store.getters['user/links']);

function getUsers(route: RouteLocationNormalized) {
  const currentPage = (typeof route.query.page === 'string') ? route.query.page : '1';

  store.commit('SET_LOADING', true);
  store.dispatch('user/getUsers', parseInt(currentPage)).then(() => {
    route.params.page = currentPage;
    store.commit('SET_LOADING', false);
  });
}

watch(() => route, (to) => {
  getUsers(to);
}, { flush: 'pre', immediate: true, deep: true });

function deleteUser(id: number) {
  console.log(id);
  console.log(route.query);

  store.dispatch('user/deleteUser', id)
    .then(() => getUsers(route));
}

function showMessage(text: string, ms = 3000) {
  store.commit('user/SET_MESSAGE', text);
  setTimeout(() => store.commit('user/SET_MESSAGE', null), ms);
}

</script>
