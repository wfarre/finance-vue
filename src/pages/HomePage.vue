<template>
  <PageHeader title="Overview" />
  <main>
    <section
      class="mb-8 flex w-full flex-col justify-between gap-6 lg:flex-row"
    >
      <BalanceCard
        label="Current Balance"
        :value="balance ? balance.current : 0"
        bg-color="bg-grey-900"
      />
      <BalanceCard
        label="Income"
        :value="balance ? balance.income : 0"
        bg-color="bg-white"
      />
      <BalanceCard
        label="Expenses"
        :value="balance ? balance.expenses : 0"
        bg-color="bg-white"
      />
    </section>
    <section class="flex flex-col gap-6 lg:flex-row">
      <div class="flex flex-6/12 flex-col gap-6">
        <OverviewCard heading-text="Pots" details-link="/pots">
          <div class="flex items-center gap-5">
            <BalanceCard
              label="Total Saved"
              :value="potsTotalSaved ? potsTotalSaved : 0"
              icon="/images/icon-pot.svg"
              bg-color=" bg-beige-100"
            />
            <ul class="flex flex-1/2 flex-wrap gap-y-4">
              <li v-for="pot in potsDataToDisplay" class="h-11 flex-1/2">
                <PotsSplitCard
                  :name="pot.name"
                  :total="pot.total"
                  :theme="pot.theme"
                />
              </li>
            </ul>
          </div>
        </OverviewCard>

        <OverviewCard
          heading-text="Transactions"
          details-link="/transactions"
          link-text="View All"
        >
          <div class="flex items-center gap-5 pt-3">
            <ul class="flex flex-wrap">
              <li
                v-for="transaction in transactionsDataToDisplay"
                class="border-b-grey-100 w-full border-b py-5 first:pt-0 last:border-0 last:pb-0"
              >
                <TransactionCard
                  :amount="transaction.amount"
                  :avatar="transaction.avatar"
                  :date="transaction.date"
                  :name="transaction.name"
                />
              </li>
            </ul>
          </div>
        </OverviewCard>
      </div>
      <div class="flex flex-4/12 flex-col gap-6">
        <OverviewCard heading-text="Budgets" details-link="/budgets">
          <!-- <Chart /> -->
          <BudgetChartCopy
            v-if="transactions && budgets"
            :transactions="transactions"
            :budgets="budgets"
          />
        </OverviewCard>

        <OverviewCard
          heading-text="Recurring Bills"
          details-link="/recurring-bills"
        >
          <ul class="flex flex-col gap-3 pt-3">
            <li
              class="border-l-secondary-green bg-beige-100 flex justify-between rounded-xl border-l-4 px-4 py-5"
            >
              <p class="text-grey-500 text-sm">Paid Bills</p>
              <p class="text-grey-900 text-sm font-bold">
                {{ formatCurrency(summaryContent.paid.total) }}
              </p>
            </li>
            <li
              class="border-l-secondary-yellow bg-beige-100 flex justify-between rounded-xl border-l-4 px-4 py-5"
            >
              <p class="text-grey-500 text-sm">Total Upcoming</p>
              <p class="text-grey-900 text-sm font-bold">
                {{ formatCurrency(summaryContent.upcomming.total) }}
              </p>
            </li>
            <li
              class="border-l-secondary-cyan bg-beige-100 flex justify-between rounded-xl border-l-4 px-4 py-5"
            >
              <p class="text-grey-500 text-sm">Due Soon</p>
              <p class="text-grey-900 text-sm font-bold">
                {{ formatCurrency(summaryContent.due.total) }}
              </p>
            </li>
          </ul>
        </OverviewCard>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import OverviewCard from "../components/ui/cards/OverviewCard.vue";
import PotsSplitCard from "../components/ui/cards/PotsSplitCard.vue";
import BalanceCard from "../components/ui/cards/BalanceCard.vue";
import TransactionCard from "../components/ui/cards/TransactionCard.vue";
import { computed, ref, watch } from "vue";
import PageHeader from "../components/layout/PageHeader.vue";
import { useFetch } from "../utils/hooks/useFetch";
import type { BudgetAPI } from "../utils/typeBudget";
import { apiUrl } from "../utils/actions";
import type { TransactionAPI } from "../utils/typeTransaction";
import { BudgetFactory } from "../factories/BudgetFactory";
import { TransactionFactory } from "../factories/TransactionFactory";
import type { PotAPI } from "../utils/typePot";
import { PotFactory } from "../factories/PotFactory";
import BudgetChartCopy from "../components/ui/BudgetChartCopy.vue";
import {
  formatCurrency,
  getRecurringSummaryContent,
  removeDoublon,
} from "../utils/utils";
import { BalanceFactory } from "../factories/BalanceFactory";
import type { BalanceAPI } from "../utils/typeBalance";

const allData = ref(null);

fetch("/data/data.json")
  .then((res) => res.json())
  .then((data) => (allData.value = data))
  .catch((err) => console.log(err));

const budgetFetcher = useFetch<BudgetAPI[]>(`${apiUrl}/budgets`);
const transactionFetcher = useFetch<TransactionAPI[]>(`${apiUrl}/transactions`);
const potFetcher = useFetch<PotAPI[]>(`${apiUrl}/pots`);
const balanceFetcher = useFetch<BalanceAPI[]>(`${apiUrl}/balances`);

const summaryContent = computed(() =>
  getRecurringSummaryContent(recurringTransactions.value),
);

const budgets = computed(() =>
  budgetFetcher.data.value?.map((b) => BudgetFactory.create(b, "json")),
);

const transactions = computed(() =>
  transactionFetcher.data.value?.map((t) => new TransactionFactory(t, "json")),
);

const pots = computed(() =>
  potFetcher.data.value?.map((p) => PotFactory.create(p, "json")),
);

const balance = computed(
  () =>
    balanceFetcher.data.value?.map((b) => BalanceFactory.create(b, "json"))[0],
);

const transactionsDataToDisplay = computed(() =>
  transactions.value?.slice(0, 5),
);

const potsTotalSaved = computed(() =>
  pots.value?.reduce((acc, current) => (acc += current.total), 0),
);

const potsDataToDisplay = computed(() => pots.value?.slice(0, 4));
const recurringTransactions = computed(() => {
  const recurringTransactions = transactions.value?.filter((t) => t.recurring);

  return recurringTransactions && removeDoublon(recurringTransactions);
});

balanceFetcher.refetch();
transactionFetcher.refetch();
budgetFetcher.refetch();
potFetcher.refetch();
</script>
