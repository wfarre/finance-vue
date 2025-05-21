<script setup lang="ts">
import { computed } from "vue";
import type { Transaction } from "../../../models/Transaction";
import { formatCurrency } from "../../../utils/utils";
import type { IBudget } from "../../../models/Budget";
import CardEllipsisMenu from "../CardEllipsisMenu.vue";

const props = defineProps<{
  budget: IBudget;
  transactions: Transaction[];
}>();

const emits = defineEmits<{
  (e: "edit", id: number): void;
  (e: "delete", id: number): void;
}>();

const getTotalSpentMoney = (transactions: Transaction[]): number =>
  -1 *
  transactions.reduce((acc: number, current: Transaction) => {
    return (acc += current.amount);
  }, 0);

const transactionsToDisplay = computed(() =>
  props.transactions.filter(
    (t) => t.category.toLowerCase() === props.budget.category.toLowerCase(),
  ),
);

const spentMoney = computed(() =>
  getTotalSpentMoney(transactionsToDisplay.value),
);

const spentMoneyPercent = computed(
  () => spentMoney.value / props.budget.maximum,
);
</script>

<template>
  <article class="rounded-2xl bg-white p-8">
    <header class="relative">
      <div class="mb-5 flex items-center">
        <span class="bg-secondary-green mr-4 h-4 w-4 rounded-full"></span>
        <h3 class="text-xl font-bold">{{ budget.category }}</h3>
        <CardEllipsisMenu
          @delete="() => emits('delete', budget.id)"
          @edit="() => emits('edit', budget.id)"
        />
      </div>
      <p class="text-grey-500 mb-4 text-sm">
        Maximum {{ formatCurrency(budget.maximum) }}$
      </p>
      <div class="bg-beige-100 h-8 w-full overflow-hidden rounded-b-sm p-1">
        <div
          :style="`background-color:${budget.theme}; transform: scaleX(${spentMoneyPercent})`"
          class="h-full w-full origin-left rounded-sm"
        ></div>
      </div>
      <ul class="mt-4 flex">
        <li class="relative flex-1/2 pl-4">
          <span
            :style="`background-color:${budget.theme}`"
            class="absolute top-0 left-0 h-full w-1 rounded-lg"
          ></span>
          <dl class="flex flex-col gap-1">
            <dt class="text-grey-500 text-xs">Spent</dt>
            <dd class="texte-grey-900 text-sm font-bold">
              {{ formatCurrency(spentMoney) }}
            </dd>
          </dl>
        </li>
        <li class="relative flex-1/2 pl-4">
          <span
            class="bg-beige-100 absolute top-0 left-0 h-full w-1 rounded-lg"
          ></span>
          <dl class="flex flex-col gap-1">
            <dt class="text-grey-500 text-xs">Remaining</dt>
            <dd class="texte-grey-900 text-sm font-bold">
              {{ formatCurrency(budget.maximum - spentMoney) }}
            </dd>
          </dl>
        </li>
      </ul>
    </header>
    <div class="bg-beige-100 mt-5 p-5">
      <h4 class="text-bold text-grey-900 mb-5 text-base font-bold">
        Latest Spendings
      </h4>
      <table class="w-full border-collapse">
        <tbody>
          <tr
            class="border-b-grey-500 border-b-1 last:border-0"
            v-for="transaction in transactionsToDisplay"
          >
            <td class="flex items-center gap-4 py-3 text-xs font-bold">
              <picture
                class="relative block h-10 w-10 overflow-hidden rounded-full"
              >
                <img
                  class="absolute top-0 left-0 h-full w-full"
                  :src="transaction.avatar"
                  alt=""
                />
              </picture>
              {{ transaction.name }}
            </td>
            <td class="py-3">
              <dl class="flex flex-col items-end gap-1">
                <dt class="text-grey-900 text-xs font-bold">
                  {{ transaction.formattedAmount }}
                </dt>
                <dd class="text-grey-500 text-xs">
                  {{ transaction.formattedDate }}
                </dd>
              </dl>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
