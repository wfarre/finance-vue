<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{name: string, total: number, theme: string }>()

const color = computed(() => `bg-[${props.theme}]`)

console.log(color.value);




</script>

<template>
    <figure class="relative pl-4">
        <div class="absolute w-1 h-full  left-0 top-0 rounded-xl " :class="color"></div>
        <figcaption class=" text-grey-500 text-xs">
            {{ name }}
        </figcaption>
        <p class="font-bold text-sm">${{ total }}</p>
    </figure>
</template>