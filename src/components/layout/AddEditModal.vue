<script setup lang="ts">
import { computed, ref } from "vue";
import ModalLayout from "./ModalLayout.vue";
import Select from "../ui/Select.vue";
import { kColors, kColorsHEX } from "../../utils/constants";
import type { IPot } from "../../models/Pot";
import type { IBudget } from "../../models/Budget";
import SelectCopy from "../ui/SelectCopy.vue";
const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "updateUI"): void;
}>();
const props = defineProps<{
  formType: "add" | "edit";
  itemToEdit?: IBudget;
  itemType: string;
  subtitle: string;
  path: string;
}>();

const title = computed(() =>
  props.formType === "add" ? "Add " + props.itemType : "Edit " + props.itemType,
);

const itemToEditFormFields = ref({
  id: props.itemToEdit?.id,
  // name: props.itemToEdit?.name ?? "",
  category: props.itemToEdit?.category ?? "",
  // target: props.itemToEdit?.target ?? 0,
  maximum: props.itemToEdit?.maximum ?? 0,
  // total: props.itemToEdit?.total ?? 0,
  theme: props.itemToEdit?.theme ?? "green",
});
const handleSubmit = async (e: Event) => {
  e.preventDefault();

  console.log(itemToEditFormFields.value);

  await fetch(`http://localhost:3333/${props.path}}`, {
    method: props.formType === "add" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemToEditFormFields.value),
  })
    .then((res) => res.json())
    .then((data) => {
      emits("updateUI");
      emits("closeModal");
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <ModalLayout
    @close-modal="() => emits('closeModal')"
    :modal-title="title"
    :modal-text="subtitle"
    :form="formType + 'Form'"
  >
    <pre>
    {{ itemToEditFormFields }}
  </pre
    >
    <form
      :id="formType + 'Form'"
      action=""
      method="post"
      class="flex flex-col gap-4"
      v-on:submit="handleSubmit"
    >
      <label for="itemToEditName" class="flex flex-col gap-1">
        {{ itemType }} name
        <input
          v-model="itemToEditFormFields.category"
          type="text"
          name="itemToEditName"
          id="itemToEditName"
          class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
        />
        <span
          >{{ itemToEditFormFields.category.length }} of 30 characters
          left</span
        >
      </label>
      <label for="target" class="flex flex-col gap-1">
        Target
        <input
          v-model.number="itemToEditFormFields.maximum"
          type="number"
          name="target"
          id="target"
          class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
        />
      </label>
      <SelectCopy
        :options="kColorsHEX"
        v-model="itemToEditFormFields.theme"
      ></SelectCopy>
    </form>
  </ModalLayout>
</template>
