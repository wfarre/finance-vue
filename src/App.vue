<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
</script>

<template>
  <div
    class="relative flex min-h-[100dvh] flex-col-reverse justify-between gap-10 lg:flex-row"
  >
    <Navbar />
    <div class="w-full px-4 py-8 md:px-10 lg:pl-0">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
