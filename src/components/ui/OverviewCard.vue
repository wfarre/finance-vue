<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon.vue';
const props = defineProps<{headingText: string, detailsLink: string, linkText?: string }>()

const shownLinkText = computed(() => props.linkText ? props.linkText : 'See Details')

</script>



<template>
     <article class="bg-white w-full rounded-2xl p-8">
        <header class="flex flex-1/2 justify-between mb-5">
          <h2 class="text-xl font-bold ">{{ headingText }}</h2>
          <RouterLink :to="detailsLink" class="text-sm text-grey-500 flex gap-3 items-center">{{ shownLinkText }}<Icon icon-url="/images/icon-caret-right.svg" ></Icon></RouterLink>
        </header>
        <slot></slot>
      </article>
</template>