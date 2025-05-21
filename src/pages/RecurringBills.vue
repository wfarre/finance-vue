<script setup lang="ts">
import PageHeader from "../components/layout/PageHeader.vue";
import { formatCurrency } from "../utils/utils";
import SortSelect from "../components/ui/FilterSelect.vue";
import { computed, ref } from "vue";
import SearchBar from "../components/ui/SearchBar.vue";
import { useFetch } from "../utils/hooks/useFetch";
import type { TransactionAPI } from "../utils/typeTransaction";
import { Transaction } from "../models/Transaction";
import { TransactionFactory } from "../factories/TransactionFactory";

const sortBy = ref("latest");
const search = ref("");
const transactionData = ref<TransactionFactory[]>([]);

// fetch("/data/data.json")
//   .then((res) => res.json())
//   .then((json) => {
//     const transactions = json.transactions as TransactionAPI[];
//     data.value = transactions.map(
//       (transaction) => new TransactionFactory(transaction, "json"),
//     );
//   })
//   .catch((err) => console.log(err));

const { data, error, isLoading, refetch } = useFetch<TransactionAPI[]>(
  "http://localhost:3333/transactions",
);

// refetch();

const recurringTransactions = computed(() => {
  return data.value
    ?.filter((transaction) => transaction.recurring)
    .map((t) => new TransactionFactory(t, "json"));
});

console.log(recurringTransactions.value);
</script>

<template>
  <PageHeader title="Recurring Bills" />

  <main>
    <div class="flex">
      <section class="mr-3 flex-1/3">
        <article class="bg-grey-900 rounded-xl p-6 text-white">
          <img src="/images/icon-recurring-bills.svg" alt="" />
          <dl class="mt-8 flex flex-col gap-3">
            <dt class="text-sm">Total Bills</dt>
            <dd class="text-[32px] font-bold">{{ formatCurrency(384) }}</dd>
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
                <dd class="text-xs font-bold">4 ({{ formatCurrency(190) }})</dd>
              </dl>
            </li>
            <li>
              <dl class="flex justify-between">
                <dt class="text-xs">Total Upcoming</dt>
                <dd class="text-xs font-bold">4 ({{ formatCurrency(190) }})</dd>
              </dl>
            </li>
            <li>
              <dl class="flex justify-between">
                <dt class="text-secondary-red text-xs">Due Soon</dt>
                <dd class="text-secondary-red text-xs font-bold">
                  4 ({{ formatCurrency(190) }})
                </dd>
              </dl>
            </li>
          </ul>
        </article>
      </section>

      <section class="flex-2/3 rounded-xl bg-white p-8 lg:ml-3">
        <header class="flex">
          <SearchBar v-model="search" />
          <SortSelect v-model="sortBy" />
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
            <tr v-for="transaction in recurringTransactions">
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
              <td class="text-secondary-green text-xs">
                {{ transaction.formattedDateTime }}
              </td>
              <td>{{ formatCurrency(transaction.amount) }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </main>
</template>
