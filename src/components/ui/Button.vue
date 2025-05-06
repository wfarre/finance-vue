<script setup lang="ts">
const emit = defineEmits<{ (e: "onButtonClicked"): void }>();
const props = defineProps<{ bgColor?: string; textColor?: string }>();
</script>

<template>
  <button
    class="flex h-13 items-center justify-center rounded-xl px-4"
    :class="[
      props.bgColor ? props.bgColor : 'bg-grey-900',
      props.textColor ? props.textColor : 'text-white',
    ]"
    v-on:click="() => emit('onButtonClicked')"
  >
    <slot></slot>
  </button>
</template>
