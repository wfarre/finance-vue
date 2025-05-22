<script setup lang="ts">
import Button from "../ui/Button.vue";

defineProps<{
  isSuccessful: boolean;
  modalTitle?: string;
  modalText?: string;
}>();
const emit = defineEmits<{ (e: "closeModal"): void; (e: "tryAgain"): void }>();
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center"
  >
    <div class="bg-grey-900/10 fixed top-0 left-0 flex h-full w-full"></div>
    <section class="absolute w-140 rounded-2xl bg-white p-8">
      <header class="">
        <div class="flex items-center justify-between">
          <h2 class="text-[32px] font-bold">Result</h2>
        </div>
        <p class="my-5 text-sm">
          {{
            isSuccessful
              ? "Database successfully updated"
              : "Oops! Something went wrong!"
          }}
        </p>
      </header>
      <slot></slot>
      <footer class="mt-5">
        <Button
          class="bg-grey-900 w-full"
          @on-button-clicked="
            isSuccessful ? emit('closeModal') : emit('tryAgain')
          "
          >{{ isSuccessful ? "Ok" : "Try Again" }}</Button
        >
      </footer>
    </section>
  </div>
</template>
