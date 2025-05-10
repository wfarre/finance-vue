<script setup lang="ts">
import Icon from "../Icon.vue";
import Button from "../ui/Button.vue";

defineProps<{
  modalTitle: string;
  modalText: string;
  form: string;
}>();
const emit = defineEmits<{ (e: "closeModal"): void }>();
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center"
  >
    <div
      v-on:click="() => emit('closeModal')"
      class="bg-grey-900/10 fixed top-0 left-0 flex h-full w-full"
    ></div>
    <section class="absolute w-140 rounded-2xl bg-white p-8">
      <header class="">
        <div class="flex items-center justify-between">
          <h2 class="text-[32px] font-bold">{{ modalTitle }}</h2>
          <button v-on:click="() => emit('closeModal')" class="h-10 w-10">
            <Icon icon-url="/images/icon-close-modal.svg" />
          </button>
        </div>
        <p class="my-5 text-sm">{{ modalText }}</p>
      </header>
      <slot></slot>
      <footer class="mt-5">
        <Button :form="form" class="w-full">Submit</Button>
      </footer>
    </section>
  </div>
</template>
