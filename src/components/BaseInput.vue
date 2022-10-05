<template>
  <div>
    <label
      :for="name"
      class="text-sm text-gray-500"
      :class="{ 'sr-only': !showLabel }"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :type="type"
      :value="value"
      :required="required"
      @input="updateValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number]
  },
  type: {
    type: String,
    default: 'text'
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: null
  },
  autocomplete: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['input']);

function updateValue(event: Event) {
  return emit('input', (event.target as HTMLInputElement).value);
}

</script>
