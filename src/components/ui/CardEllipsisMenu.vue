<script setup lang="ts">
import { ref } from "vue";
import Icon from "../Icon.vue";
const emits = defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
}>();

const isMenuOpen = ref(false);
const toggleOpenMenu = () => (isMenuOpen.value = !isMenuOpen.value);
window.addEventListener("click", (e) => {
  const optionsMenu = (e.target as HTMLElement).closest(".optionsMenu");
  isMenuOpen.value === true && !optionsMenu
    ? (isMenuOpen.value = false)
    : (isMenuOpen.value = isMenuOpen.value);
});
</script>

<template>
  <button
    class="optionsMenu ml-auto flex cursor-pointer items-center justify-center"
    v-on:click="toggleOpenMenu"
  >
    <Icon icon-url="/images/icon-ellipsis.svg" />
  </button>
  <ul
    :class="isMenuOpen ? 'scale-100' : 'scale-0'"
    class="absolute top-6 right-0 z-50 rounded-lg bg-white px-5 shadow-2xl duration-300"
  >
    <li>
      <button
        class="cursor-pointer py-4 text-sm capitalize"
        v-on:click="() => emits('edit')"
      >
        Edit Pot
      </button>
    </li>
    <li class="bg-grey-100 h-[1px] w-full"></li>
    <li>
      <button
        class="text-secondary-red cursor-pointer py-4 text-sm capitalize"
        v-on:click="() => emits('delete')"
      >
        Delete Pot
      </button>
    </li>
  </ul>
</template>
