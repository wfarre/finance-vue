<script setup lang="ts">
import { ref, watch } from "vue";
import PotCard from "../components/ui/PotCard.vue";
import Select from "../components/ui/Select.vue";
import AddEditModal from "../components/layout/AddEditModal.vue";
import Button from "../components/ui/Button.vue";
import { computed } from "@vue/reactivity";
import PageHeader from "../components/layout/PageHeader.vue";
import { PotFactory } from "../factories/PotFactory";
import type { PotAPI } from "../utils/typePot";

const potsData = ref<PotFactory[]>([]);

fetch("/data/data.json")
  .then((res) => res.json())
  .then((data) => {
    const formattedPots = data.pots.map(
      (pot: PotAPI) => new PotFactory(pot, "json"),
    );
    potsData.value = formattedPots;
  });

const potName = ref("");
const target = ref(0);
const theme = ref("green");
const amountToAdd = ref(0);

const isModalOpen = ref(false);
const modalStatus = ref<"edit" | "add" | "addMoney">("add");

const isSavingsModalOpen = ref(false);
const currentIndex = ref<number | null>(null);

const options = {
  green: "bg-secondary-green",
  yellow: "bg-secondary-yellow",
  cyan: "bg-secondary-cyan",
  navy: "bg-secondary-navy",
  red: "bg-secondary-red",
  purple: "bg-secondary-purple",
  turquoise: "bg-tertiary-turquoise",
};

const addEditModalContent = computed(() => ({
  title: modalStatus.value === "add" ? "Add New Pot" : "Edit Pot",
  subtitle:
    modalStatus.value === "add"
      ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
      : "Edit Pot",
  formMethod: modalStatus.value === "add" ? "POST" : "PUT",
}));

const formFields = computed(() => {
  const currentPot =
    currentIndex.value !== null && potsData.value[currentIndex.value];

  console.log(currentPot);
  console.log(potsData.value);

  return !currentPot
    ? { potName: "", theme: "green", target: 0, total: 0 }
    : {
        potName: currentPot?.name,
        theme: currentPot?.theme,
        target: currentPot?.target,
        total: currentPot?.total,
      };
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
    <AddEditModal
      v-if="isModalOpen"
      @close-modal="() => (isModalOpen = false)"
      :modal-title="addEditModalContent.title"
      :modal-text="addEditModalContent.subtitle"
      form="addForm"
    >
      <form
        id="addForm"
        action=""
        method="post"
        class="flex flex-col gap-4"
        v-on:submit="
          (e) => {
            e.preventDefault();
            console.log(addEditModalContent.formMethod);
            const newPot = {
              potName: potName,
              target: target,
              theme: theme,
            };
            console.log(newPot);
          }
        "
      >
        <label for="potName" class="flex flex-col gap-1">
          Pot name
          <input
            :value="potName"
            v-on:input="(e) => (potName = (e.target as HTMLInputElement).value)"
            type="text"
            name="potName"
            id="potName"
            class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
          />
          <span>{{ potName.length }} of 30 characters left</span>
        </label>
        <label for="target" class="flex flex-col gap-1">
          Target
          <input
            :value="target"
            v-on:input="(e) => (target = +(e.target as HTMLInputElement).value)"
            type="number"
            name="target"
            id="target"
            class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
          />
        </label>
        <Select
          :options="options"
          :value="theme"
          @select="(newValue) => (theme = newValue)"
        ></Select>
      </form>
    </AddEditModal>

    <AddEditModal
      v-if="isSavingsModalOpen"
      @close-modal="() => (isSavingsModalOpen = false)"
      :modal-title="`Add to '${formFields.potName}'`"
      modal-text="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
      form="addForm"
    >
      <section>
        <div class="flex flex-col gap-4">
          <dl class="flex items-center justify-between">
            <dt class="text-grey-500 text-sm">New Amount</dt>
            <dd class="text-[32px] font-bold">${{ formFields.total }}</dd>
          </dl>
          <div class="bg-beige-100 h-2 w-full overflow-hidden rounded-2xl">
            <div
              :style="[
                `transform:scaleX(${Math.round(((formFields.total + amountToAdd) / formFields.target) * 100)}%) `,
              ]"
              class="bg-grey-900 h-full w-full origin-left overflow-hidden rounded-2xl transition-all duration-700"
            >
              <div
                :style="[
                  `transform:scaleX(${Math.round((amountToAdd / (formFields.total + amountToAdd)) * 100)}%) `,
                ]"
                class="bg-secondary-green h-full w-full origin-right transition-all duration-700"
              ></div>
            </div>
          </div>
          <dl class="text-grey-500 flex justify-between text-xs">
            <dt>
              {{ Math.round((formFields.total / formFields.target) * 100) }}%
            </dt>
            <dd>Traget of {{ formFields.target }}$</dd>
          </dl>
        </div>
      </section>
      <form class="mt-5" action="">
        <label for="amountToAdd" class="flex flex-col gap-1">
          Amount to Add
          <input
            :value="amountToAdd"
            v-on:input="
              (e) => (amountToAdd = +(e.target as HTMLInputElement).value)
            "
            type="number"
            name="amountToAdd"
            id="amountToAdd"
            class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
          />
        </label>
      </form>
    </AddEditModal>

    <section>
      <ul class="flex flex-col flex-wrap gap-6 lg:flex-row">
        <li v-if="potsData" v-for="(pot, index) of potsData">
          <PotCard
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
                modalStatus = 'addMoney';
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
