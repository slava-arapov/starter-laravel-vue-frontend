<template>
  <div v-if="message || error">
    <transition-group name="fade">
      <p
        v-if="message"
        key="message"
        class="ma-0 mt-2 text-sm success--text"
      >
        {{ message }}
      </p>
      <p
        v-if="error && getType(error) === 'string'"
        key="error"
        class="mt-2 text-sm text-red-500"
      >
        {{ error }}
      </p>
      <div
        v-if="getType(error) === 'object'"
        class="mt-4"
      >
        <v-alert
          v-for="key in errorKeys"
          :key="key"
          type="error"
          variant="outlined"
          density="compact"
        >
          <strong>{{ capitalize(key) }}</strong>
          <div
            v-for="(item, index) in getErrors(key)"
            :key="`${index}-error`"
          >
            {{ item }}
          </div>
        </v-alert>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// Currently type imports from other files are not supported: https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
// import { ErrorDictionary } from '@/interfaces/ErrorDictionary';

interface ErrorDictionary {
  [index: string]: string[];
}

interface Props {
  message?: string | null,
  error?: ErrorDictionary | string | null
}

const props = defineProps<Props>();

// eslint-disable-next-line
function getType(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function getErrors (key: string | number) {
  if (props.error && getType(props.error) === 'object') {
    return (props.error as ErrorDictionary)[key];
  }
  return null;
}

const errorKeys = computed(() => {
  if (!props.error || getType(props.error) === 'string') {
    return null;
  }
  return Object.keys(props.error);
});

function capitalize(value: string) {
  return value.replace('_', ' ').split(' ').map(value => value[0].toUpperCase() + value.substring(1)).join(' ');
}

</script>
