<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  iconUrl: string
  class?: string | boolean // Tailwind classes for the wrapper
}>()

const svgContent = ref('')

const loadSvg = async (url: string) => {
  const res = await fetch(url)
  const text = await res.text()
  svgContent.value = text
}

onMounted(() => {
  loadSvg(props.iconUrl)
})
</script>

<template>
  <!-- wrapper gets Tailwind styling -->
  <div
    class="inline-block transition-colors"
    :class="props.class"
    v-html="svgContent"
  ></div>
</template>

<!-- optional scoped styles (still applies) -->
<style scoped>
/* Fallback styles if needed */
/* .icon svg {
  width: 2rem;
  height: 2rem;
  fill: currentColor;
} */
</style>
