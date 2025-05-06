<script setup lang="ts">
import { ref } from "vue";
import PotCard from "../components/ui/PotCard.vue";
import Select from "../components/ui/Select.vue";
import AddEditModal from "../components/layout/AddEditModal.vue";
import Button from "../components/ui/Button.vue";
import { computed } from "@vue/reactivity";
import PageHeader from "../components/layout/PageHeader.vue";

const potName = ref("");
const target = ref(0);
const theme = ref("green");
const isModalOpen = ref(false);
const modalStatus = ref<"edit" | "add">("add");
const amountToWitdraw = ref(0);
const isSavingsModalOpen = ref(true);

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
      :modal-title="addEditModalContent.title"
      :modal-text="addEditModalContent.subtitle"
      form="addForm"
    >
      <section>
        <div class="flex flex-col gap-4">
          <dl class="flex items-center justify-between">
            <dt class="text-grey-500 text-sm">Total Saved</dt>
            <dd class="text-[32px] font-bold">$159.00</dd>
          </dl>
          <div class="bg-beige-100 h-2 w-full overflow-hidden rounded-2xl">
            <div
              :class="`w-[${String(percent)}%]`"
              class="bg-secondary-green h-full"
            ></div>
          </div>
          <dl class="text-grey-500 flex justify-between text-xs">
            <dt>7.97%</dt>
            <dd>Traget of 2000$</dd>
          </dl>
        </div>
      </section>
      <form action="">
        <label for="amountToWitdraw" class="flex flex-col gap-1">
          Amount to Withdraw
          <input
            :value="amountToWitdraw"
            v-on:input="
              (e) => (amountToWitdraw = +(e.target as HTMLInputElement).value)
            "
            type="number"
            name="amountToWitdraw"
            id="amountToWitdraw"
            class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
          />
        </label>
      </form>
    </AddEditModal>

    <section>
      <ul class="flex flex-col flex-wrap gap-6 lg:flex-row">
        <li class="flex-1/3">
          <PotCard
            @edit="
              (potId) => {
                modalStatus = 'edit';
                isModalOpen = true;
              }
            "
          />
        </li>
        <li class="flex-1/3">
          <PotCard
            @edit="
              (potId) => {
                modalStatus = 'edit';
                isModalOpen = true;
              }
            "
          />
        </li>
        <li class="flex-1/3">
          <PotCard
            @edit="
              (potId) => {
                modalStatus = 'edit';
                isModalOpen = true;
              }
            "
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="css"></style>
