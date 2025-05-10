<script setup lang="ts">
import { ref } from "vue";
import PotCard from "../components/ui/cards/PotCard.vue";
import { computed } from "@vue/reactivity";
import PageHeader from "../components/layout/PageHeader.vue";
import { PotFactory } from "../factories/PotFactory";
import type { PotAPI } from "../utils/typePot";
import SavingsEditFormModal from "../components/layout/SavingsEditFormModal.vue";
import AddEditPotModal from "../components/layout/AddEditPotModal.vue";

const potsData = ref<PotFactory[]>([]);

fetch("/data/data.json")
  .then((res) => res.json())
  .then((data) => {
    const formattedPots = data.pots.map(
      (pot: PotAPI) => new PotFactory(pot, "json"),
    );
    potsData.value = formattedPots;
  });

const isSavingsModalOpen = ref(false);
const isModalOpen = ref(false);
const modalStatus = ref<"edit" | "add">("add");
const savingsModalStatus = ref<"add" | "withdraw">("add");

const currentIndex = ref<number | null>(null);

const currentPot = computed(() => {
  console.log(currentIndex.value);

  return currentIndex.value !== null
    ? (potsData.value[currentIndex.value] as PotFactory)
    : undefined;
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
      :pot="currentPot"
      :form-type="savingsModalStatus"
    />
    <AddEditPotModal
      v-if="isModalOpen"
      :pot="currentPot"
      @close-modal="() => (isModalOpen = false)"
      :form-type="modalStatus"
    />

    <section>
      <ul class="flex flex-col flex-wrap gap-y-6 lg:flex-row">
        <li
          class="group basis-1/2"
          v-if="potsData"
          v-for="(pot, index) of potsData"
        >
          <PotCard
            class="lg:group-odd:mr-3 lg:group-even:ml-3"
            :value="pot.total"
            :name="pot.name"
            :target="pot.target"
            :theme="pot.theme"
            :id="index"
            @edit="
              (potId) => {
                modalStatus = 'edit';
                isModalOpen = true;
                currentIndex = potId;
              }
            "
            @add-money="
              (potId) => {
                savingsModalStatus = 'add';
                isSavingsModalOpen = true;
                currentIndex = potId;
              }
            "
            @withdraw-money="
              (potId) => {
                savingsModalStatus = 'withdraw';
                isSavingsModalOpen = true;
                currentIndex = potId;
              }
            "
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="css"></style>
