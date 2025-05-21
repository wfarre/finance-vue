<template>
  <section
    class="flex flex-5/12 flex-col items-stretch gap-8 rounded-xl bg-white p-8 md:flex-row md:items-center lg:flex-col lg:items-stretch"
  >
    <div class="flex-1/2 p-7">
      <canvas ref="chartRef" class="w-60"></canvas>
    </div>
    <div class="flex-1/2">
      <h2 class="text-xl font-bold">Spending Summary</h2>
      <ul class="mt-8 flex w-full flex-col gap-8">
        <li
          v-for="budget in budgets"
          class="relative flex items-baseline justify-between pl-4"
        >
          <div
            :style="`background-color: ${budget.theme}`"
            class="absolute top-0 left-0 h-full w-1"
          ></div>
          <p class="text-grey-500 text-sm">{{ budget.category }}</p>
          <p class="text-grey-900 text-base font-bold">
            {{ formatMoneyAmount(spendingSummary[budget.category]) }}
            <span class="text-grey-500 text-xs font-normal"
              >of {{ budget.maximum }}$</span
            >
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
import { formatMoneyAmount } from "../../utils/utils";

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
          label: "# of Votes",
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
