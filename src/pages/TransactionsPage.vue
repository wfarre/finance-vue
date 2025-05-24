<template>
  <PageHeader title="Transactions" />
  <main>
    <p v-if="transactionFetch.error.value">Oops! Something went wrong...</p>

    <section v-else class="rounded-2xl bg-white">
      <header class="flex gap-6 px-8 pt-8">
        <SearchBar v-model="searchBy" />
        <SortSelect
          v-model="sortByFilter"
          label="Sort by"
          mobileIcon="/images/icon-sort-mobile.svg"
        />
        <SortSelect
          v-model="categoryFilter"
          :options="categoryOptions"
          label="Category"
          mobileIcon="/images/icon-filter-mobile.svg"
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
              v-for="transaction in displayedTransactions"
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
import { computed, reactive, ref, watch } from "vue";
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
const categoryFilter = ref("All");
const sortByFilter = ref("Oldest");
const searchBy = ref("");

const categoryOptions = [
  "All",
  "Entertainment",
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
  currentPage.value = 1;
  let transactionsArray = array;
  transactionsArray = filterBySearch(transactionsArray, searchBy);
  transactionsArray = filterByCategory(transactionsArray, categoryFilter);
  transactionsArray = sortBy(transactionsArray, sortFilter);
  return transactionsArray;
};

const transactionFetch = useFetch<TransactionAPI[]>(
  "http://localhost:3333/transactions",
);
transactionFetch.refetch();

const transactionsData = computed(() =>
  transactionFetch.data.value?.map(
    (transaction) => new TransactionFactory(transaction, "json"),
  ),
);
const filteredTransaction = computed(() => {
  const updatedTransactions = transactionsData.value
    ? filterTransaction(
        transactionsData.value,
        sortByFilter.value,
        categoryFilter.value,
        searchBy.value,
      )
    : [];

  console.log(updatedTransactions);
  return updatedTransactions;
});

const maxPage = computed(() =>
  filteredTransaction.value
    ? Math.ceil(filteredTransaction.value?.length / 10)
    : 0,
);

const displayedTransactions = computed(() =>
  filteredTransaction.value.slice(
    (currentPage.value - 1) * resultPerPage,
    currentPage.value * resultPerPage,
  ),
);
</script>
