<template>
  <PageHeader title="Transactions" />
  <main>
    <section class="rounded-2xl bg-white">
      <header class="flex gap-6 px-8 pt-8">
        <label
          for=""
          class="border-grey-500 flex items-center gap-4 rounded-lg border px-5 py-3"
        >
          <input
            :value="searchBy"
            class="text-sm"
            type="text"
            placeholder="Search transaction"
            v-on:input="(e) => (searchBy = (<HTMLInputElement>e.target).value)"
          />
          <img src="/images/icon-search.svg" alt="search" />
        </label>
        <label class="text-grey-500 ml-auto flex items-center gap-4">
          Sort By
          <select
            :value="sortByFilter"
            class="border-beige-500 rounded-lg border px-5 py-3 text-sm"
            v-on:change="
              (e) => (sortByFilter = (<HTMLInputElement>e.target).value)
            "
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </label>

        <label class="text-grey-500 flex items-center gap-4">
          Category
          <select
            class="border-beige-500 rounded-lg border px-5 py-3 text-sm"
            :value="categoryFilter"
            v-on:change="
              (e) => (categoryFilter = (<HTMLInputElement>e.target).value)
            "
          >
            <option value="all">All Transactions</option>
            <option value="entertaimenet">Entertaiment</option>
            <option value="bills">Bills</option>
            <option value="groceries">groceries</option>
            <option value="dining out">Dining Out</option>
            <option value="transportation">transportation</option>
            <option value="personal care">Personal Care</option>
          </select>
        </label>
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
import Pagination from "../components/ui/Pagination.vue";
import PageHeader from "../components/layout/PageHeader.vue";

const currentPage = ref(1);
const resultPerPage = 10;
const categoryFilter = ref("all");
const sortByFilter = ref("az");
const searchBy = ref("");
const filteredTransaction = ref<TransactionFactory[]>([]);
const transactionsData = ref<TransactionFactory[]>([]);

const filterBySearch = <T extends TransactionFactory>(
  array: T[],
  searchInput: string,
): T[] =>
  searchInput.length > 0
    ? array.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()),
      )
    : array;
const filterByCategory = <T extends TransactionFactory>(
  array: T[],
  category: string,
): T[] =>
  category === "all"
    ? array
    : array.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase(),
      );
const sortBy = <T extends TransactionFactory>(
  array: T[],
  sortFilter: string,
): T[] => {
  switch (sortFilter.toLowerCase()) {
    case "latest":
    case "oldest":
      return array.sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        return sortFilter.toLowerCase() === "oldest"
          ? dateA - dateB
          : dateB - dateA;
      });
    case "highest":
      return array.sort((a, b) => b.amount - a.amount);
    case "lowest":
      return array.sort((a, b) => a.amount - b.amount);
    case "az":
      return array.sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return array.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return array.sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        return dateB - dateA;
      });
  }
};

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

fetch("/data/data.json")
  .then((res) => res.json())
  .then((data) => {
    const transactions = data.transactions as TransactionAPI[];
    transactionsData.value = transactions.map(
      (transaction) => new TransactionFactory(transaction, "json"),
    );
  })
  .catch((err) => console.log(err));

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
