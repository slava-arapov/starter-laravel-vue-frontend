<template>
  <div class="p-5">
    <transition
      name="fade"
      mode="out-in"
    >
      <FlashMessage
        v-if="loading && (!users || !users.length)"
        key="loading"
        message="loading..."
      />
      <v-table v-else>
        <thead>
          <tr>
            <th class="text-left">
              User
            </th>
            <th class="text-left">
              Email
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
                tile
              >
                <v-img
                  v-if="user.avatar"
                  :alt="user.name + ' avatar'"
                  :src="apiUrl+user.avatar"
                  aspect-ratio="1"
                  class="shrink grey lighten-2 rounded-circle"
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
          </tr>
        </tbody>
      </v-table>
    </transition>
    <transition name="fade">
      <FlashMessage
        v-if="error"
        key="error"
        :error="error"
      />
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
import { useStore } from 'vuex';
import FlashMessage from '@/components/FlashMessage.vue';
import BasePagination from '@/components/BasePagination.vue';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import type { Ref } from 'vue';
import { mdiAccountCircle, mdiEmail } from '@mdi/js';
import { Meta } from '@/interfaces/Meta';
import { User } from '@/interfaces/User';

const store = useStore();
const route = useRoute();

const mdiIcons = {
  mdiAccountCircle,
  mdiEmail
};

const apiUrl: Ref<string | null> = import.meta.env.VITE_APP_API_URL;

const loading = computed(() => store.getters['user/loading']);
const error = computed(() => store.getters['user/error']);
const users = computed((): User[] | null => store.getters['user/users']);
const meta = computed((): Meta | null => store.getters['user/meta']);
const links = computed(() => store.getters['user/links']);

watch(() => route, (to) => {
  const currentPage = (typeof to.query.page === 'string') ? to.query.page : '1';

  store.dispatch('user/getUsers', parseInt(currentPage)).then(() => {
    to.params.page = currentPage;
  });
}, { flush: 'pre', immediate: true, deep: true });

</script>
