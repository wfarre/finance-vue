<template>
  <section
    class="flex flex-5/12 flex-col items-center gap-8 rounded-xl bg-white py-8 md:flex-row md:items-center"
  >
    <div class="relative h-60 w-60 max-w-60 flex-1/2">
      <canvas ref="chartRef"></canvas>
      <div class="absolute top-1/2 left-1/2 translate-[-50%] text-center">
        <p class="text-[32px] font-bold">{{ formatCurrency(totalSpent) }}</p>
        <span class="text-grey-500 text-xs">of {{ limit }} limit</span>
      </div>
    </div>
    <div class="flex-1/2">
      <ul class="flex flex-wrap gap-y-4 lg:flex-col">
        <li
          v-for="budget in budgets"
          class="relative flex flex-1/2 flex-col items-baseline justify-between pl-4"
        >
          <div
            :style="`background-color: ${budget.theme}`"
            class="absolute top-0 left-0 h-full w-1"
          ></div>
          <p class="text-grey-500 mb-1 text-xs">{{ budget.category }}</p>
          <p class="text-grey-900 text-sm font-bold">
            {{ formatCurrency(spendingSummary[budget.category]) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, type Ref } from "vue";
import {
  Chart,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
} from "chart.js";
import { Budget } from "../../models/Budget";
import type { Transaction } from "../../models/Transaction";
import { formatCurrency, formatMoneyAmount, getTotal } from "../../utils/utils";

const props = defineProps<{ budgets: Budget[]; transactions: Transaction[] }>();
const spendingSummary = computed(() => getSpendingsSummary());
const chartRef = ref(null);

const getSpendingsSummary = () => {
  let spendings: { [key: string]: number } = {};
  props.budgets.forEach((budget) => {
    let total = 0;
    props.transactions.forEach((transaction) => {
      if (transaction.category === budget.category) {
        total += transaction.amount;
      }
    });
    spendings = { ...spendings, [budget.category]: total };
  });
  return spendings;
};

const limit = computed(() => getTotal(props.budgets, "maximum"));

const totalSpent = computed(() =>
  Object.values(spendingSummary.value).reduce(
    (acc, current) => (acc += current),
    0,
  ),
);

const generateChart = (chartRef: Ref) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    DoughnutController, // ✅ add this too
    Title,
    Tooltip,
    Legend,
  );

  return new Chart(chartRef.value, {
    type: "doughnut",
    data: {
      labels: props.budgets.map((b) => b.category),
      datasets: [
        {
          label: "budgets",
          data: props.budgets.map((b) => b.maximum),
          backgroundColor: props.budgets.map((b) => b.theme),
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: 80,
      plugins: {
        legend: {
          display: false,
          position: "bottom",
        },
      },
    },
  });
};

onMounted(async () => {
  await nextTick();
  if (!chartRef.value) return;
  generateChart(chartRef);
});
</script>
