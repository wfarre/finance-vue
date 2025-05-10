<script setup lang="ts">
import { computed } from "vue";
import Icon from "../../Icon.vue";
const props = defineProps<{
  headingText: string;
  detailsLink: string;
  linkText?: string;
}>();

const shownLinkText = computed(() =>
  props.linkText ? props.linkText : "See Details",
);
</script>

<template>
  <article class="w-full rounded-2xl bg-white p-8">
    <header class="mb-5 flex flex-1/2 justify-between">
      <h2 class="text-xl font-bold">{{ headingText }}</h2>
      <RouterLink
        :to="detailsLink"
        class="text-grey-500 flex items-center gap-3 text-sm"
        >{{ shownLinkText }}<Icon icon-url="/images/icon-caret-right.svg"></Icon
      ></RouterLink>
    </header>
    <slot></slot>
  </article>
</template>
