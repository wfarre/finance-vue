<script setup lang="ts">
import { onMounted, ref } from "vue";
import PotCard from "../components/ui/cards/PotCard.vue";
import { computed } from "@vue/reactivity";
import PageHeader from "../components/layout/PageHeader.vue";
import { PotFactory } from "../factories/PotFactory";
import type { PotAPI } from "../utils/typePot";
import SavingsEditFormModal from "../components/layout/SavingsEditFormModal.vue";
import AddEditPotModal from "../components/layout/AddEditPotModal.vue";
import type { IPot, Pot } from "../models/Pot";
import { useFetch } from "../utils/hooks/useFetch";
import DeleteModal from "../components/layout/DeleteModal.vue";

const { data, error, isLoading, refetch } = useFetch<PotAPI[]>(
  "http://localhost:3333/pots",
);

refetch();

const potsData = computed(() =>
  data.value?.map((pot: PotAPI) => PotFactory.create(pot, "json")),
);

const isSavingsModalOpen = ref(false);
const isModalOpen = ref(false);
const modalStatus = ref<"edit" | "add">("add");
const savingsModalStatus = ref<"add" | "withdraw">("add");
const currentId = ref<number | null>(null);
const isDeleteModalOpen = ref(false);

const currentPot = computed(() => {
  return (
    potsData.value?.find((item) => item.id === currentId.value) ??
    (undefined as IPot | undefined)
  );
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
      @close-modal="() => (isSavingsModalOpen = false)"
      @update-u-i="() => refetch()"
      :pot="currentPot"
      :form-type="savingsModalStatus"
    />
    <AddEditPotModal
      v-if="isModalOpen"
      @close-modal="() => (isModalOpen = false)"
      @update-u-i="() => refetch()"
      :pot="currentPot"
      :form-type="modalStatus"
    />
    <DeleteModal
      v-if="isDeleteModalOpen && currentId"
      @close-modal="() => (isDeleteModalOpen = false)"
      @update-u-i="() => refetch()"
      :pot-id="currentId"
    />

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
                isDeleteModalOpen = true;
                currentId = potId;
              }
            "
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="css"></style>
