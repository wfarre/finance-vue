<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";

// const svg = await loadSvg(links[0].icon)
// console.log(svg);
</script>

<template>
  <div
    class="relative flex min-h-[100dvh] flex-col-reverse justify-between gap-10 lg:flex-row"
  >
    <Navbar />

    <div class="w-full px-4 py-8 md:px-10 lg:pl-0">
      <!-- <header class="py-2 mb-8 flex justify-between">
        <h1 class="text-[32px] font-bold">Overview</h1>
        <button class="bg-grey-900 text-white h-13 px-4 rounded-xl flex items-center justify-center">+ Add new pot</button>
      </header> -->

      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
