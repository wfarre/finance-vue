<script setup lang="ts">
import { computed } from "vue";
import Icon from "../../Icon.vue";

const props = defineProps<{
  bgColor: string;
  icon?: string;
  label: string;
  value: number;
}>();

const textColor = computed(
  () => props.bgColor === "bg-grey-900" && "text-white",
);
</script>

<template>
  <dl
    class="flex flex-1/2 items-center gap-4 rounded-2xl p-6"
    :class="[bgColor, textColor]"
  >
    <Icon v-if="icon" :iconUrl="icon" />
    <div class="">
      <dt class="mb-3 text-sm">{{ label }}</dt>
      <dd class="text-[32px] font-bold">${{ value }}</dd>
    </div>
  </dl>
</template>
