<script setup lang="ts">
import PageHeader from "../components/layout/PageHeader.vue";
import {
  filterBySearch,
  formatCurrency,
  getRecurringSummaryContent,
  removeDoublon,
  sortBy,
} from "../utils/utils";
import SortSelect from "../components/ui/FilterSelect.vue";
import { computed, ref } from "vue";
import SearchBar from "../components/ui/SearchBar.vue";
import { useFetch } from "../utils/hooks/useFetch";
import type { TransactionAPI } from "../utils/typeTransaction";
import { Transaction } from "../models/Transaction";
import { TransactionFactory } from "../factories/TransactionFactory";

const sortFilter = ref("Oldest");
const search = ref("");
const summaryContent = computed(() =>
  getRecurringSummaryContent(recurringTransactions.value),
);

const { data, error, isLoading, refetch } = useFetch<TransactionAPI[]>(
  "http://localhost:3333/transactions",
);

const recurringTransactions = computed(() => {
  const transactions = data.value
    ?.filter((transaction) => transaction.recurring)
    .map((t) => new TransactionFactory(t, "json"));

  return transactions && removeDoublon(transactions);
});

const displayedTransactions = computed(() => {
  return filterTransaction(
    recurringTransactions.value ? recurringTransactions.value : [],
    sortFilter.value,
    search.value,
  );
});

const filterTransaction = <T extends Transaction>(
  array: T[],
  sortFilter: string,
  searchBy: string,
): T[] => {
  let transactionsArray = array;
  transactionsArray = sortBy(transactionsArray, sortFilter);
  transactionsArray = filterBySearch(transactionsArray, searchBy);
  return transactionsArray;
};
</script>

<template>
  <PageHeader title="Recurring Bills" />

  <main>
    <p v-if="error">Oops! Something went wrong...</p>
    <div v-else class="flex flex-col lg:flex-row">
      <section class="mb-8 flex-1/3 lg:mr-3">
        <article class="bg-grey-900 rounded-xl p-6 text-white">
          <img src="/images/icon-recurring-bills.svg" alt="" />
          <dl class="mt-8 flex flex-col gap-3">
            <dt class="text-sm">Total Bills</dt>
            <dd class="text-[32px] font-bold">
              {{
                formatCurrency(
                  summaryContent.upcomming.total + summaryContent.paid.total,
                )
              }}
            </dd>
          </dl>
        </article>
        <article class="mt-6 rounded-xl bg-white p-6">
          <header>
            <h3 class="font-bold">Summary</h3>
          </header>
          <ul class="mt-5 flex flex-col gap-8">
            <li>
              <dl class="flex justify-between">
                <dt class="text-xs">Paid Bills</dt>
                <dd class="text-xs font-bold">
                  {{ summaryContent.paid.quantity }} ({{
                    formatCurrency(summaryContent.paid.total)
                  }})
                </dd>
              </dl>
            </li>
            <li>
              <dl class="flex justify-between">
                <dt class="text-xs">Total Upcoming</dt>
                <dd class="text-xs font-bold">
                  {{ summaryContent.upcomming.quantity }} ({{
                    formatCurrency(summaryContent.upcomming.total)
                  }})
                </dd>
              </dl>
            </li>
            <li>
              <dl class="flex justify-between">
                <dt class="text-secondary-red text-xs">Due Soon</dt>
                <dd class="text-secondary-red text-xs font-bold">
                  {{ summaryContent.due.quantity }} ({{
                    formatCurrency(summaryContent.due.total)
                  }})
                </dd>
              </dl>
            </li>
          </ul>
        </article>
      </section>

      <section class="flex-2/3 rounded-xl bg-white p-8 lg:ml-3">
        <header class="flex justify-between">
          <SearchBar v-model="search" />
          <SortSelect
            v-model="sortFilter"
            label="Sort by"
            mobileIcon="/images/icon-sort-mobile.svg"
          />
        </header>
        <table class="w-full border-separate border-spacing-6">
          <thead class="text-beige-500 text-left text-xs font-normal">
            <tr>
              <th class="font-normal">Bill Title</th>
              <th class="font-normal">Due Date</th>
              <th class="font-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in displayedTransactions">
              <td class="flex items-center gap-4 text-sm font-bold">
                <div class="relative h-8 w-8 overflow-hidden rounded-full">
                  <img
                    class="absolute top-0 left-0 h-full w-full"
                    :src="transaction.avatar"
                    :alt="transaction.name"
                    height="40"
                    width="40"
                  />
                </div>
                {{ transaction.name }}
              </td>
              <td
                :class="
                  transaction.isDueSoon === 'paid'
                    ? 'text-secondary-green'
                    : 'text-grey-500'
                "
                class="relative items-center text-xs"
              >
                <div class="flex gap-2">
                  <p>{{ transaction.formattedDateTime }}</p>
                  <img
                    v-if="transaction.isDueSoonIcon"
                    :src="transaction.isDueSoonIcon"
                    alt=""
                  />
                </div>
              </td>
              <td
                :class="
                  transaction.isDueSoon === 'dueSoon'
                    ? 'text-secondary-red'
                    : 'text-grey-900'
                "
                class="text-sm"
              >
                {{ formatCurrency(transaction.amount) }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </main>
</template>
