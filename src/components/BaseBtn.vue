<template>
  <button
    :type="type"
    class="px-2.5 py-1.5 border border-transparent text-xs rounded shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center transition"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  type: string,
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
  text: 'Submit'
});

</script>
