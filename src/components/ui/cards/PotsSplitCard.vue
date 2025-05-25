<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ name: string; total: number; theme: string }>();
</script>

<template>
  <figure class="relative pl-4">
    <div
      :style="`background-color:${theme}`"
      class="absolute top-0 left-0 h-full w-1 rounded-xl"
    ></div>
    <figcaption class="text-grey-500 mb-1 text-xs">
      {{ name }}
    </figcaption>
    <p class="text-sm font-bold">${{ total }}</p>
  </figure>
</template>
