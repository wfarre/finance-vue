<script setup lang="ts">
import ModalLayout from "./ModalLayout.vue";
const props = defineProps<{ potId: number }>();
const emits = defineEmits<{
  (e: "closeModal"): void;
  (e: "submit"): void;
  (e: "updateUI"): void;
}>();

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  console.log("poiet");

  await fetch(`http://localhost:3333/pots/${props.potId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
    modal-title="Delete ‘Savings’?"
    modal-text="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
    form="delete-form"
    action="/pots"
    @close-modal="() => emits('closeModal')"
  >
    <form method="post" id="delete-form" v-on:submit="handleSubmit"></form>
  </ModalLayout>
</template>
