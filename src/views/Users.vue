<template>
  <div class="p-5">
    <transition name="fade" mode="out-in">
      <FlashMessage
        message="loading..."
        v-if="loading && !users.length"
        key="loading"
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
                    :alt="user.name + ' avatar'"
                    v-if="user.avatar"
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
                  ></v-icon>
                </v-avatar> {{ user.name }}
              </td>
              <td>
                <v-icon
                  :icon="mdiIcons.mdiEmail"
                  :color="user.email_verified_at ? 'teal darken-2' : 'secondary'"
                ></v-icon>
                {{ user.email }}
              </td>
            </tr>
          </tbody>
      </v-table>
    </transition>
    <transition name="fade">
      <FlashMessage :error="error" v-if="error" key="error" />
    </transition>
    <transition name="fade">
      <BasePagination
        path="users"
        v-model="meta"
        :links="links"
        action="user/paginateUsers"
        v-if="meta && meta.last_page > 1"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import FlashMessage from '@/components/FlashMessage.vue';
import BasePagination from '@/components/BasePagination.vue';
import { useRoute } from 'vue-router';
import { computed, defineComponent, watch } from 'vue';
import type { Ref } from 'vue';
import { mdiAccountCircle, mdiEmail } from '@mdi/js';

export default defineComponent({
  components: { FlashMessage, BasePagination },
  name: 'UsersView',
  setup () {
    const store = useStore();
    const route = useRoute();

    const mdiIcons = {
      mdiAccountCircle,
      mdiEmail
    };

    const apiUrl: Ref<string | null> = import.meta.env.VITE_APP_API_URL;

    watch(() => route, (to) => {
      const currentPage = (typeof to.query.page === 'string') ? to.query.page : '1';

      store.dispatch('user/getUsers', parseInt(currentPage)).then(() => {
        to.params.page = currentPage;
      });
    }, { flush: 'pre', immediate: true, deep: true });

    return {
      mdiIcons,
      apiUrl,
      loading: computed(() => store.getters['user/loading']),
      error: computed(() => store.getters['user/error']),
      users: computed(() => store.getters['user/users']),
      meta: computed(() => store.getters['user/meta']),
      links: computed(() => store.getters['user/links'])
    };
  }
});
</script>
