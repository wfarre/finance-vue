<script setup lang="ts">
import { ref } from "vue";
import PotCard from "../components/ui/cards/PotCard.vue";
import { computed } from "@vue/reactivity";
import PageHeader from "../components/layout/PageHeader.vue";
import { PotFactory } from "../factories/PotFactory";
import type { PotAPI } from "../utils/typePot";
import SavingsEditFormModal from "../components/views/SavingsEditFormModal.vue";
import AddEditPotModal from "../components/views/AddEditPotModal.vue";
import type { IPot } from "../models/Pot";
import { useFetch } from "../utils/hooks/useFetch";
import DeleteModalCopy from "../components/views/DeleteModalCopy.vue";
import ResultModal from "../components/views/ResultModal.vue";

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
};

const handleFormResult = (isSubmitSuccessful: boolean) => {
  isModalOpen.value = false;
  isResultModalOpen.value = true;
  isSuccessful.value = isSubmitSuccessful;
};
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
      @close-modal="() => (isSavingsModalOpen = false)"
      @update-u-i="() => refetch()"
      :pot="currentPot"
      :form-type="savingsModalStatus"
    />
    <AddEditPotModal
      v-if="isModalOpen && (modalStatus === 'add' || modalStatus === 'edit')"
      @close-modal="() => (isModalOpen = false)"
      @update-u-i="() => refetch()"
      :pot="currentPot"
      :form-type="modalStatus"
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

    <DeleteModalCopy
      v-if="currentPot && isModalOpen && modalStatus === 'delete'"
      :id="currentPot.id"
      :name="currentPot.name"
      path="/pots"
      @close-modal="handleCloseModalReset"
      @is-successful="handleFormResult"
      @update-u-i="() => refetch()"
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
