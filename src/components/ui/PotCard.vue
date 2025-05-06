<script setup lang="ts">
import { ref } from "vue";
import Icon from "../Icon.vue";
import Button from "./Button.vue";

const percent = ref(50);
const isMenuOpened = ref(false);

const toggleOpenMenu = () => (isMenuOpened.value = !isMenuOpened.value);

const emits = defineEmits<{ (e: "edit", id: string): void }>();

window.addEventListener("click", (e) => {
  console.log();
  const optionsMenu = (e.target as HTMLElement).closest(".optionsMenu");
  isMenuOpened.value === true && !optionsMenu
    ? (isMenuOpened.value = false)
    : (isMenuOpened.value = isMenuOpened.value);
});
</script>

<template>
  <article class="relative z-0 rounded-2xl bg-white p-6">
    <header class="relative mb-8 flex items-center gap-4">
      <div class="bg-secondary-green h-4 w-4 rounded-full"></div>
      <h3 class="text-xl font-bold">Savings</h3>
      <button
        class="optionsMenu ml-auto flex cursor-pointer items-center justify-center"
        v-on:click="toggleOpenMenu"
      >
        <Icon icon-url="/images/icon-ellipsis.svg" />
      </button>
      <ul
        :class="isMenuOpened ? 'scale-100' : 'scale-0'"
        class="absolute top-6 right-0 rounded-lg bg-white px-5 shadow-2xl duration-300"
      >
        <li>
          <button
            class="cursor-pointer py-4 text-sm capitalize"
            v-on:click="() => emits('edit', '1')"
          >
            Edit Pot
          </button>
        </li>
        <li class="bg-grey-100 h-[1px] w-full"></li>
        <li>
          <button
            class="text-secondary-red cursor-pointer py-4 text-sm capitalize"
          >
            Delete Pot
          </button>
        </li>
      </ul>
    </header>

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

    <footer class="mt-8 flex gap-4">
      <Button bgColor="bg-beige-100" textColor="text-grey-900" class="flex-1">
        + Add Money
      </Button>
      <Button bgColor="bg-beige-100" textColor="text-grey-900" class="flex-1">
        withdraw
      </Button>
    </footer>
  </article>
</template>
