<script setup lang="ts">
import { ref } from "vue";
import PotCard from "../components/ui/cards/PotCard.vue";
import { computed } from "@vue/reactivity";
import PageHeader from "../components/layout/PageHeader.vue";
import { PotFactory } from "../factories/PotFactory";
import type { PotAPI } from "../utils/typePot";
import SavingsEditFormModal from "../components/views/SavingsEditFormModal.vue";
import type { IPot } from "../models/Pot";
import { useFetch } from "../utils/hooks/useFetch";
import DeleteModal from "../components/views/DeleteModal.vue";
import ResultModal from "../components/views/ResultModal.vue";
import AddEditModal from "../components/views/AddEditModal.vue";

const { data, error, isLoading, refetch } = useFetch<PotAPI[]>(
  "http://localhost:3333/pots",
);

refetch();

const potsData = computed(() =>
  data.value?.map((pot: PotAPI) => PotFactory.create(pot, "json")),
);

const isSavingsModalOpen = ref(false);
const isModalOpen = ref(false);
const modalStatus = ref<"edit" | "add" | "delete">("add");
const savingsModalStatus = ref<"add" | "withdraw">("add");
const currentId = ref<number | null>(null);
const isSuccessful = ref(false);
const isResultModalOpen = ref(false);

const currentPot = computed(() => {
  return (
    potsData.value?.find((item) => item.id === currentId.value) ??
    (undefined as IPot | undefined)
  );
});

const handleCloseModalReset = () => {
  isModalOpen.value = false;
  isResultModalOpen.value = false;
  currentId.value = null;
  isSavingsModalOpen.value = false;
};

const handleFormResult = (isSubmitSuccessful: boolean) => {
  isModalOpen.value = false;
  isResultModalOpen.value = true;
  isSuccessful.value = isSubmitSuccessful;
};

const addEditModalSubtitle = computed(() => {
  switch (modalStatus.value) {
    case "add":
      return "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.";
    case "edit":
      return "If your saving targets change, feel free to update your pots.";
    default:
      return "";
  }
});
</script>

<template>
  <PageHeader
    title="Pots"
    button-label="+ Add new pot"
    @header-button-clicked="
      () => {
        modalStatus = 'add';
        isModalOpen = true;
      }
    "
  />
  <main>
    <SavingsEditFormModal
      v-if="isSavingsModalOpen"
      @close-modal="handleCloseModalReset"
      @update-u-i="() => refetch()"
      :pot="currentPot"
      :form-type="savingsModalStatus"
    />

    <AddEditModal
      v-if="isModalOpen && (modalStatus === 'add' || modalStatus === 'edit')"
      @close-modal="handleCloseModalReset"
      @update-u-i="() => refetch()"
      @is-successful="handleFormResult"
      :name="currentPot?.name"
      :amount="currentPot?.target"
      :theme="currentPot?.theme"
      :id="currentPot?.id"
      :form-type="modalStatus"
      :subtitle="addEditModalSubtitle"
      item-type="pot"
    />

    <ResultModal
      v-if="
        isResultModalOpen && (modalStatus === 'add' || modalStatus === 'edit')
      "
      :is-successful="isSuccessful"
      @close-modal="handleCloseModalReset"
      @try-again="
        () => {
          isModalOpen = true;
          isResultModalOpen = false;
        }
      "
    />

    <DeleteModal
      v-if="
        currentPot && isModalOpen && modalStatus === 'delete' && currentPot.id
      "
      :id="currentPot.id"
      :name="currentPot.name"
      path="/pots"
      @close-modal="handleCloseModalReset"
      @is-successful="handleFormResult"
      @update-u-i="refetch"
    />

    <p v-if="error">Oops! Something went wrong...</p>
    <section>
      <ul class="flex flex-col flex-wrap gap-y-6 lg:flex-row">
        <li class="group basis-1/2" v-if="potsData" v-for="pot of potsData">
          <PotCard
            class="lg:group-odd:mr-3 lg:group-even:ml-3"
            :pot="pot"
            @edit="
              (potId) => {
                currentId = potId;
                modalStatus = 'edit';
                isModalOpen = true;
              }
            "
            @add-money="
              (potId) => {
                savingsModalStatus = 'add';
                isSavingsModalOpen = true;
                currentId = potId;
              }
            "
            @withdraw-money="
              (potId) => {
                savingsModalStatus = 'withdraw';
                isSavingsModalOpen = true;
                currentId = potId;
              }
            "
            @delete-pot="
              (potId) => {
                isModalOpen = true;
                currentId = potId;
                modalStatus = 'delete';
              }
            "
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="css"></style>
