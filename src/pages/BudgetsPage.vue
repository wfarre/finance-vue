<script setup lang="ts">
import { computed, ref } from "vue";
import PageHeader from "../components/layout/PageHeader.vue";
import { TransactionFactory } from "../factories/TransactionFactory";
import BudgetCard from "../components/ui/cards/BudgetCard.vue";
import { BudgetFactory } from "../factories/BudgetFactory";
import { apiUrl } from "../utils/actions";
import DeleteModal from "../components/views/DeleteModal.vue";
import ResultModal from "../components/views/ResultModal.vue";
import { useFetch } from "../utils/hooks/useFetch";
import type { BudgetAPI } from "../utils/typeBudget";
import type { TransactionAPI } from "../utils/typeTransaction";
import BudgetChart from "../components/ui/BudgetChart.vue";
import AddEditModal from "../components/views/AddEditModal.vue";

const isSuccessful = ref(false);
const currentId = ref<null | number>(null);
const status = ref<null | "add" | "edit" | "delete">(null);
const isResultModalOpen = ref(false);
const isModalOpen = ref(false);

const budgetFetcher = useFetch<BudgetAPI[]>(`${apiUrl}/budgets`);
const transactionFetcher = useFetch<TransactionAPI[]>(`${apiUrl}/transactions`);

const refetchBudgets = budgetFetcher.refetch;
const refecthTransactions = transactionFetcher.refetch;

refetchBudgets();
refecthTransactions();

const budgetsData = computed(() =>
  budgetFetcher.data.value?.map((b) => BudgetFactory.create(b, "json")),
);
const formattedTransactions = computed(() =>
  transactionFetcher.data.value?.map((t) => new TransactionFactory(t, "json")),
);

const currentBudget = computed(() =>
  currentId.value !== null
    ? budgetsData.value?.find((b) => b.id === currentId.value)
    : undefined,
);

const handleCloseModalReset = () => {
  isModalOpen.value = false;
  isResultModalOpen.value = false;
  currentId.value = null;
};

const handleFormResult = (isSubmitSuccessful: boolean) => {
  isModalOpen.value = false;
  isResultModalOpen.value = true;
  isSuccessful.value = isSubmitSuccessful;
};

const addEditModalSubtitle = computed(() => {
  switch (status.value) {
    case "add":
      return "Choose a category to set a spending budget. These categories can help you monitor spending.";
    case "edit":
      return "As your budgets change, feel free to update your spending limits.";
    case "delete":
      return "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.";
  }
});
</script>

<template>
  <PageHeader
    title="Budgets"
    button-label="+ add new budget"
    @header-button-clicked="
      () => {
        status = 'add';
        isModalOpen = true;
      }
    "
  />
  <main>
    <AddEditModal
      v-if="isModalOpen && (status === 'add' || status === 'edit')"
      @close-modal="handleCloseModalReset"
      @update-u-i="() => budgetFetcher.refetch()"
      :name="currentBudget?.category"
      :amount="currentBudget?.maximum"
      :theme="currentBudget?.theme"
      :id="currentBudget?.id"
      :form-type="status"
      title="Budget"
      :subtitle="addEditModalSubtitle ?? ''"
      path="/budgets"
      item-type="budget"
    />

    <DeleteModal
      v-if="currentBudget && isModalOpen && status === 'delete'"
      :id="currentBudget.id"
      :name="currentBudget.category"
      path="/budgets"
      @close-modal="handleCloseModalReset"
      @is-successful="handleFormResult"
      @update-u-i="() => refetchBudgets()"
    />

    <ResultModal
      v-if="isResultModalOpen"
      :is-successful="isSuccessful"
      @close-modal="handleCloseModalReset"
      @try-again="
        () => {
          isModalOpen = true;
          isResultModalOpen = false;
        }
      "
    />
    <p v-if="budgetFetcher.error.value || transactionFetcher.error.value">
      Oops! Something went wrong...
    </p>

    <div class="flex flex-col lg:flex-row">
      <div class="mb-8 lg:pr-3">
        <BudgetChart
          v-if="budgetsData && formattedTransactions"
          class="flex-1/2 p-7"
          :budgets="budgetsData"
          :transactions="formattedTransactions"
        />
      </div>

      <ul class="flex-7/12 lg:pl-3">
        <li v-for="budget in budgetsData" class="mb-6">
          <BudgetCard
            :budget="budget"
            :transactions="formattedTransactions ? formattedTransactions : []"
            @edit="
              (id) => {
                console.log(id);

                status = 'edit';
                currentId = id;
                isModalOpen = true;
              }
            "
            @delete="
              (id) => {
                isModalOpen = true;
                currentId = id;
                status = 'delete';
              }
            "
          />
        </li>
      </ul>
    </div>
  </main>
</template>
