<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="text-sm text-gray-500"
      :class="{ 'sr-only': !showLabel }"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :type="type"
      :value="value"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      @input="updateValue"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string,
  label: string,
  value: string | number,
  type: string,
  showLabel: boolean,
  required: boolean,
  placeholder?: string | null,
  autocomplete?: string | null
}

withDefaults(defineProps<Props>(), {
  label: '',
  type: 'text',
  showLabel: true,
  required: true,
  placeholder: null,
  autocomplete: null
});

interface Emits {
  (e: 'input', value: string): void
}

const emit = defineEmits<Emits>();

function updateValue(event: Event) {
  return emit('input', (event.target as HTMLInputElement).value);
}

</script>
