<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <label
    for="search-bar"
    class="border-grey-500 flex items-center gap-4 rounded-lg border px-5 py-3"
  >
    <input
      id="search-bar"
      v-model="model"
      class="text-sm"
      type="text"
      placeholder="Search transaction"
    />
    <img src="/images/icon-search.svg" alt="search" />
  </label>
</template>
