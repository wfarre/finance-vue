<script setup lang="ts">
import Button from "../ui/Button.vue";
defineProps<{ title: string; buttonLabel?: string }>();
const emits = defineEmits<{ (e: "headerButtonClicked"): void }>();
</script>

<template>
  <header class="mb-8 flex justify-between py-2">
    <h1 class="text-[32px] font-bold capitalize">{{ title }}</h1>
    <Button
      class="capitalize"
      v-if="buttonLabel"
      @onButtonClicked="() => emits('headerButtonClicked')"
    >
      {{ buttonLabel }}
    </Button>
  </header>
</template>
