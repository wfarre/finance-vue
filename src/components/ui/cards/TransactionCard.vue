<script setup lang="ts">
import { computed } from "vue";
import { formatDate, formatMoneyAmount } from "../../../utils/utils";

const props = defineProps<{
  avatar: string;
  name: string;
  amount: number;
  date: string;
}>();

console.log(formatDate(props.date));

const formmattedAmount = computed(() => formatMoneyAmount(props.amount));
const formattedDate = computed(() => formatDate(props.date));
const amountColor = computed(
  () => formmattedAmount.value.includes("+") && "text-secondary-green",
);
</script>

<template>
  <article class="flex h-[47px] items-center gap-4">
    <div class="relative h-10 w-10 overflow-hidden rounded-full">
      <img
        class="absolute top-0 left-0 h-full w-full"
        :src="avatar"
        :alt="name"
        height="40"
        width="40"
      />
    </div>
    <h3 class="text-sm font-bold">{{ name }}</h3>

    <dl class="ml-auto text-right">
      <dt class="mb-2 text-sm font-bold" :class="amountColor">
        {{ formmattedAmount }}
      </dt>
      <dd class="text-grey-500 text-xs">{{ formattedDate }}</dd>
    </dl>
  </article>
</template>
