<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import PageHeader from "../components/layout/PageHeader.vue";
import BudgetChart from "../components/ui/BudgetChart.vue";
import { TransactionFactory } from "../factories/TransactionFactory";
import BudgetCard from "../components/ui/cards/BudgetCard.vue";
import AddEditPotModal from "../components/layout/AddEditPotModal.vue";
import AddEditModal from "../components/layout/AddEditModal.vue";
import { BudgetFactory } from "../factories/BudgetFactory";
import type { Budget } from "../models/Budget";
import DeleteModal from "../components/layout/DeleteModal.vue";
import { apiUrl, deleteItem } from "../utils/actions";
import DeleteModalCopy from "../components/layout/DeleteModalCopy.vue";
import ResultModal from "../components/layout/ResultModal.vue";
import { useFetch } from "../utils/hooks/useFetch";
import type { BudgetAPI } from "../utils/typeBudget";
import type { TransactionAPI } from "../utils/typeTransaction";
import { formatMoneyAmount } from "../utils/utils";

const { data, error, isLoading, refetch } = useFetch<BudgetAPI[]>(
  `${apiUrl}/budgets`,
);
const transactionFetcher = useFetch<TransactionAPI[]>(`${apiUrl}/transactions`);

const budgetsData = computed(() =>
  data.value?.map((b) => BudgetFactory.create(b, "json")),
);

refetch();
transactionFetcher.refetch();

const isSuccessful = ref(false);
const currentId = ref<null | number>(null);
const status = ref<null | "add" | "edit" | "delete">(null);
const isResultModalOpen = ref(false);
const isModalOpen = ref(false);

const currentBudget = computed(() => {
  console.log(currentId);

  return currentId.value !== null
    ? budgetsData.value?.find((b) => b.id === currentId.value)
    : undefined;
});

const formattedTransactions = computed(() =>
  transactionFetcher.data.value?.map((t) => new TransactionFactory(t, "json")),
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
      v-if="isModalOpen && (status === 'edit' || status === 'add')"
      item-type="Budget"
      :item-to-edit="currentBudget"
      subtitle="Choose a category to set a spending budget. These categories can help you monitor spending."
      :form-type="status"
      path="/budgets"
      @close-modal="handleCloseModalReset"
    />

    <DeleteModalCopy
      v-if="currentBudget && isModalOpen && status === 'delete'"
      :id="currentBudget.id"
      :name="currentBudget.category"
      path="/budgets"
      @close-modal="handleCloseModalReset"
      @is-successful="handleFormResult"
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
