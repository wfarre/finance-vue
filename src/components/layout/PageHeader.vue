<script setup lang="ts">
import Button from "../ui/Button.vue";
const props = defineProps<{ title: string; buttonLabel?: string }>();
const emits = defineEmits<{ (e: "headerButtonClicked"): void }>();
</script>

<template>
  <header class="mb-8 flex justify-between py-2">
    <h1 class="text-[32px] font-bold">{{ title }}</h1>

    <Button
      v-if="buttonLabel"
      @onButtonClicked="() => emits('headerButtonClicked')"
    >
      {{ buttonLabel }}
    </Button>
  </header>
</template>
