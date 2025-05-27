<script setup lang="ts">
import { computed } from "vue";
import Icon from "../../Icon.vue";
import { formatCurrency } from "../../../utils/utils";

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
    class="flex h-[110px] flex-1/2 items-center gap-x-4 rounded-2xl px-4 py-5"
    :class="[bgColor, textColor]"
  >
    <Icon v-if="icon" :iconUrl="icon" />
    <div class="">
      <dt class="mb-[11px] text-sm">{{ label }}</dt>
      <dd class="text-[32px] font-bold">{{ formatCurrency(value) }}</dd>
    </div>
  </dl>
</template>
