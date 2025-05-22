<template>
  <PageHeader title="Transactions" />
  <main>
    <p v-if="transactionFetch.error">Oops! Something went wrong...</p>

    <section v-else class="rounded-2xl bg-white">
      <header class="flex gap-6 px-8 pt-8">
        <SearchBar v-model="searchBy" />
        <SortSelect v-model="sortByFilter" />
        <SortSelect
          v-model="categoryFilter"
          :options="categoryOptions"
          label="Category"
        />
      </header>

      <div>
        <table class="w-full border-separate border-spacing-6">
          <thead class="">
            <tr class="text-grey-500">
              <th class="py-5 text-left text-xs font-normal">
                Recipient/Sender
              </th>
              <th class="py-5 text-left text-xs font-normal">Category</th>
              <th class="py-5 text-left text-xs font-normal">
                Transaction Date
              </th>
              <th class="py-5 text-left text-xs font-normal">Amount</th>
            </tr>
          </thead>
          <tbody class="border-spacing-6">
            <tr
              v-if="transactionsData"
              v-for="transaction in displayTransactions"
              class="w-full"
            >
              <td class="text-bold flex items-center gap-4 text-sm">
                <div class="relative h-10 w-10 overflow-hidden rounded-full">
                  <img
                    class="absolute top-0 left-0 h-full w-full"
                    :src="transaction.avatar"
                    alt=""
                    height="40"
                    width="40"
                  />
                </div>
                {{ transaction.name }}
              </td>
              <td class="text-grey-500 text-xs">{{ transaction.category }}</td>
              <td class="text-grey-500 text-xs">
                {{ transaction.formattedDate }}
              </td>
              <td
                class="text-bold text-sm"
                :class="
                  transaction.formattedAmount.includes('+') &&
                  'text-secondary-green'
                "
              >
                {{ transaction.formattedAmount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="mt-6 px-6 pb-8">
        <Pagination
          @set-page="(page) => (currentPage = page)"
          @prev-page="(newValue) => (currentPage = newValue)"
          @next-page="(newValue) => (currentPage = newValue)"
          :current-page="currentPage"
          :max-page="maxPage"
        />
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { TransactionFactory } from "../factories/TransactionFactory";
import type { TransactionAPI } from "../utils/typeTransaction";
import Pagination from "../components/layout/Pagination.vue";
import PageHeader from "../components/layout/PageHeader.vue";
import SearchBar from "../components/ui/SearchBar.vue";
import SortSelect from "../components/ui/FilterSelect.vue";
import { filterByCategory, filterBySearch, sortBy } from "../utils/utils";
import { useFetch } from "../utils/hooks/useFetch";

const currentPage = ref(1);
const resultPerPage = 10;
const categoryFilter = ref("all");
const sortByFilter = ref("oldest");
const searchBy = ref("");
const filteredTransaction = ref<TransactionFactory[]>([]);
// const transactionsData = ref<TransactionFactory[]>([]);

const categoryOptions = [
  "All",
  "Entertaiment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
];

const filterTransaction = <T extends TransactionFactory>(
  array: T[],
  sortFilter: string,
  categoryFilter: string,
  searchBy: string,
): T[] => {
  let transactionsArray = array;
  transactionsArray = sortBy(transactionsArray, sortFilter);
  transactionsArray = filterByCategory(transactionsArray, categoryFilter);
  transactionsArray = filterBySearch(transactionsArray, searchBy);
  return transactionsArray;
};

// fetch("/data/data.json")
//   .then((res) => res.json())
//   .then((data) => {
//     const transactions = data.transactions as TransactionAPI[];
//     transactionsData.value = transactions.map(
//       (transaction) => new TransactionFactory(transaction, "json"),
//     );
//   })
//   .catch((err) => console.log(err));

const transactionFetch = useFetch<TransactionAPI[]>(
  "http://localhost:3333/transactions",
);
transactionFetch.refetch();
const transactionsData = computed(() =>
  transactionFetch.data.value?.map(
    (transaction) => new TransactionFactory(transaction, "json"),
  ),
);

// fetch("http://localhost:3333/transactions")
//   .then((res) => res.json())
//   .then((data) => {
//     const transactions = data.results as TransactionAPI[];
//     transactionsData.value = transactions.map(
//       (transaction) => new TransactionFactory(transaction, "json"),
//     );
//   })
//   .catch((err) => console.log(err));

watch([transactionsData, sortByFilter, categoryFilter, searchBy], () => {
  filteredTransaction.value = filterTransaction(
    transactionsData.value as TransactionFactory[],
    sortByFilter.value,
    categoryFilter.value,
    searchBy.value,
  );
});

const maxPage = computed(() =>
  filteredTransaction.value
    ? Math.ceil(filteredTransaction.value?.length / 10)
    : 0,
);
const displayTransactions = computed(() =>
  filteredTransaction.value?.slice(
    (currentPage.value - 1) * resultPerPage,
    (currentPage.value - 1) * resultPerPage + resultPerPage,
  ),
);
</script>
