<template>
  <div>
    <transition-group name="fade">
      <p v-if="message" class="ma-0 mt-2 text-sm success--text" key="message">
        {{ message }}
      </p>
      <p
        v-if="error && getType(error) === 'string'"
        key="error"
        class="mt-2 text-sm text-red-500"
      >
        {{ error }}
      </p>
      <ul
        v-if="getType(error) === 'object'"
        class="mt-2 text-sm text-red-500"
        key="error-list"
      >
        <li v-for="key in errorKeys" :key="key">
          <b class="font-bold capitalize">{{ key | titleCase }}</b>
          <ul class="ml-2">
            <li v-for="(item, index) in getErrors(key)" :key="`${index}-error`">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // name: 'FlashMessage',
  props: {
    message: {
      type: String,
      default: null
    },
    error: {
      type: [Object, String, Error],
      default: null
    }
  },
  computed: {
    errorKeys() {
      if (!this.error || this.getType(this.error) === 'string') {
        return null;
      }
      return Object.keys(this.error);
    }
  },
  methods: {
    getErrors (key: string | number) {
      if (this.error && this.getType(this.error) === 'object') {
        return (this.error as Record<string | number, string>)[key];
      }
      return null;
    },
    // eslint-disable-next-line
    getType(obj: any) {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
  },
  filters: {
    titleCase(value: string) {
      return value.replace('_', ' ');
    }
  }
});
</script>
