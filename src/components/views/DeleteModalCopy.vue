<script setup lang="ts">
import { deleteItem } from "../../utils/actions";
import ModalLayout from "../layout/ModalLayout.vue";
const props = defineProps<{ id: number; name: string; path: string }>();
const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "submit"): void;
  (e: "updateUI"): void;
  (e: "isSuccessful", isSuccessful: boolean): void;
}>();

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  try {
    await deleteItem(props.path, props.id);
    emits("isSuccessful", true);
    emits("updateUI");
  } catch (err) {
    emits("isSuccessful", false);
  }
};
</script>

<template>
  <ModalLayout
    :modal-title="`Delete '${name}'?`"
    modal-text="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
    form="delete-form"
    action="/pots"
    @close-modal="() => emits('closeModal')"
  >
    <form method="post" id="delete-form" v-on:submit="handleSubmit"></form>
  </ModalLayout>
</template>
