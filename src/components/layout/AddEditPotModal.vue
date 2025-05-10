<script setup lang="ts">
import { computed } from "vue";
import ModalLayout from "./ModalLayout.vue";
import type { PotFactory } from "../../factories/PotFactory";
import Select from "../ui/Select.vue";
import { kColors } from "../../utils/constants";
const emits = defineEmits<{
  (e: "closeModal"): void;
}>();
const props = defineProps<{
  formType: "add" | "edit";
  pot?: PotFactory;
}>();

const addEditModalContent = computed(() => ({
  title: props.formType === "add" ? "Add New Pot" : "Edit Pot",
  subtitle:
    props.formType === "add"
      ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
      : "Edit Pot",
  formMethod: props.formType === "add" ? "POST" : "PUT",
}));

const potFormFields = computed(() => ({
  name: props.pot ? props.pot.name : "",
  target: props.pot ? props.pot.target : 0,
  total: props.pot ? props.pot.total : "",
  theme: props.pot ? props.pot.theme : "green",
}));
</script>

<template>
  <ModalLayout
    @close-modal="() => emits('closeModal')"
    :modal-title="addEditModalContent.title"
    :modal-text="addEditModalContent.subtitle"
    :form="formType + 'Form'"
  >
    <form
      :id="formType + 'Form'"
      action=""
      :method="addEditModalContent.formMethod"
      class="flex flex-col gap-4"
      v-on:submit="
        (e) => {
          e.preventDefault();
          console.log(addEditModalContent.formMethod);
          const newPot = {
            potName: potFormFields.name,
            target: potFormFields.target,
            theme: potFormFields.theme,
          };
          console.log(newPot);
        }
      "
    >
      <label for="potName" class="flex flex-col gap-1">
        Pot name
        <input
          :value="potFormFields.name"
          v-on:input="
            (e) => (potFormFields.name = (e.target as HTMLInputElement).value)
          "
          type="text"
          name="potName"
          id="potName"
          class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
        />
        <span>{{ potFormFields.name.length }} of 30 characters left</span>
      </label>
      <label for="target" class="flex flex-col gap-1">
        Target
        <input
          :value="potFormFields.target"
          v-on:input="
            (e) =>
              (potFormFields.target = +(e.target as HTMLInputElement).value)
          "
          type="number"
          name="target"
          id="target"
          class="border-grey-900 h-11 rounded-lg border px-5 text-sm"
        />
      </label>
      <Select
        :options="kColors"
        :value="potFormFields.theme"
        @select="(newValue) => (potFormFields.theme = newValue)"
      ></Select>
    </form>
  </ModalLayout>
</template>
