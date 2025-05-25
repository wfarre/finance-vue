<script setup lang="ts">
import { computed, ref } from "vue";
import ModalLayout from "../layout/ModalLayout.vue";
import { kColorsHEX } from "../../utils/constants";
import type { IBudget } from "../../models/Budget";
import Select from "../ui/Select.vue";
const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "updateUI"): void;
}>();
const props = defineProps<{
  formType: "add" | "edit";
  id?: number;
  name?: string;
  amount?: number;
  theme?: string;
  itemType: "pot" | "budget";
  subtitle: string;
  path: string;
}>();

const title = computed(() =>
  props.formType === "add" ? "Add " + props.itemType : "Edit " + props.itemType,
);

// const itemToEditFormFields = ref({
//   id: props.itemToEdit?.id,
//   // name: props.itemToEdit?.name ?? "",
//   category: props.itemToEdit?.category ?? "",
//   // target: props.itemToEdit?.target ?? 0,
//   maximum: props.itemToEdit?.maximum ?? 0,
//   // total: props.itemToEdit?.total ?? 0,
//   theme: props.itemToEdit?.theme ?? "green",
// });

const itemToEditFormFields = ref({
  id: props.id,
  name: props.name ?? "",
  amount: props.amount ?? 0,
  theme: props.theme ?? Object.keys(kColorsHEX)[0],
});
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  let formData;

  console.log(itemToEditFormFields.value);
  switch (props.itemType) {
    case "budget":
      formData = {
        catergory: itemToEditFormFields.value.name,
        maximum: itemToEditFormFields.value.amount,
        theme: itemToEditFormFields.value.theme,
      };
      createItem(`/budgets/${props.id ?? ""}`, formData);
      break;
    case "pot":
      formData = {
        name: itemToEditFormFields.value.name,
        target: itemToEditFormFields.value.amount,
        theme: itemToEditFormFields.value.theme,
      };
      createItem(`/pots/${props.id ?? ""}`, formData);
      break;

    default:
      console.log("Wrong Item type");

      break;
  }
};

const createItem = async (path: string, item: object) => {
  try {
    const res = await fetch(`http://localhost:3333${path}`, {
      method: props.formType === "add" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      emits("updateUI");
      emits("closeModal");
    }
  } catch (err) {
    console.log(err);
  }
};

// await fetch(`http://localhost:3333/${props.path}}`, {
//   method: props.formType === "add" ? "POST" : "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(itemToEditFormFields.value),
// })
//   .then((res) => res.json())
//   .then(() => {
//     emits("updateUI");
//     emits("closeModal");
//   })
//   .catch((err) => console.log(err));
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
          v-model="itemToEditFormFields.name"
          type="text"
          name="itemToEditName"
          id="itemToEditName"
          class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
        />
        <span
          >{{ itemToEditFormFields.name.length }} of 30 characters left</span
        >
      </label>
      <label for="target" class="flex flex-col gap-1">
        Target
        <input
          v-model.number="itemToEditFormFields.amount"
          type="number"
          name="target"
          id="target"
          class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
        />
      </label>
      <Select
        :options="kColorsHEX"
        v-model="itemToEditFormFields.theme"
      ></Select>
    </form>
  </ModalLayout>
</template>
